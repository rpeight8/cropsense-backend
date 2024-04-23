import { createUser } from "../models/users.model";
import { createBusinessUser } from "../models/businessUsers.model";
import prisma from "../modules/db";
import { createWorkspace } from "../models/workspaces.model";
import { createSeason } from "../models/seasons.model";
import { Prisma } from "@prisma/client";
import { hashPassword } from "../modules/auth";

export const registerNewUser = async (email: string, password: string) => {
  return await prisma.$transaction(async () => {
    const user: Prisma.UserCreateInput = {
      email,
      password: await hashPassword(password),
      businessUsers: {
        create: {
          email,
          name: "User :)",
        },
      },
    };

    const createdUser = await createUser(user);
    const businessUserId = createdUser.businessUsers[0].id;

    const workspace = {
      name: "My first workspace",
      seasons: {
        create: [
          {
            name: "My first season",
            startDate: new Date(),
            endDate: new Date(),
            createdBy: {
              connect: {
                id: businessUserId,
              },
            },
          },
        ],
      },
      owner: {
        connect: {
          id: businessUserId,
        },
      },
      createdBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    await createWorkspace({
      data: workspace,
    });

    return { createdUser };
  });
};
