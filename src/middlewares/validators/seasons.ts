import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import {
  CreateFieldForSeasonParametersSchema,
  CreateFieldForSeasonSchema,
  CreateSeasonSchema,
} from "../../schemas/seasons";

export const validateCreateSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateSeasonSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateCreateFieldForSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldForSeasonSchema.parseAsync(req.body);
    await CreateFieldForSeasonParametersSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
