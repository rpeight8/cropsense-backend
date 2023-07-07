import { NextFunction, Request, Response } from "express";
import { CreateWorkspaceSchema } from "../../schemas/workspaces";

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
