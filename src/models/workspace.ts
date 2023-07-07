import prisma from "../modules/db";

export const createWorkspace = async (bussinesUserId: string, name: string) => {
  const newWorkspace = await prisma.workspace.create({
    data: {
      name,
      createdBy: {
        connect: {
          id: bussinesUserId,
        },
      },
      owner: {
        connect: {
          id: bussinesUserId,
        },
      },
    },
  });

  return newWorkspace;
};

export const getWorkspaceById = async (workspaceId: string) => {
  const workspace = await prisma.workspace.findFirst({
    where: {
      id: workspaceId,
    },
  });

  return workspace;
};

export const getWorkspacesByOwnerId = async (businessUserId: string) => {
  const workspace = await prisma.workspace.findMany({
    where: {
      ownerId: businessUserId,
    },
  });

  return workspace;
};

export const getWorkspacesWithSeasonsByOwnerId = async (
  businessUserId: string
) => {
  const workspaces = await prisma.workspace.findMany({
    where: {
      ownerId: businessUserId,
    },
    include: {
      seasons: true,
    },
  });

  return workspaces;
};

export const getWorkspacesWithSeasonsWithFieldsByOwnerId = async (
  businessUserId: string
) => {
  const workspaces = await prisma.workspace.findMany({
    where: {
      ownerId: businessUserId,
    },
    include: {
      seasons: {
        include: {
          fields: {
            include: {
              crop: true,
            },
          },
        },
      },
    },
  });

  return workspaces;
};
