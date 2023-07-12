import { getFieldById } from "../models/fields.model";
import { getSeasonById } from "../models/seasons.model";
import { getWorkspaceById } from "../models/workspaces.model";

export const isUserAllowedToAccessField = async (
  userId: string,
  bussinessFieldId: string
) => {
  const field = await getBusinessFieldById(bussinessFieldId);

  if (!field) {
    return false;
  }

  const isSeasonAllowed = await isUserAllowedToAccessSeason(
    userId,
    field.seasonId
  );

  return isSeasonAllowed;
};

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
