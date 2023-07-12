import e, { NextFunction, Request, Response } from "express";
import {
  CreateWorkspaceRequestSchema,
  CreateWorkspaceSeasonRequestSchema,
  DeleteWorkspaceRequestSchema,
  GetWorkspaceSeasonsRequestSchema,
  UpdateWorkspaceRequestSchema,
} from "../../schemas/requests";

export const validateCreateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateWorkspaceRequestSchema.parseAsync(req);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateUpdateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateWorkspaceRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateDeleteWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DeleteWorkspaceRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateCreateWorkspaceSeason = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateWorkspaceSeasonRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const validateWorkspacesSeasons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetWorkspaceSeasonsRequestSchema.parseAsync(req);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
