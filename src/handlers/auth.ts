import { Request, Response } from "express";
import prisma from "../modules/db";
import { comparePassword, generateToken } from "../modules/auth";

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
    return res.status(401).json({ message: "User not found" });
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

export const signout = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
  res.end();
};
