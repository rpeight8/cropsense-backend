import prisma from "../modules/db";
import { DateTime } from "luxon";

export const createSeason = async (
  workspaceId: string,
  businessUserId: string,
  name: string
) => {
  console.log("workspaceId", workspaceId);
  console.log("businessUserId", businessUserId);
  console.log("name", name);
  const currentDateTime = DateTime.now();

  const newSeason = await prisma.season.create({
    data: {
      name,
      startDate: currentDateTime.startOf("year").toJSDate(),
      endDate: currentDateTime.endOf("year").toJSDate(),
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
      createdBy: {
        connect: {
          id: businessUserId,
        },
      },
    },
  });

  return newSeason;
};

export const getSeasonById = async (seasonId: string) => {
  const season = await prisma.season.findFirst({
    where: {
      id: seasonId,
    },
  });

  return season;
};
