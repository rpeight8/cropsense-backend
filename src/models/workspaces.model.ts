import prisma from "../modules/db";
import { Prisma } from "@prisma/client";

export const createWorkspace = async <T extends Prisma.WorkspaceCreateArgs>(
  args: Prisma.SelectSubset<T, Prisma.WorkspaceCreateArgs>
) => {
  const newWorkspace = await prisma.workspace.create(args);

  return newWorkspace;
};

export const updateWorkspace = async <T extends Prisma.WorkspaceUpdateArgs>(
  args: Prisma.SelectSubset<T, Prisma.WorkspaceUpdateArgs>
) => {
  const updatedWorkspace = await prisma.workspace.update(args);

  return updatedWorkspace;
};

export const deleteWorkspace = async <T extends Prisma.WorkspaceDeleteArgs>(
  args: Prisma.SelectSubset<T, Prisma.WorkspaceDeleteArgs>
) => {
  const deletedWorkspace = await prisma.workspace.delete(args);

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
