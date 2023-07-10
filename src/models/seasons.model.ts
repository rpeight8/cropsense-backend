import prisma from "../modules/db";
import { DateTime } from "luxon";

// TODO: Pass startDate and endDate as parameters
export const createSeason = async (
  workspaceId: string,
  businessUserId: string,
  season: Pick<
    Parameters<typeof prisma.season.create>[0]["data"],
    "name" | "startDate" | "endDate"
  >
) => {
  // const currentDateTime = DateTime.now();
  console.log(season);
  const newSeason = await prisma.season.create({
    data: {
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate,
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

export const getSeasonsByWorkspaceId = async (workspaceId: string) => {
  const seasons = await prisma.season.findMany({
    where: {
      workspaceId,
    },
  });

  return seasons;
};
