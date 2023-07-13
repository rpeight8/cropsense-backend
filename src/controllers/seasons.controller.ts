import { NextFunction, Response } from "express";
import { Prisma } from "@prisma/client";
import {
  updateSeason as updateSeasonDB,
  deleteSeason as deleteSeasonDB,
} from "../models/seasons.model";

import {
  isUserAllowedToAccessSeason,
  prepareBusinessFieldForResponse,
} from "./utils";
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
import {
  createBusinessField,
  getBusinessFieldsBySeasonId,
} from "../models/businessFields.model";

export const createSeasonBusinessField = async (
  req: CreateSeasonBusinessFieldRequest,
  res: CreateSeasonBusinessFieldResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: seasonId } = req.params;
    const reqBusinessField = req.body;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const newBusinessField: Prisma.BusinessFieldCreateInput = {
      name: reqBusinessField.name,
      geometryType: reqBusinessField.geometry.type,
      geometry: reqBusinessField.geometry.coordinates,
      createdBy: {
        connect: {
          id: businessUserId,
        },
      },
      field: {
        create: {
          name: reqBusinessField.name,
          createdBy: {
            connect: {
              id: businessUserId,
            },
          },
        },
      },
      season: {
        connect: {
          id: seasonId,
        },
      },
      cropRotations:
        (reqBusinessField.crop && {
          create: {
            crop: {
              connect: {
                id: reqBusinessField.crop.id,
              },
            },
            startDate: reqBusinessField.crop.startDate,
            endDate: reqBusinessField.crop.endDate,
            createdBy: {
              connect: {
                id: businessUserId,
              },
            },
          },
        }) ||
        undefined,
    };

    const createdBusinessField = await createBusinessField(newBusinessField);
    res.status(201).json(prepareBusinessFieldForResponse(createdBusinessField));
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

    const preparedFields = fields.map(prepareBusinessFieldForResponse);

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
    const reqSeason = req.body;

    if (!isUserAllowedToAccessSeason(businessUserId, seasonId)) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    const season: Prisma.SeasonUpdateInput = {
      name: reqSeason.name,
      startDate: reqSeason.startDate,
      endDate: reqSeason.endDate,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const updatedSeason = await updateSeasonDB(seasonId, season);

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
