import { TypeOf } from "zod";
import {
  CreateCropSchema,
  GetCropParametersSchema,
  UpdateCropSchema,
} from "../middlewares/requestsValidators/crops";
import { ProtectedRequest } from "../middlewares/protect";
import { NextFunction, Response } from "express";
import prisma from "../modules/db";

interface CreateCropRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateCropSchema>;
}
interface GetCropsRequest extends ProtectedRequest {}
interface GetCropRequest extends ProtectedRequest {
  params: TypeOf<typeof GetCropParametersSchema>;
}
interface UpdateCropRequest extends ProtectedRequest {
  params: TypeOf<typeof GetCropParametersSchema>;
  body: TypeOf<typeof UpdateCropSchema>;
}
interface DeleteCropRequest extends ProtectedRequest {
  params: TypeOf<typeof GetCropParametersSchema>;
}

export const createCrop = async (
  req: CreateCropRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const crop = await prisma.crop.create({
      data: {
        name: req.body.name,
        color: req.body.color,
        createdBy: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    res.json(crop);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getCrop = async (
  req: GetCropRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const crop = await prisma.crop.findFirst({
      where: {
        id: req.params.id,
      },
    });
    if (!crop) {
      res.status(404);
      res.end();
      return;
    }
    res.json(crop);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const getCrops = async (
  req: GetCropsRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const crops = await prisma.crop.findMany();
    res.json(crops);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const updateCrop = async (
  req: UpdateCropRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const crop = await prisma.crop.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        color: req.body.color,
        updatedAt: new Date(),
        updatedBy: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });
    res.json(crop);
    res.end();
  } catch (err) {
    next(err);
  }
};

export const deleteCrop = async (
  req: DeleteCropRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingCrop = await prisma.crop.findFirst({
      where: {
        id: req.params.id,
      },
    });

    if (!existingCrop) {
      res.status(404);
      res.end();
      return;
    }

    if (existingCrop.createdById !== req.user.id) {
      res.status(403);
      res.end();
      return;
    }

    const crop = await prisma.crop.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json(crop);
    res.end();
  } catch (err) {
    next(err);
  }
};
