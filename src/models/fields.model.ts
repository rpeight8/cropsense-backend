import prisma from "../modules/db";
import { GeometryType } from "../types/fields";

export const createField = async (field: {
  name: string;
  geometryType: GeometryType;
  coordinates: any;
  seasonId: string;
  cropId: string | null;
  createdById: string;
}) => {
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
          id: field.createdById,
        },
      },
    },
    include: {
      crop: true,
    },
  });

  return newField;
};

export const updateField = async (field: {
  id: string;
  name: string;
  geometryType: GeometryType;
  coordinates: any;
  cropId: string | null;
  updatedById: string;
}) => {
  const updatedField = await prisma.field.update({
    where: {
      id: field.id,
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
          id: field.updatedById,
        },
      },
    },
    include: {
      crop: true,
    },
  });

  return updatedField;
};

export const deleteField = async (fieldId: string) => {
  const deletedField = await prisma.field.delete({
    where: {
      id: fieldId,
    },
  });

  return deletedField;
};

export const getFieldById = async (fieldId: string) => {
  const field = await prisma.field.findFirst({
    where: {
      id: fieldId,
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
