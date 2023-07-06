import { NextFunction, Request, Response } from "express";
import {
  CreateFieldSchema,
  GetFieldParametersSchema,
  UpdateFieldParametersSchema,
  UpdateFieldSchema,
  deleteFieldParametersSchema,
} from "../../schemas/fields/validators";

export const validateCreateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateGetField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateUpdateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateFieldSchema.parseAsync(req.body);
    await UpdateFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateDeleteField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
