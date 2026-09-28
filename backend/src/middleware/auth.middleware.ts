import { Request, Response, NextFunction } from "express";

export const checkLoginData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) 
      return res.status(400).json({
        msg: 'All fields are required. Please, fill all the required input fields.',
        success: false,
      });

    if (password.length < 8) 
      return res.status(400).json({
        msg: 'Your password must be at least 8 characters.',
        success: false
      });

    next();
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });    
  };
};