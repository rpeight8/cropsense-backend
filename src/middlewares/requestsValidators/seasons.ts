import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  CreateFieldForSeasonParametersSchema,
  CreateFieldForSeasonSchema,
  GetSeasonFieldsParametersSchema,
} from "../../schemas/seasons";

export const validateCreateFieldForSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldForSeasonSchema.parseAsync(req.body);
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
