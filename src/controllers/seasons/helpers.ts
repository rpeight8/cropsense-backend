import { getSeasonById } from "../../models/season";

export const validateSeasonBelongsToUser = async (
  seasonId: string,
  userId: string
) => {
  const season = await getSeasonById(seasonId);

  if (!season) {
    return false;
  }

  if (season.createdById !== userId) {
    return false;
  }

  return true;
};
