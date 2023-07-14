import { NextFunction, Request, Response } from "express";
import { getBusinessFieldById } from "../models/businessFields.model";
import { getSeasonById } from "../models/seasons.model";
import { getWorkspaceById } from "../models/workspaces.model";

export const validateWorkspaceAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { businessUserId } = req.user;
  const { id: workspaceId } = req.params;
  try {
    if (!(await isUserAllowedToAccessWorkspace(businessUserId, workspaceId))) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateSeasonAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { businessUserId } = req.user;
  const { id: seasonId } = req.params;
  try {
    if (!(await isUserAllowedToAccessSeason(businessUserId, seasonId))) {
      res.status(403);
      throw new Error("User is not allowed to access this season");
    }

    next();
  } catch (err) {
    next(err);
  }
};

export const validateBusinessFieldAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { businessUserId } = req.user;
  const { id: businessFieldId } = req.params;

  try {
    if (
      !(await isUserAllowedToAccessBusinessField(
        businessUserId,
        businessFieldId
      ))
    ) {
      res.status(403);
      throw new Error("User is not allowed to access this business field");
    }
    next();
  } catch (err) {
    next(err);
  }
};

export const isUserAllowedToAccessBusinessField = async (
  businessUserId: string,
  bussinessFieldId: string
) => {
  const field = await getBusinessFieldById(bussinessFieldId);

  if (!field) {
    return false;
  }

  const isSeasonAllowed = await isUserAllowedToAccessSeason(
    businessUserId,
    field.seasonId
  );

  return isSeasonAllowed;
};

export const isUserAllowedToAccessSeason = async (
  businessUserId: string,
  seasonId: string
) => {
  const season = await getSeasonById(seasonId);

  if (!season) {
    return false;
  }

  const isWorkspaceAllowed = await isUserAllowedToAccessWorkspace(
    businessUserId,
    season.workspaceId
  );

  return isWorkspaceAllowed;
};

export const isUserAllowedToAccessWorkspace = async (
  businessUserId: string,
  workspaceId: string
) => {
  const workspace = await getWorkspaceById(workspaceId);

  if (!workspace) {
    return false;
  }

  if (workspace.ownerId !== businessUserId) {
    return false;
  }

  return true;
};
