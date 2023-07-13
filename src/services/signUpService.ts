import { createUser } from "../models/users.model";
import { createBusinessUser } from "../models/businessUsers.model";
import prisma from "../modules/db";
import { createWorkspace } from "../models/workspaces.model";
import { createSeason } from "../models/seasons.model";
import { Prisma } from "@prisma/client";

export const registerNewUser = async (email: string, password: string) => {
  return await prisma.$transaction(async () => {
    const newUser = await createUser(email, password);
    const newBussinesUser = await createBusinessUser(newUser.id, email, "");

    const season: Prisma.SeasonCreateInput = {
      name: "My first season",
      startDate: new Date(),
      endDate: new Date(),
      workspace: {
        create: {
          name: "My first workspace",
          owner: {
            connect: {
              id: newBussinesUser.id,
            },
          },
          createdBy: {
            connect: {
              id: newBussinesUser.id,
            },
          },
        },
      },
      createdBy: {
        connect: {
          id: newUser.id,
        },
      },
    };

    await createSeason(season);

    return { newUser, newBussinesUser };
  });
};
