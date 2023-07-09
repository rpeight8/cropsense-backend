import { NextFunction, Request, Response } from "express";
import {
  CreateSeasonForWorkspaceParametersSchema,
  CreateSeasonForWorkspaceBodySchema,
  CreateWorkspaceSchema,
  GetWorkspacesSeasonsParametersSchema,
} from "../../schemas/workspaces";

export const validateCreateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateWorkspaceSchema.parseAsync(req.body);
    next();
  } catch (err) {
    next(err);
  }
};

export const validateCreateSeasonForWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateSeasonForWorkspaceParametersSchema.parseAsync(req.params);
    await CreateSeasonForWorkspaceBodySchema.parseAsync(req.body);
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
    await GetWorkspacesSeasonsParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
