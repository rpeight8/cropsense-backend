import { NextFunction, Request, Response } from "express";
import {
  CreateFieldBodySchema,
  UpdateFieldParametersSchema,
  UpdateFieldBodySchema,
  DeleteFieldParametersSchema,
} from "../../schemas/fields";

export const validateCreateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.crop);
    await CreateFieldBodySchema.parseAsync(req.body);
    next();
  } catch (error) {
    console.log("ERROR");
    res.status(400);
    next(error);
  }
};

export const validateUpdateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateFieldBodySchema.parseAsync(req.body);
    await UpdateFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateDeleteField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DeleteFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
