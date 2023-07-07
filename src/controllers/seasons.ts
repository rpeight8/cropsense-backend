import { NextFunction } from "express";
import { createSeason as createSeasonDB } from "../models/season";

import {
  CreateFieldForSeasonRequest,
  CreateSeasonRequest,
  SeasonResponse,
} from "../types/seasons";
import { FieldResponse } from "../types/field";
import { createField, updateField } from "../models/field";

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
    const field = req.body;

    const createdField = await createField({
      seasonId,
      createdById: user.businessUserId,
      geometryType: field.geometry.type,
      coordinates: field.geometry.coordinates,
      name: field.name,
      cropId: field.crop ? field.crop.id : null,
    });

    const preparedField = prepareFieldForResponse(createdField);

    res.status(201).json(preparedField);
  } catch (err) {
    next(err);
  }
};
