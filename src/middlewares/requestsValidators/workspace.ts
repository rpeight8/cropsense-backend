import { NextFunction, Request, Response } from "express";
import {
  CreateSeasonForWorkspaceParametersSchema,
  CreateSeasonForWorkspaceSchema,
  CreateWorkspaceSchema,
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
    await CreateSeasonForWorkspaceSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400);
    next(error);
  }
};
