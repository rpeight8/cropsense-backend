import { NextFunction, Response } from "express";
import {
  isUserAllowedToAccessBusinessField,
  prepareBusinessFieldForResponse,
} from "./utils";
import {
  DeleteBusinessFieldRequest,
  UpdateBusinessFieldRequest,
} from "../types/requests";
import {
  updateBusinessField as updateBusinessFieldDB,
  deleteBusinessField as deleteBusinessFieldDB,
  getBusinessFieldSiblings,
  getBusinessFieldById,
} from "../models/businessFields.model";

import { UpdateBusinessFieldResponse } from "../types/responses";
import { deleteField, getFieldById } from "../models/fields.model";

export const updateBusinessField = async (
  req: UpdateBusinessFieldRequest,
  res: UpdateBusinessFieldResponse,
  next: NextFunction
) => {
  try {
    const { id: fieldId } = req.params;
    const { businessUserId } = req.user;
    const field = req.body;

    if (!isUserAllowedToAccessBusinessField(businessUserId, fieldId)) {
      res.status(403);
      throw new Error("User is not allowed to access this field");
    }

    const updatedField = await updateBusinessFieldDB(fieldId, businessUserId, {
      geometryType: field.geometry.type,
      geometry: field.geometry.coordinates,
      name: field.name,
    });

    res.status(200).json(prepareBusinessFieldForResponse(updatedField));
  } catch (error) {
    next(error);
  }
};

export const deleteBusinessField = async (
  req: DeleteBusinessFieldRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: businessFieldId } = req.params;
    const { businessUserId } = req.user;

    if (!isUserAllowedToAccessBusinessField(businessUserId, businessFieldId)) {
      res.status(403);
      throw new Error("User is not allowed to access this field");
    }

    const siblings = await getBusinessFieldSiblings(businessFieldId);

    if (siblings.length > 0) {
      await deleteBusinessFieldDB(businessFieldId);
    } else {
      // Deletition of field is cascaded to businessField
      const bussinesFieldForDeletion = await getBusinessFieldById(
        businessFieldId
      );
      if (!bussinesFieldForDeletion) {
        res.status(404);
        throw new Error("Business field not found");
      }
      await deleteField(bussinesFieldForDeletion.fieldId);
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// export const getFieldSummary = async (
//   req: GetFieldSummaryRequest,
//   res: GetFieldSummaryResponse,
//   next: NextFunction
// ) => {
//   try {
//     const { id: fieldId } = req.params;
//     const { businessUserId } = req.user;

//     if (!isUserAllowedToAccessField(businessUserId, fieldId)) {
//       res.status(403);
//       throw new Error("User is not allowed to access this field");
//     }

//     const summary = await collectFieldSummary(fieldId);

//     res.status(200).json(summary);
//   } catch (error) {
//     next(error);
//   }
// };
