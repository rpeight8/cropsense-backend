import prisma from "../modules/db";
import { Prisma } from "@prisma/client";
import { DateTime } from "luxon";

export const createSeason = async <T extends Prisma.SeasonCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.SeasonCreateArgs>
) => {
  const newSeason = await prisma.season.create(args);

  return newSeason;
};

export const updateSeason = async <T extends Prisma.SeasonUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.SeasonUpdateArgs>
) => {
  const updatedSeason = await prisma.season.update(args);

  return updatedSeason;
};

export const deleteSeason = async <T extends Prisma.SeasonDeleteArgs>(
  args: Prisma.SelectSubset<T, Prisma.SeasonDeleteArgs>
) => {
  const deletedSeason = await prisma.season.delete(args);

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
