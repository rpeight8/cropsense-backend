import prisma from "../modules/db";

export const createBusinessUser = async (
  userId: string,
  email: string,
  name: string
) => {
  const newBusinessUser = await prisma.businessUser.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      email,
      name,
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
