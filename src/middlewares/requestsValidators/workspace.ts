import e, { NextFunction, Request, Response } from "express";
import {
  CreateSeasonForWorkspaceParametersSchema,
  CreateSeasonForWorkspaceBodySchema,
  CreateWorkspaceBodySchema,
  GetWorkspacesSeasonsParametersSchema,
  UpdateWorkspaceBodySchema,
  UpdateWorkspaceParametersSchema,
  DeleteWorkspaceParametersSchema,
} from "../../schemas/workspaces";

export const validateCreateWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateWorkspaceBodySchema.parseAsync(req.body);
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
    await UpdateWorkspaceBodySchema.parseAsync(req.body);
    await UpdateWorkspaceParametersSchema.parseAsync(req.params);
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
    await DeleteWorkspaceParametersSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400);
    next(error);
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
