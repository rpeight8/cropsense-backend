import { NextFunction, Request, Response } from "express";
import prisma from "../modules/db";
import { comparePassword, generateToken, verifyToken } from "../modules/auth";
import { createUser } from "./user";

export const verify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.cookies?.token;
  
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    res.status(200).json(decoded);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    next(err);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({ message: "Missing fields" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: "Login successful" });
  res.end();
};

export const signup = async (req: Request, res: Response) => {
  createUser(req, res);
};

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
  res.end();
};
