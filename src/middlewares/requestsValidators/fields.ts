import { NextFunction, Request, Response } from "express";
import {
  CreateFieldSchema,
  UpdateFieldParametersSchema,
  UpdateFieldSchema,
} from "../../schemas/fields";

export const validateCreateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body.crop);
    await CreateFieldSchema.parseAsync(req.body);
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
    await UpdateFieldSchema.parseAsync(req.body);
    await UpdateFieldParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
