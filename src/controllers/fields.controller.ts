import { NextFunction, Response } from "express";
import {
  DeleteFieldRequest,
  FieldForResponse,
  FieldResponse,
  UpdateFieldRequest,
} from "../types/fields";
import {
  updateField as updateFieldDB,
  deleteField as deleteFieldDB,
} from "../models/fields.model";
import { isUserAllowedToAccessField } from "./utils.controller";

export const prepareFieldForUpdateResponse = (
  field: Awaited<ReturnType<typeof updateFieldDB>>
): FieldForResponse => {
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

export const updateField = async (
  req: UpdateFieldRequest,
  res: FieldResponse,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = req.user;
    const field = req.body;

    if (!isUserAllowedToAccessField(user.id, id)) {
      res.status(403);
      throw new Error("User is not allowed to access this field");
    }

    const updatedField = await updateFieldDB({
      id,
      updatedById: user.businessUserId,
      geometryType: field.geometry.type,
      coordinates: field.geometry.coordinates,
      name: field.name,
      cropId: field.crop ? field.crop.id : null,
    });

    res.status(200).json(prepareFieldForUpdateResponse(updatedField));
  } catch (error) {
    next(error);
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

    if (!isUserAllowedToAccessField(user.id, id)) {
      res.status(403);
      throw new Error("User is not allowed to access this field");
    }

    await deleteFieldDB(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
