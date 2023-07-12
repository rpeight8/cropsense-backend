import { z } from "zod";
import { isValidUTCDateString } from "../utils";

export const GeometryTypeEnum = z.enum(["Polygon", "MultyPolygon"]);

export const MIN_LATITUDE = -90;
export const MAX_LATITUDE = 90;
export const MIN_LONGITUDE = -180;
export const MAX_LONGITUDE = 180;

export const LatitudeSchema = z.number().min(MIN_LATITUDE).max(MAX_LATITUDE);
export const LongitudeSchema = z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE);

export const CoordinatesSchema = z.tuple([LatitudeSchema, LongitudeSchema]);

export const RequestParametersWithIdSchema = z.object({
  id: z.string(),
});

export const RequestBodyWithNameSchema = z.object({
  name: z.string(),
});

export const SeasonStartDateSchema = z.string().refine(isValidUTCDateString, {
  message: "Invalid startDate format. Expected a valid UTC date string.",
  path: ["startDate"],
});

export const SeasonEndDateSchema = z.string().refine(isValidUTCDateString, {
  message: "Invalid endDate format. Expected a valid UTC date string.",
  path: ["endDate"],
});

export const BusinessFieldPolygonSchema = z.array(CoordinatesSchema);
export const BusinessFieldHoleSchema = z.array(CoordinatesSchema);

export const BusinessFieldCoordinatesSchema = z.tuple([
  BusinessFieldPolygonSchema,
  BusinessFieldHoleSchema,
]);

export const PublicUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  businessUserId: z.string(),
});
