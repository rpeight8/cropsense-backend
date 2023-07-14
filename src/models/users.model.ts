import { hashPassword } from "../modules/auth";
import prisma from "../modules/db";
import { Prisma } from "@prisma/client";
import { createBusinessUser } from "./businessUsers.model";

export const createUser = async (user: Prisma.UserCreateInput) => {
  const newUser = await prisma.user.create({
    data: {
      ...user,
    },
    select: {
      id: true,
      businessUsers: {
        select: {
          id: true,
        },
      },
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
