import prisma from "../modules/db";

export const getFieldsBySeasonId = async (seasonId: string) => {
  const fieldsBySeason = await prisma.fieldCrop.findMany({
    where: { seasonId },
    select: {
      field: {
        select: {
          id: true,
          name: true,
          geometryType: true,
          coordinates: true,
        },
      },
      crop: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });

  return fieldsBySeason;
};

export const getFieldByIdAndSeasonId = async (
  fieldId: string,
  seasonId: string
) => {
  const fieldBySeason = await prisma.fieldCrop.findFirst({
    where: {
      seasonId,
      field: {
        id: fieldId,
      },
    },
    select: {
      field: {
        select: {
          id: true,
          name: true,
          geometryType: true,
          coordinates: true,
        },
      },
      crop: {
        select: {
          id: true,
          name: true,
          color: true,
        },
      },
    },
  });

  return fieldBySeason;
};
