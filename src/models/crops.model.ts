import prisma from "../modules/db";

export const getCrops = async () => {
  const crops = await prisma.crop.findMany();
  return crops;
};
