import { NextFunction, Request, Response } from "express";
import {
  CreateSeasonBusinessFieldRequestSchema,
  DeleteSeasonRequestSchema,
  GetSeasonBusinessFieldsRequestSchema,
  UpdateSeasonRequestSchema,
} from "../../schemas/requests";

export const validateCreateSeasonBusinessField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateSeasonBusinessFieldRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateGetSeasonBusinessFields = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetSeasonBusinessFieldsRequestSchema.parseAsync(req.params);
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
    await UpdateSeasonRequestSchema.parseAsync(req);
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
    await DeleteSeasonRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
