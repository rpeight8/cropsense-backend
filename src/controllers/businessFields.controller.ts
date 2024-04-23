import { NextFunction, Response } from "express";
import {
  businessFieldDefaultSelect,
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
import { deleteField } from "../models/fields.model";
import prisma from "../modules/db";
import {
  createCropRotation,
  deleteCropRotations,
  getCropRotations,
  updateCropRotation,
} from "../models/cropRotations.model";

export const updateBusinessField = async (
  req: UpdateBusinessFieldRequest,
  res: UpdateBusinessFieldResponse,
  next: NextFunction
) => {
  try {
    const { id: fieldId } = req.params;
    const { businessUserId } = req.user;
    const reqField = req.body;

    if (reqField.cropRotations.length > 5) {
      res.status(400);
      throw new Error(
        "Maximum number of crop rotations for particular field is 5"
      );
    }

    const existingCropRotations = await getCropRotations({
      where: {
        businessFieldId: fieldId,
      },
    });

    const cropRotationsToDelete = existingCropRotations.filter(
      (existingCropRotation) => {
        return !reqField.cropRotations.some((cropRotation) => {
          return cropRotation.id === existingCropRotation.id;
        });
      }
    );

    const cropRotationsToUpdate = existingCropRotations.filter(
      (existingCropRotation) => {
        return reqField.cropRotations.some((cropRotation) => {
          return cropRotation.id === existingCropRotation.id;
        });
      }
    );

    const cropRotationsToCreate = reqField.cropRotations.filter(
      (cropRotation) => {
        return !existingCropRotations.some((existingCropRotation) => {
          return cropRotation.id === existingCropRotation.id;
        });
      }
    );

    const updatedBusinessField = await prisma.$transaction(async () => {
      if (cropRotationsToCreate.length > 0) {
        await Promise.all(
          cropRotationsToCreate.map(async (cropRotation) => {
            // TODO: double check is it possible to do it using batching craeteMany
            return await createCropRotation({
              data: {
                crop: {
                  connect: {
                    id: cropRotation.cropId,
                  },
                },
                businessField: {
                  connect: {
                    id: fieldId,
                  },
                },
                createdBy: {
                  connect: {
                    id: businessUserId,
                  },
                },
                startDate: cropRotation.startDate,
                endDate: cropRotation.endDate,
              },
            });
          })
        );
      }

      if (cropRotationsToUpdate.length > 0) {
        await Promise.all(
          cropRotationsToUpdate.map(async (cropRotation) => {
            return await updateCropRotation(cropRotation.id, {
              data: {
                crop: {
                  connect: {
                    id: cropRotation.cropId,
                  },
                },
                startDate: cropRotation.startDate,
                endDate: cropRotation.endDate,
              },
            });
          })
        );
      }

      if (cropRotationsToDelete.length > 0) {
        await deleteCropRotations({
          where: {
            id: {
              in: cropRotationsToDelete.map((cropRotation) => {
                return cropRotation.id;
              }),
            },
          },
        });
      }

      const updatedBusinessField = await updateBusinessFieldDB({
        where: {
          id: fieldId,
        },
        data: {
          name: reqField.name,
          geometryType: reqField.geometry.type,
          geometry: reqField.geometry.coordinates,
          updatedBy: {
            connect: {
              id: businessUserId,
            },
          },
        },
        ...businessFieldDefaultSelect,
      });
      return updatedBusinessField;
    });

    res.status(200).json(prepareBusinessFieldForResponse(updatedBusinessField));
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

    const siblings = await getBusinessFieldSiblings(businessFieldId);

    if (siblings.length > 0) {
      await deleteBusinessFieldDB({ where: { id: businessFieldId } });
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
