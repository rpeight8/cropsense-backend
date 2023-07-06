import { NextFunction, Response } from "express";
import prisma from "../../modules/db";
import type { Field, Crop } from "@prisma/client";
import {
  getFieldByIdAndSeasonId,
  getFieldsBySeasonId,
} from "../../models/fields";
import { prepapareFieldsBySeasonId, prepareFieldBySeasonId } from "./helpers";
import {
  CreateFieldRequest,
  DeleteFieldRequest,
  GetFieldRequest,
  GetFieldResponse,
  GetFieldsRequest,
  GetFieldsResponse,
  UpdateFieldRequest,
} from "../../types/fields/controlller";
import { validateSeasonBelongsToUser } from "../seasons/helpers";

export const getFields = async (
  req: GetFieldsRequest,
  res: GetFieldsResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { seasonId } = req.params;

    const isValidSeason = await validateSeasonBelongsToUser(seasonId, user.id);

    if (!isValidSeason) {
      return res.status(403).json({ message: "Forbidden season" });
    }

    const fields = await getFieldsBySeasonId(seasonId);

    const preparedFields = prepapareFieldsBySeasonId(fields);

    res.json(preparedFields);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getField = async (
  req: GetFieldRequest,
  res: GetFieldResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { fieldId, seasonId } = req.params;

    const isValidSeason = await validateSeasonBelongsToUser(seasonId, user.id);

    if (!isValidSeason) {
      return res.status(403).json({ message: "Forbidden season" });
    }

    const field = await getFieldByIdAndSeasonId(fieldId, seasonId);

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    const preparedField = prepareFieldBySeasonId(field);

    res.json(preparedField);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const createField = async (
  req: CreateFieldRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { seasonId } = req.params;
    const field = req.body;

    const isValidSeason = await validateSeasonBelongsToUser(seasonId, user.id);

    if (!isValidSeason) {
      return res.status(403).json({ message: "Forbidden season" });
    }

    const crop =
      (field.crop &&
        (await prisma.crop.findFirst({
          where: {
            id: field.crop.id,
          },
        }))) ||
      undefined;

    if (field.crop && !crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    try {
      const transaction = await prisma.$transaction(async (prisma) => {
        const createdField = await prisma.field.create({
          data: {
            name: field.name,
            geometryType: field.geometry.type,
            coordinates: field.geometry.coordinates,
            createdBy: {
              connect: {
                id: user.id,
              },
            },
            updatedBy: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        //TODO: test for crop undefined;
        const createdSeasonField = await prisma.fieldCrop.create({
          data: {
            season: {
              connect: {
                id: seasonId,
              },
            },
            field: {
              connect: {
                id: createdField.id,
              },
            },
            crop: {
              connect: {
                id: crop?.id,
              },
            },
            createdBy: {
              connect: {
                id: user.id,
              },
            },
            updatedBy: {
              connect: {
                id: user.id,
              },
            },
          },
        });

        return {
          createdField,
          createdSeasonField,
        };
      });
    } catch (err) {
      console.log("createField: error in transaction");
      throw err;
    }

    const preparedField = prepareFieldForResponse(createdField);
    res.json(preparedField);
    console.log("createField: end");
    res.end();
    console.log("createField: after res.end()");
  } catch (err) {
    console.log("createField: error");
    next(err);
    console.log("createField: after next(err)");
  }
};

export const updateField = async (
  req: UpdateFieldRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const field = req.body;
    const { id } = req.params;

    const existingField = await prisma.field.findUnique({
      where: {
        id,
      },
    });

    if (!existingField) {
      return res.status(404).json({ error: "Field not found" });
    }

    if (existingField.createdById !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedField = await prisma.field.update({
      where: {
        id,
      },
      data: {
        name: field.name,
        geometryType: field.geometry.type,
        coordinates: field.geometry.coordinates,
        crop: field.crop?.id
          ? {
              connect: {
                id: field.crop.id,
              },
            }
          : {
              disconnect: true,
            },
        updatedAt: new Date(),
        updatedBy: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        crop: true,
      },
    });
    const preparedField = prepareFieldForResponse(updatedField);
    res.json(preparedField);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const deleteField = async (
  req: DeleteFieldRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const existingField = await prisma.field.findUnique({
      where: {
        id,
      },
    });

    if (!existingField) {
      return res.status(404).json({ error: "Field not found" });
    }

    if (existingField.createdById !== user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const deletedField = await prisma.field.delete({
      where: {
        id,
      },
    });

    res.json(deletedField);
    res.end();
  } catch (err) {
    next(err);
  }
};
