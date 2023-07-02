import { hash } from "bcrypt";
import { comparePassword, generateToken, hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
  res.end();
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  res.json(user);
  res.end();
};

export const createUser = async (req: Request, res: Response) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: await hashPassword(password),
    },
  });
  res.json();
  res.end();
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, name, password } = req.body;
  const user = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email,
      name,
      password,
    },
  });
  res.json();
  res.end();
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json(user);
  res.end();
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
