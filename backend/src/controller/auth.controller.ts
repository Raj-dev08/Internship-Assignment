import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import User from "../model/user.model.js";
import { generateToken } from "../lib/utils.js";
import { AuthRequest } from "../middleware/auth.middleware.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 4) {
      return res.status(400).json({
        message: "Password must be atleast 4 characters long",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    generateToken(newUser._id, res);

    await newUser.save();

    return res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { name } = req.body;

    const userId = req.user?._id;

    const updateData: Record<string, string> = {};


    if (name) {
      updateData.name = name;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

export const checkAuth = (
  req: AuthRequest,
  res: Response
): void | Response => {
  return res.status(200).json(req.user);
};

export const beAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const { adminPass } = req.body;

    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (user.isAdmin) {
      return res.status(400).json({
        message: "User is already an admin",
      });
    }

    if (adminPass !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    user.isAdmin = true;

    await user.save();

    return res.status(200).json({
      message: "User is now admin",
    });
  } catch (error) {
    next(error);
  }
};

export const cancelAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  try {
    const user = req.user;

    if (!user || !user.isAdmin) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    user.isAdmin = false;

    await user.save();

    return res.status(200).json({
      message: "Admin removed",
    });
  } catch (error) {
    next(error);
  }
};