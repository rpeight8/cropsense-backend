import prisma from "../modules/db";
import { Prisma } from "@prisma/client";

export const createBusinessUser = async (
  businessUser: Prisma.BusinessUserCreateInput
) => {
  const newBusinessUser = await prisma.businessUser.create({
    data: {
      ...businessUser,
    },
  });
  return newBusinessUser;
};

export const getBusinessUser = async (userId: string, email: string) => {
  const businessUser = await prisma.businessUser.findFirst({
    where: {
      userId,
      email,
    },
  });

  return businessUser;
};

export const getBusinessUserById = async (id: string) => {
  const businessUser = await prisma.businessUser.findUnique({
    where: {
      id,
    },
  });

  return businessUser;
};
