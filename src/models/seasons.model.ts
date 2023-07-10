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

export const updateSeason = async (
  id: string,
  businessUserId: string,
  season: Pick<
    Parameters<typeof prisma.season.update>[0]["data"],
    "name" | "startDate" | "endDate"
  >
) => {
  const updatedSeason = await prisma.season.update({
    where: {
      id,
    },
    data: {
      name: season.name,
      startDate: season.startDate,
      endDate: season.endDate,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
      updatedAt: new Date(),
    },
  });

  return updatedSeason;
};

export const deleteSeason = async (id: string) => {
  const deletedSeason = await prisma.season.delete({
    where: {
      id,
    },
  });

  return deletedSeason;
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
