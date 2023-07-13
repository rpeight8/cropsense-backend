import prisma from "../modules/db";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export const createSeason = async (season: Prisma.SeasonCreateInput) => {
  const newSeason = await prisma.season.create({
    data: {
      ...season,
    },
  });

  return newSeason;
};

export const updateSeason = async (
  id: string,
  season: Prisma.SeasonUpdateInput
) => {
  const updatedSeason = await prisma.season.update({
    where: {
      id,
    },
    data: {
      ...season,
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

export const getSeasonsByWorkspaceId = async (id: string) => {
  const seasons = await prisma.season.findMany({
    where: {
      workspaceId: id,
    },
  });

  return seasons;
};
