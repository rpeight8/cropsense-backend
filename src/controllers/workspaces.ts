import { Request, Response } from "express";
import {
  getWorkspacesByOwnerId,
  getWorkspacesWithSeasonsByOwnerId,
  getWorkspacesWithSeasonsWithFieldsByOwnerId,
  createWorkspace as createWorkspaceDB,
} from "../models/workspace";
import {
  CreateWorkspaceRequest,
  WorkspaceExtendsSeasonsFieldsForResponse,
  WorkspaceResponse,
  WorkspacesExtendSeasonsFieldsResponse,
  WorkspacesExtendSeasonsResponse,
  WorkspacesResponse,
} from "../types/workspaces";

export const getWorkspaces = async (req: Request, res: WorkspacesResponse) => {
  const { businessUserId } = req.user;
  const workspaces = await getWorkspacesByOwnerId(businessUserId);
  res.status(200).json(workspaces);
};

export const getWorkspacesWithSeasons = async (
  req: Request,
  res: WorkspacesExtendSeasonsResponse
) => {
  const { businessUserId } = req.user;
  const workspaces = await getWorkspacesWithSeasonsByOwnerId(businessUserId);
  res.status(200).json(workspaces);
};

export const getWorkspacesWithSeasonsWithFields = async (
  req: Request,
  res: WorkspacesExtendSeasonsFieldsResponse
) => {
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
};

export const createWorkspace = async (
  req: CreateWorkspaceRequest,
  res: WorkspaceResponse
) => {
  const { businessUserId } = req.user;
  const { name } = req.body;
  const workspace = await createWorkspaceDB(businessUserId, name);
  res.status(201).json(workspace);
};
