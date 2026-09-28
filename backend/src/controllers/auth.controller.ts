import { Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from 'bcrypt'

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await userModel.findOne({ email });

    if (!user) 
      return res.status(404).json({
        msg: 'Oops! 404 user not found. Try registering instead if this is your first time.',
        success: false,
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({
        msg: 'Incorrect password. Please, check your password and try again.',
        success: false
      });

    res.status(200).json({
      msg: 'Welcome Back. Have A Happy Shift!',
      success: true,
    });

  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};
