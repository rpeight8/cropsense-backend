import { NextFunction, Request, Response } from "express";
import {
  getWorkspacesByOwnerId,
  getWorkspacesWithSeasonsByOwnerId,
  // getWorkspacesWithSeasonsWithFieldsByOwnerId,
  createWorkspace as createWorkspaceDB,
  updateWorkspace as updateWorkspaceDB,
  getWorkspaceById,
  deleteWorkspace as deleteWorkspaceDB,
} from "../models/workspaces.model";
import { createSeason, getSeasonsByWorkspaceId } from "../models/seasons.model";
import { isUserAllowedToAccessWorkspace } from "./utils";
import {
  CreateWorkspaceRequest,
  CreateWorkspaceSeasonRequest,
  DeleteWorkspaceRequest,
  GetWorkspaceSeasonsRequest,
  UpdateWorkspaceRequest,
} from "../types/requests";
import {
  CreateWorkspaceResponse,
  CreateWorkspaceSeasonResponse,
  GetWorkspaceSeasonsResponse,
  GetWorkspacesResponse,
  UpdateWorkspaceResponse,
} from "../types/responses";

import { Prisma, Workspace } from "@prisma/client";

export const getWorkspaces = async (
  req: Request,
  res: GetWorkspacesResponse
) => {
  const { businessUserId } = req.user;
  const workspaces = await getWorkspacesByOwnerId(businessUserId);
  res.status(200).json(workspaces);
};

export const createWorkspace = async (
  req: CreateWorkspaceRequest,
  res: CreateWorkspaceResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const reqWorkspace = req.body;

    const workspace: Prisma.WorkspaceCreateInput = {
      name: reqWorkspace.name,
      owner: {
        connect: {
          id: businessUserId,
        },
      },
      createdBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const createdWorkspace = await createWorkspaceDB(workspace);
    res.status(201).json(createdWorkspace);
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
    const reqWorkspace = req.body;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const workspace: Prisma.WorkspaceUpdateInput = {
      name: reqWorkspace.name,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const updatedWorkspace = await updateWorkspaceDB(workspaceId, workspace);
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

export const createWorkspaceSeason = async (
  req: CreateWorkspaceSeasonRequest,
  res: CreateWorkspaceSeasonResponse,
  next: NextFunction
) => {
  try {
    const { businessUserId } = req.user;
    const { id: workspaceId } = req.params;
    const reqSeason = req.body;

    if (!isUserAllowedToAccessWorkspace(businessUserId, workspaceId)) {
      res.status(403);
      throw new Error("User is not allowed to access this workspace");
    }

    const season: Prisma.SeasonCreateInput = {
      name: reqSeason.name,
      workspace: {
        connect: {
          id: workspaceId,
        },
      },
      startDate: reqSeason.startDate,
      endDate: reqSeason.endDate,
      createdBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const createdSeason = await createSeason(season);

    res.status(201).json(createdSeason);
  } catch (err) {
    next(err);
  }
};

export const getWorkspaceSeasons = async (
  req: GetWorkspaceSeasonsRequest,
  res: GetWorkspaceSeasonsResponse,
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
