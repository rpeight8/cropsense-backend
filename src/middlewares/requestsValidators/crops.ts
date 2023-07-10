import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const CreateCropSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CreateCropsSchema = z.array(CreateCropSchema);

export const UpdateCropSchema = CreateCropSchema;

export const WithIdSchema = z.object({
  id: z.string(),
});

export const UpdateCropParametersSchema = WithIdSchema;
export const GetCropParametersSchema = WithIdSchema;
export const DeleteCropParametersSchema = WithIdSchema;

export const validateCreateCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateCropSchema.parseAsync(req.body);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateGetCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetCropParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateUpdateCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateCropParametersSchema.parseAsync(req.params);
    await UpdateCropSchema.parseAsync(req.body);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateDeleteCrop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DeleteCropParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
