import { NextFunction, Request, Response } from "express";
// import { validateFieldFromRequest } from "../middlewares/validators/fields";
import prisma from "../modules/db";
import { TypeOf } from "zod";
import {
  createFieldSchema,
  getFieldParametersSchema,
} from "../middlewares/validators/fields";
import { ProtectedRequest } from "../middlewares/protect";
import type { Field, Crop } from "@prisma/client";

interface CreateFieldRequest extends ProtectedRequest {
  body: TypeOf<typeof createFieldSchema>;
}
interface GetFieldsRequest extends ProtectedRequest {}
interface GetFieldRequest extends ProtectedRequest {
  params: TypeOf<typeof getFieldParametersSchema>;
}

const prepareFieldForResponse = (field: Field & { crop: Crop | null }) => {
  return {
    id: field.id,
    name: field.name,
    crop: field.crop,
    geometry: {
      type: field.geometryType,
      coordinates: field.coordinates,
    },
  };
};

export const getFields = async (
  req: GetFieldsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const fields = await prisma.field.findMany({
      where: {
        createdById: user.id,
      },
      include: {
        crop: true,
      },
    });

    const preparedFields = fields.map(prepareFieldForResponse);

    res.json(preparedFields);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getField = async (
  req: GetFieldRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const { id } = req.params;

    const field = await prisma.field.findUnique({
      where: {
        id: id,
      },
      include: {
        crop: true,
      },
    });

    if (!field) {
      return res.status(404).json({ message: "Field not found" });
    }

    if (field.createdById !== user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const preparedField = prepareFieldForResponse(field);

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
  console.log("createField: start");
  try {
    const user = req.user;
    const field = req.body;

    console.log(user.id);
    const createdField = await prisma.field.create({
      data: {
        name: field.name,
        geometryType: field.geometry.type,
        coordinates: field.geometry.coordinates,
        crop: field.cropId
          ? {
              connect: {
                id: field.cropId,
              },
            }
          : undefined,
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

    res.json(createdField);
    console.log("createField: end");
    res.end();
    console.log("createField: after res.end()");
  } catch (err) {
    console.log("createField: error");
    next(err);
    console.log("createField: after next(err)");
  }
};
