import { NextFunction, Response } from "express";
import {
  updateSeason as updateSeasonDB,
  deleteSeason as deleteSeasonDB,
} from "../models/seasons.model";

import {
  CreateFieldForSeasonRequest,
  CreateFieldForSeasonResponse,
  DeleteSeasonRequest,
  GetSeasonFieldsRequest,
  GetSeasonFieldsResponse,
  UpdateSeasonRequest,
  UpdateSeasonResponse,
} from "../types/seasons";
import { createField, getFieldsBySeasonId } from "../models/fields.model";
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
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;
    const field = req.body;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const createdField = await createField({
      seasonId,
      createdById: businessUserId,
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
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
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

export const updateSeason = async (
  req: UpdateSeasonRequest,
  res: UpdateSeasonResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;
    const season = req.body;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const updatedSeason = await updateSeasonDB(
      seasonId,
      businessUserId,
      season
    );

    res.status(200).json(updatedSeason);
  } catch (error) {
    next(error);
  }
};

export const deleteSeason = async (
  req: DeleteSeasonRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    await deleteSeasonDB(seasonId);

    res.status(200).json({ message: "Season deleted successfully" });
  } catch (error) {
    next(error);
  }
};
