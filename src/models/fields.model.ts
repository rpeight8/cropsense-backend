import prisma from "../modules/db";
import { GeometryType } from "../types/fields";

export const createField = async (
  bussinesUserId: string,
  field: {
    name: string;
    geometryType: GeometryType;
    coordinates: any;
    seasonId: string;
    cropId: string | null;
  }
) => {
  const newField = await prisma.field.create({
    data: {
      name: field.name,
      geometryType: field.geometryType,
      coordinates: field.coordinates,
      crop: field.cropId
        ? {
            connect: {
              id: field.cropId,
            },
          }
        : undefined,
      season: {
        connect: {
          id: field.seasonId,
        },
      },
      createdBy: {
        connect: {
          id: bussinesUserId,
        },
      },
    },
    include: {
      crop: true,
    },
  });

  return newField;
};

export const updateField = async (
  id: string,
  bussinesUserId: string,
  field: {
    name: string;
    geometryType: GeometryType;
    coordinates: any;
    cropId: string | null;
  }
) => {
  const updatedField = await prisma.field.update({
    where: {
      id,
    },
    data: {
      name: field.name,
      geometryType: field.geometryType,
      coordinates: field.coordinates,
      crop: field.cropId
        ? {
            connect: {
              id: field.cropId,
            },
          }
        : {
            disconnect: true,
          },
      updatedBy: {
        connect: {
          id: bussinesUserId,
        },
      },
      updatedAt: new Date(),
    },
    include: {
      crop: true,
    },
  });

  return updatedField;
};

export const deleteField = async (id: string) => {
  const deletedField = await prisma.field.delete({
    where: {
      id,
    },
  });

  return deletedField;
};

export const getFieldById = async (id: string) => {
  const field = await prisma.field.findFirst({
    where: {
      id,
    },
    include: {
      crop: true,
    },
  });

  return field;
};

export const getFieldsBySeasonId = async (seasonId: string) => {
  const fields = await prisma.field.findMany({
    where: {
      seasonId,
    },
    include: {
      crop: true,
    },
  });

  return fields;
};
