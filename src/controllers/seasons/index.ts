import { NextFunction } from "express";
import { createSeason as createSeasonDB } from "../../models/season";
import prisma from "../../modules/db";

import {
  CreateFieldForSeasonRequest,
  CreateSeasonRequest,
  SeasonResponse,
} from "../../types/seasons";
import { FieldResponse } from "../../types/field";
import { createField } from "../../models/field";

export const prepareFieldForResponse = (
  field: Awaited<ReturnType<typeof createField>>
) => {
  return {
    id: field.id,
    name: field.name,
    geometry: {
      type: field.geometryType,
      coordinates: field.coordinates,
    },
    crop:
      (field.crop && {
        id: field.crop.id,
        name: field.crop.name,
        color: field.crop.color,
      }) ||
      null,
  };
};

export const createSeason = async (
  req: CreateSeasonRequest,
  res: SeasonResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { name, startDate, endDate, workspaceId } = req.body;

    const season = await createSeasonDB(workspaceId, user.businessUserId, name);

    res.status(201).json(season);
  } catch (err) {
    next(err);
  }
};

export const createFieldForSeason = async (
  req: CreateFieldForSeasonRequest,
  res: FieldResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id: seasonId } = req.params;

    const createdField = await createField({
      name: req.body.name,
      geometryType: req.body.geometry.type,
      coordinates: req.body.geometry.coordinates,
      cropId: req.body.crop?.id,
      seasonId,
      createdBy: user.businessUserId,
    });

    const preparedField = prepareFieldForResponse(createdField);

    res.status(201).json(preparedField);
  } catch (err) {
    next(err);
  }
};
