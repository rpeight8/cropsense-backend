import {
  getFieldByIdAndSeasonId,
  getFieldsBySeasonId,
} from "../../models/fields";

export const prepareFieldBySeasonId = (
  fieldBySeason: NonNullable<
    Awaited<ReturnType<typeof getFieldByIdAndSeasonId>>
  >
) => {
  return {
    id: fieldBySeason.field.id,
    name: fieldBySeason.field.name,
    geometry: {
      type: fieldBySeason.field.geometryType,
      coordinates: fieldBySeason.field.coordinates,
    },
    crop: {
      id: fieldBySeason.crop.id,
      name: fieldBySeason.crop.name,
      color: fieldBySeason.crop.color,
    },
  };
};

export const prepapareFieldsBySeasonId = (
  fieldsBySeason: Awaited<ReturnType<typeof getFieldsBySeasonId>>
) => {
  return fieldsBySeason.map(prepareFieldBySeasonId);
};
