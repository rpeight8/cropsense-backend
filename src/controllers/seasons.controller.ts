import { NextFunction, Response } from "express";
import { Prisma } from "@prisma/client";
import {
  updateSeason as updateSeasonDB,
  deleteSeason as deleteSeasonDB,
} from "../models/seasons.model";

import {
  businessFieldDefaultSelect,
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

    const newBusinessField = {
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
      cropRotations: {
        create: reqBusinessField.cropRotations.map((cropRotation) => ({
          crop: {
            connect: {
              id: cropRotation.cropId,
            },
          },
          startDate: cropRotation.startDate,
          endDate: cropRotation.endDate,
          createdBy: {
            connect: {
              id: businessUserId,
            },
          },
        })),
      },
    };

    const createdBusinessField = await createBusinessField({
      data: newBusinessField,
      ...businessFieldDefaultSelect,
    });
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

    const season = {
      name: reqSeason.name,
      startDate: reqSeason.startDate,
      endDate: reqSeason.endDate,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const updatedSeason = await updateSeasonDB({
      where: {
        id: seasonId,
      },
      data: season,
    });

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

    await deleteSeasonDB({
      where: {
        id: seasonId,
      },
    });

    res.status(200).json({ message: "Season deleted successfully" });
  } catch (error) {
    next(error);
  }
};
