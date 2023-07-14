import { Prisma } from "@prisma/client";
import { getBusinessFieldById } from "../models/businessFields.model";
import { getSeasonById } from "../models/seasons.model";
import { getWorkspaceById } from "../models/workspaces.model";
import { BusinessFieldResponseSchema } from "../schemas/responses";
import { z } from "zod";



export const businessFieldDefaultSelect = Prisma.validator<Prisma.BusinessFieldArgs>()({
  select: {
    id: true,
    name: true,
    geometryType: true,
    geometry: true,
    seasonId: true,
    cropRotations: {
      select: {
        id: true,
        startDate: true,
        endDate: true,
        crop: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    },
  },
});

type RequiredBusinessFieldForResponsePreparation = Prisma.BusinessFieldGetPayload<typeof businessFieldDefaultSelect> 

export const prepareBusinessFieldForResponse = (
  field: RequiredBusinessFieldForResponsePreparation
): z.infer<typeof BusinessFieldResponseSchema> => {
  return {
    id: field.id,
    name: field.name,
    seasonId: field.seasonId,
    geometry: {
      type: field.geometryType,
      coordinates: field.geometry,
    },
    cropRotations: field.cropRotations.map((cropRotation) => {
      return {
        id: cropRotation.id,
        startDate: cropRotation.startDate,
        endDate: cropRotation.endDate,
        crop: {
          id: cropRotation.crop.id,
          name: cropRotation.crop.name,
          color: cropRotation.crop.color,
        },
      };
    }),
  };
};
