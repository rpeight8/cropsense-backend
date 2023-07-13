import {
  createBusinessField,
  getBusinessFieldById,
  getBusinessFieldsBySeasonId,
  updateBusinessField,
} from "../models/businessFields.model";
import { getSeasonById } from "../models/seasons.model";
import { getWorkspaceById } from "../models/workspaces.model";

export const isUserAllowedToAccessField = async (
  businessUserId: string,
  bussinessFieldId: string
) => {
  const field = await getBusinessFieldById(bussinessFieldId);

  if (!field) {
    return false;
  }

  const isSeasonAllowed = await isUserAllowedToAccessSeason(
    businessUserId,
    field.seasonId
  );

  return isSeasonAllowed;
};

export const isUserAllowedToAccessSeason = async (
  businessUserId: string,
  seasonId: string
) => {
  const season = await getSeasonById(seasonId);

  if (!season) {
    return false;
  }

  const isWorkspaceAllowed = await isUserAllowedToAccessWorkspace(
    businessUserId,
    season.workspaceId
  );

  return isWorkspaceAllowed;
};

export const isUserAllowedToAccessWorkspace = async (
  businessUserId: string,
  workspaceId: string
) => {
  const workspace = await getWorkspaceById(workspaceId);

  if (!workspace) {
    return false;
  }

  if (workspace.ownerId !== businessUserId) {
    return false;
  }

  return true;
};

type prepareFieldForReponseField =
  | Awaited<ReturnType<typeof getBusinessFieldsBySeasonId>>[number]
  | Awaited<ReturnType<typeof createBusinessField>>
  | Awaited<ReturnType<typeof updateBusinessField>>;

export const prepareBusinessFieldForResponse = (
  field: prepareFieldForReponseField
) => {
  const cropRotation = field.cropRotations?.[0];
  const crop = cropRotation?.crop;
  return {
    id: field.id,
    name: field.name,
    seasonId: field.seasonId,
    geometry: {
      type: field.geometryType,
      coordinates: field.geometry,
    },
    crop: crop && {
      id: crop.id,
      name: crop.name,
      color: crop.color,
      startDate: cropRotation.startDate,
      endDate: cropRotation.endDate,
    },
  };
};
