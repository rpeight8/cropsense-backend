import { NextFunction, Request, Response } from "express";
import {
  getWorkspacesByOwnerId,
  getWorkspacesWithSeasonsByOwnerId,
  getWorkspacesWithSeasonsWithFieldsByOwnerId,
  createWorkspace as createWorkspaceDB,
  updateWorkspace as updateWorkspaceDB,
  getWorkspaceById,
  deleteWorkspace as deleteWorkspaceDB,
} from "../models/workspaces.model";
import {
  CreateSeasonForWorkspaceRequest,
  CreateWorkspaceRequest,
  DeleteWorkspaceRequest,
  GetWorkspacesSeasonsRequest,
  UpdateWorkspaceRequest,
  UpdateWorkspaceResponse,
  WorkspaceResponse,
  WorkspacesExtendSeasonsFieldsResponse,
  WorkspacesExtendSeasonsResponse,
  WorkspacesResponse,
} from "../types/workspaces";
import { createSeason, getSeasonsByWorkspaceId } from "../models/seasons.model";
import { SeasonResponse, SeasonsResponse } from "../types/seasons";
import { isUserAllowedToAccessWorkspace } from "./utils.controller";

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

export const updateWorkspace = async (
  req: UpdateWorkspaceRequest,
  res: UpdateWorkspaceResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: workspaceId } = req.params;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const updatedWorkspace = await updateWorkspaceDB(
      workspaceId,
      businessUserId,
      req.body
    );
    res.status(200).json(updatedWorkspace);
  } catch (err) {
    next(err);
  }
};

export const deleteWorkspace = async (
  req: DeleteWorkspaceRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: workspaceId } = req.params;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    await deleteWorkspaceDB(workspaceId);
    res.status(204).end();
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
    const { businessUserId } = req.user;
    const { id: workspaceId } = req.params;
    const season = req.body;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const createdSeason = await createSeason(
      workspaceId,
      businessUserId,
      season
    );

    res.status(201).json(createdSeason);
  } catch (err) {
    next(err);
  }
};

export const getWorkspacesSeasons = async (
  req: GetWorkspacesSeasonsRequest,
  res: SeasonsResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: workspaceId } = req.params;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const seasons = await getSeasonsByWorkspaceId(workspaceId);

    res.status(200).json(seasons);
  } catch (error) {
    next(error);
  }
};
