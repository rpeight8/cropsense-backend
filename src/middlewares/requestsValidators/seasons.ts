import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  CreateFieldForSeasonParametersSchema,
  CreateFieldForSeasonBodySchema,
  GetSeasonFieldsParametersSchema,
  UpdateSeasonBodySchema,
  UpdateSeasonParametersSchema,
} from "../../schemas/seasons";

export const validateCreateFieldForSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldForSeasonBodySchema.parseAsync(req.body);
    await CreateFieldForSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateGetSeasonFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetSeasonFieldsParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateUpdateSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateSeasonBodySchema.parseAsync(req.body);
    await UpdateSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateDeleteSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
}
