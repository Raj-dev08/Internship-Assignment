import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../model/user.model.js";

interface JwtPayload {
  userId: string;
}

export interface AuthRequest extends Request {
  user?: any;
}

export const protectRoute = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      res.status(401).json({
        message: "Unauthorized - no token",
      });

      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded) {
      res.status(401).json({
        message: "Unauthorized - invalid token",
      });

      return;
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      res.status(401).json({
        message: "Unauthorized - no user",
      });

      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};