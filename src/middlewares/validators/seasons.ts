import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const getSeasonParametersSchema = z.object({
  seasonId: z.string(),
});

export const createSeasonSchema = z.object({
  name: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const updateSeasonSchema = createSeasonSchema;
export const updateSeasonParametersSchema = getSeasonParametersSchema;
export const deleteSeasonParametersSchema = getSeasonParametersSchema;

export const validateGetSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await getSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateGetSeasons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateCreateSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await createSeasonSchema.parseAsync(req.body);
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
    await updateSeasonSchema.parseAsync(req.body);
    await updateSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};

export const validateDeleteSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteSeasonParametersSchema.parseAsync(req.params);
    next();
  } catch (err) {
    res.status(400);
    next(err);
  }
};
