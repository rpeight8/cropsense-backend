import { z } from "zod";

export const GeometryTypeEnum = z.enum(["Polygon", "MultyPolygon"]);

export const MIN_LATITUDE = -90;
export const MAX_LATITUDE = 90;
export const MIN_LONGITUDE = -180;
export const MAX_LONGITUDE = 180;

export const LatitudeSchema = z.number().min(MIN_LATITUDE).max(MAX_LATITUDE);
export const LongitudeSchema = z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE);

export const CoordinatesSchema = z.tuple([LatitudeSchema, LongitudeSchema]);

export const FieldHoleSchema = z.array(CoordinatesSchema);
export const FieldPolygonSchema = z.array(CoordinatesSchema);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);

export const CreateFieldSchema = z.object({
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    coordinates: FieldCoordinatesSchema,
  }),
  crop: z
    .object({
      id: z.string(),
    })
    .nullable(),
});
export const CreateFieldsSchema = z.array(CreateFieldSchema);
