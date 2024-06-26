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

    const workspace = {
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

    const createdWorkspace = await createWorkspaceDB({
      data: workspace,
    });
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

    const workspace = {
      name: reqWorkspace.name,
      updatedBy: {
        connect: {
          id: businessUserId,
        },
      },
    };

    const updatedWorkspace = await updateWorkspaceDB({
      where: {
        id: workspaceId,
      },
      data: workspace,
    });
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

    await deleteWorkspaceDB({
      where: {
        id: workspaceId,
      },
    });
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

    const season = {
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

    const createdSeason = await createSeason({
      data: season,
    });

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

    const seasons = await getSeasonsByWorkspaceId(workspaceId);

    res.status(200).json(seasons);
  } catch (error) {
    next(error);
  }
};
