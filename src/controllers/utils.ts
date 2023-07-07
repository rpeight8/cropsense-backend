import { getSeasonById } from "../models/season";
import { getWorkspaceById } from "../models/workspace";

export const isUserAllowedToAccessSeason = async (
  userId: string,
  seasonId: string
) => {
  const season = await getSeasonById(seasonId);

  if (!season) {
    return false;
  }

  const isWorkspaceAllowed = await isUserAllowedToAccessWorkspace(
    userId,
    season.workspaceId
  );

  return isWorkspaceAllowed;
};

export const isUserAllowedToAccessWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const workspace = await getWorkspaceById(workspaceId);

  if (!workspace) {
    return false;
  }

  if (workspace.ownerId !== userId) {
    return false;
  }

  return true;
};
