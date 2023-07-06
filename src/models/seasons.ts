import prisma from "../modules/db";

export const getSeasonById = async (seasonId: string) => {
  const season = await prisma.season.findFirst({
    where: {
      id: seasonId,
    },
  });

  return season;
};
