import { NextFunction, Response } from "express";
import {
  updateSeason as updateSeasonDB,
  deleteSeason as deleteSeasonDB,
} from "../models/seasons.model";

import { createField, getFieldsBySeasonId } from "../models/fields.model";
import { isUserAllowedToAccessSeason } from "./utils.controller";
import {
  CreateSeasonBusinessFieldRequest,
  DeleteSeasonRequest,
  GetSeasonBusinessFieldsRequest,
  UpdateSeasonRequest,
} from "../types/requests";
import {
  CreateSeasonBusinessFieldResponse,
  GetSeasonBusinessFieldsResponse,
  UpdateSeasonResponse,
} from "../types/responses";
import { getBusinessFieldsBySeasonId } from "../models/businessFields.model";

export const prepareFieldForResponse = (field: unknown) => {
  return {
    id: field.id,
    name: field.name,
    seasonId: field.seasonId,
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

export const createSeasonBusinessField = async (
  req: CreateSeasonBusinessFieldRequest,
  res: CreateSeasonBusinessFieldResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;
    const businessField = req.body;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    res.status(201).json(preparedField);
  } catch (err) {
    next(err);
  }
};

export const getSeasonBusinessFields = async (
  req: GetSeasonBusinessFieldsRequest,
  res: GetSeasonBusinessFieldsResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const fields = await getBusinessFieldsBySeasonId(seasonId);

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
