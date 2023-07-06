import { z } from "zod";

export const GeometryTypeEnum = z.enum(["Polygon", "MultyPolygon"]);

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

export const LatitudeSchema = z.number().min(MIN_LATITUDE).max(MAX_LATITUDE);
export const LongitudeSchema = z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE);

export const CoordinatesSchema = z.tuple([LatitudeSchema, LongitudeSchema]);

const FieldHoleSchema = z.array(CoordinatesSchema);
const FieldPolygonSchema = z.array(CoordinatesSchema);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);
