import { hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import { createBusinessUser } from "./businessUser";

export const createUser = async (email: string, password: string) => {
  const newUser = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
    },
  });

  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return user;
};
