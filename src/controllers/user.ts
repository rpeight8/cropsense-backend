import { hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import { Request, Response } from "express";
import { registerNewUser } from "../services/signUpService";
import { getUserByEmail } from "../models/user";

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

export const createUser = async (req: Request, res: Response) => {};
