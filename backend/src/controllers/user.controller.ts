import { Request, Response } from "express";
import userModel from "../model/user.model";
import bcrypt from "bcrypt";
import { genPassword } from "../utils/genPassword";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role, isRandomPassword } = req.body;

    if (!username || !email || (!isRandomPassword && !password))
      return res.status(400).json({
        msg: "All fields are required. Please, fill all the required input fields",
        success: false,
      });

    if (role === "superadmin") {
      const existingSuperAdmin = await userModel.findOne({ role });
      if (existingSuperAdmin)
        return res.status(400).json({
          msg: "The database can have only one superadmin",
          success: false,
        });
    }
    const existingUser = await userModel.findOne({ email });

    if (existingUser)
      return res.status(400).json({
        msg: "A user with the same email has been found in the database. Please, try with a different email",
        success: false,
      });

    const salt = await bcrypt.genSalt(10);
    const randomPassword = genPassword();
    const finalPassword =
      (!password || isRandomPassword) ? randomPassword : password;
    const hashedPassword = await bcrypt.hash(finalPassword, salt);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      msg: "User was created successfully",
      success: true,
      user,
      password: finalPassword,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const user = await userModel.findByIdAndDelete(id);
    if (!user)
      return res.status(404).json({
        msg: "Oops! 404 user not found",
        success: false,
      });

    res.status(200).json({
      msg: "User was deleted successfully",
      success: true,
      user,
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
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword)
      return res.status(400).json({
        msg: "All fields are required. Please, fill all the required input fields",
        success: false,
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        msg: "The new password and the confirmation password must match.",
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.isPasswordUpdated = true;

    const updatedUser = await user.save();

    res.status(201).json({
      msg: "Your password was updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};
