import { NextFunction, Request, Response } from "express";
import {
  getWorkspacesByOwnerId,
  getWorkspacesWithSeasonsByOwnerId,
  getWorkspacesWithSeasonsWithFieldsByOwnerId,
  createWorkspace as createWorkspaceDB,
  getWorkspaceById,
} from "../models/workspace";
import {
  CreateSeasonForWorkspaceRequest,
  CreateWorkspaceRequest,
  WorkspaceExtendsSeasonsFieldsForResponse,
  WorkspaceResponse,
  WorkspacesExtendSeasonsFieldsResponse,
  WorkspacesExtendSeasonsResponse,
  WorkspacesResponse,
} from "../types/workspaces";
import { createSeason } from "../models/season";
import { SeasonResponse } from "../types/seasons";
import { isUserAllowedToAccessWorkspace } from "./utils";

export const getWorkspaces = async (req: Request, res: WorkspacesResponse) => {
  const { businessUserId } = req.user;
  const workspaces = await getWorkspacesByOwnerId(businessUserId);
  res.status(200).json(workspaces);
};

export const getWorkspacesWithSeasons = async (
  req: Request,
  res: WorkspacesExtendSeasonsResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const workspaces = await getWorkspacesWithSeasonsByOwnerId(businessUserId);
    res.status(200).json(workspaces);
  } catch (error) {
    next(error);
  }
};

export const getWorkspacesWithSeasonsWithFields = async (
  req: Request,
  res: WorkspacesExtendSeasonsFieldsResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const workspaces = await getWorkspacesWithSeasonsWithFieldsByOwnerId(
      businessUserId
    );

    for (const workspace of workspaces) {
      for (const season of workspace.seasons) {
        // @ts-ignore WHAT A FILTHY HACK
        season.fields = season.fields.map((field) => {
          const geometry = {
            type: field.geometryType,
            coordinates: field.coordinates,
          };
          const newField = {
            id: field.id,
            name: field.name,
            geometry,
            crop: field.crop,
            seasonId: field.seasonId,
          };
          return newField;
        });
      }
    }

    // @ts-ignore WHAT A FILTHY HACK
    res.status(200).json(workspaces);
  } catch (error) {
    next(error);
  }
};

export const createWorkspace = async (
  req: CreateWorkspaceRequest,
  res: WorkspaceResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { name } = req.body;
    const workspace = await createWorkspaceDB(businessUserId, name);
    res.status(201).json(workspace);
  } catch (err) {
    next(err);
  }
};

export const createSeasonForWorkspace = async (
  req: CreateSeasonForWorkspaceRequest,
  res: SeasonResponse,
  next: NextFunction
) => {
  try {
    const user = req.user;

    const { name, workspaceId } = req.body;

    if (!isUserAllowedToAccessWorkspace(user.id, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const workspace = await getWorkspaceById(workspaceId);

    if (!workspace || workspace.createdById !== user.businessUserId) {
      res.status(403);
      throw new Error(
        "You are not allowed to create a season in this workspace"
      );
    }

    const season = await createSeason(workspaceId, user.businessUserId, name);

    res.status(201).json(season);
  } catch (err) {
    next(err);
  }
};