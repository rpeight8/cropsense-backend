import prisma from "../modules/db";
import { GeometryType } from "../types/field";

export const createField = async (field: {
  name: string;
  geometryType: GeometryType;
  coordinates: any;
  cropId: string | undefined;
  seasonId: string;
  createdBy: string;
}) => {
  const newField = await prisma.field.create({
    data: {
      name: field.name,
      geometryType: field.geometryType,
      coordinates: field.coordinates,
      crop: {
        connect: {
          id: field.cropId,
        },
      },
      season: {
        connect: {
          id: field.seasonId,
        },
      },
      createdBy: {
        connect: {
          id: field.createdBy,
        },
      },
    },
    include: {
      crop: true,
    },
  });

  return newField;
};
