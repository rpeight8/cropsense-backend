import { hashPassword } from "../modules/auth";
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

  try {
    await prisma.user.create({
      data: {
        email,
        name,
        password: await hashPassword(password),
      },
    });
    res.json();
    res.end();
  } catch (err) {
    res.status(400).json({ message: "Email already exists" });
    res.end();
  }
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
