import { NextFunction } from "express";
import { createSeason as createSeasonDB } from "../models/seasons.model";

import {
  CreateFieldForSeasonRequest,
  CreateFieldForSeasonResponse,
  GetSeasonFieldsRequest,
  GetSeasonFieldsResponse,
} from "../types/seasons";
import { FieldResponse } from "../types/field";
import {
  createField,
  getFieldsBySeasonId,
  updateField,
} from "../models/fields.model";
import { isUserAllowedToAccessSeason } from "./utils.controller";

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

export const createFieldForSeason = async (
  req: CreateFieldForSeasonRequest,
  res: CreateFieldForSeasonResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id: seasonId } = req.params;
    const field = req.body;

    if (!isUserAllowedToAccessSeason(user.id, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

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

export const getSeasonFields = async (
  req: GetSeasonFieldsRequest,
  res: GetSeasonFieldsResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id: seasonId } = req.params;

    if (!isUserAllowedToAccessSeason(user.id, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const fields = await getFieldsBySeasonId(seasonId);

    const preparedFields = fields.map(prepareFieldForResponse);

    res.status(200).json(preparedFields);
  } catch (error) {
    next(error);
  }
};
