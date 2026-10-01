import { Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { genAccessToken, genRefreshToken } from "../utils/genTokens";
import { JWTTokenPayload } from "../types/types";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });

    if (!user) 
      return res.status(404).json({
        msg: 'Oops! 404 user not found. Try registering instead if this is your first time.',
        success: false,
      });

    if (!user.isPasswordUpdated) 
      return res.status(400).json({
        msg: 'Seems like this is your first time logging in. Please, register instead.',
        success: false,
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({
        msg: 'Incorrect password. Please, check your password and try again.',
        success: false
      });

    const accessToken = genAccessToken({
      id: user.id,
      role: user.role,
      permissions: user.permissions
    });

    const refreshToken = genRefreshToken({
      id: user.id,
      role: user.role,
      permissions: user.permissions,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: 'Welcome Back. Have A Happy Shift!',
      success: true,
      token: accessToken
    });

  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        msg: "All fields are required. Please, fill all the required input fields",
        success: false,
      });

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        msg: "Oops! 404 user not found. Please, try again or contact your administrator",
        success: false,
      });

    if (user.isPasswordUpdated)
      return res.status(400).json({
        msg: "Seems like you have already updated your password before. Try logging in instead.",
        success: false,
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({
        msg: "Incorrect password. Please, check your password and try again!",
        success: false,
      });

    res.status(200).json({
      msg: "Thank you for providing the correct credentials. You can proceed to update your password.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
      success: false,
    });
  }
};

export const updatePassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user)
      return res.status(404).json({
        msg: "Oops! 404 user not found. Please, try again or contact your administrator",
        success: false,
      });

    if (user.isPasswordUpdated)
      return res.status(400).json({
        msg: "Seems like you have already updated your password before. Try logging in instead.",
        success: false,
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.isPasswordUpdated = true;

    await user.save();

    const accessToken = genAccessToken({
      id: user.id,
      role: user.role,
      permissions: user.permissions
    });

    const refreshToken = genRefreshToken({
      id: user.id,
      role: user.role,
      permissions: user.permissions,
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });


    res.status(201).json({
      msg: "Your password was updated successfully",
      success: true,
      token: accessToken
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};

export const handleRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) 
    return res.status(401).json({
      msg: 'Refresh token missing',
      success: false,
    });

  try {
    const { iat, exp, ...userPayload } = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JWTTokenPayload & JwtPayload;

    const newAccessToken = genAccessToken(userPayload);

    res.status(200).json({
      msg: 'Your new access token has been retrieved',
      success: true,
      token: newAccessToken,
    });
  } catch (error: any) {
    console.log(error.message);
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JWTTokenPayload;
    console.log(decoded);
    res.status(403).json({
      msg: 'Invalid or expired refresh token',
      success: false,
    });
  };
};

export const handleLogout = async (_req: Request, res: Response) => {
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  });

  res.status(200).json({
    msg: 'Logged out successfully',
    success: true,
  });
};