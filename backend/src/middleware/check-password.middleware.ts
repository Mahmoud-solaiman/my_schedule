import { NextFunction, Request, Response } from "express";
import { passwordStrength } from "check-password-strength";

export const checkPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, confirmPassword } = req.body;

    if (!email || !password || !confirmPassword)
      return res.status(400).json({
        msg: "All fields are required. Please, fill all the required input fields",
        success: false,
      });

    if (password.length < 8) 
      return res.status(400).json({
        msg: 'Your password must be at least 8 characters long',
        success: false,
      });

    if (passwordStrength(password).id < 3) 
      return res.status(422).json({
        msg: 'Weak password. Try to use a combination of characters, numbers, uppercase and lowercase letters',
        success: false,
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        msg: "The new password and the confirmation password must match.",
        success: false,
      });

    next();
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      success: false,
    });
  }
};
