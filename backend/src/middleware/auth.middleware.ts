import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTTokenPayload } from "../types/types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
        permissions: {
          canAddAndRemoveAccounts: boolean;
          canChangeRoles: boolean;
          canEditSchedules: boolean;
          canCreateSchdedules: boolean;
          canEditTheirSchedule: boolean;
        };
      };
    }
  }
}

export const checkLoginData = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({
        msg: "All fields are required. Please, fill all the required input fields.",
        success: false,
      });

    if (password.length < 8)
      return res.status(400).json({
        msg: "Your password must be at least 8 characters.",
        success: false,
      });

    next();
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong on the server side. Please, try again later",
      error,
    });
  }
};

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      msg: "Access token missing",
      success: false,
    });

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JWTTokenPayload;

    req.user = decodedToken;

    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Invalid or expired access token',
      success: false,
    });
  }
};
