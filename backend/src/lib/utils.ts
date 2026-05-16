import { Response } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const generateToken = (
  userId: mongoose.Types.ObjectId,
  res: Response
): string => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};