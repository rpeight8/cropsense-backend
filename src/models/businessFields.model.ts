import prisma from "../modules/db";

export const getBusinessField = async (id: string) => {
  const businessField = await prisma.businessField.findUnique({
    where: {
      id,
    },
  });
  return businessField;
};

export const getBusinessFieldsBySeasonId = async (id: string) => {
  const businessFields = await prisma.businessField.findMany({
    where: {
      seasonId: id,
    },
  });
  return businessFields;
};

export const updateBusinessField = async (
  id: string,
  businessUserId: string,
  businessField: Pick<
    Parameters<typeof prisma.businessField.update>[0]["data"],
    "seasonId" | "name" | "geometry" | "geometryType"
  >
) => {
  const updatedBusinessField = await prisma.businessField.update({
    where: {
      id,
    },
    data: {
      ...businessField,
      updatedAt: new Date(),
    },
  });
  return updatedBusinessField;
};
