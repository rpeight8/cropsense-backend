import { Request, Response } from "express";
import {
  getWorkspacesByOwnerId,
  getWorkspacesWithSeasonsByOwnerId,
  getWorkspacesWithSeasonsWithFieldsByOwnerId,
  createWorkspace as createWorkspaceDB,
} from "../../models/workspace";
import {
  CreateWorkspaceRequest,
  WorkspaceResponse,
  WorkspacesExtendSeasonsFieldsResponse,
  WorkspacesExtendSeasonsResponse,
  WorkspacesResponse,
} from "../../types/workspaces";

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

  const preparedWorkspaces = workspaces.map((workspace) => {
    const preparedSeasons = workspace.seasons.map((season) => {
      const preparedFields = season.fields.map((field) => {
        return {
          ...field,
          geometry: {
            type: field.geometryType,
            coordinates: field.coordinates,
          },
        };
      });
      season.fields = preparedFields;
      return season;
    });
    workspace.seasons = preparedSeasons;
    return workspace;
  });

  res.status(200).json(preparedWorkspaces);
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
