import prisma from "../modules/db";
import { Prisma } from "@prisma/client";

export const createWorkspace = async (
  workspace: Prisma.WorkspaceCreateInput
) => {
  const newWorkspace = await prisma.workspace.create({
    data: {
      ...workspace,
    },
  });

  return newWorkspace;
};

export const updateWorkspace = async (
  id: string,
  workspace: Prisma.WorkspaceUpdateInput
) => {
  const updatedWorkspace = await prisma.workspace.update({
    where: {
      id,
    },
    data: {
      ...workspace,
    },
  });

  return updatedWorkspace;
};

export const deleteWorkspace = async (id: string) => {
  const deletedWorkspace = await prisma.workspace.delete({
    where: {
      id,
    },
  });

  return deletedWorkspace;
};

export const getWorkspaceById = async (id: string) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id,
    },
  });

  return workspace;
};

export const getWorkspacesByOwnerId = async (id: string) => {
  const workspace = await prisma.workspace.findMany({
    where: {
      ownerId: id,
    },
  });

  return workspace;
};

export const getWorkspacesWithSeasonsByOwnerId = async (id: string) => {
  const workspaces = await prisma.workspace.findMany({
    where: {
      ownerId: id,
    },
    include: {
      seasons: true,
    },
  });

  return workspaces;
};
