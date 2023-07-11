import { z } from "zod";
import { CropForResponseSchema } from "./crops";

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

export const FieldForResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    // TODO: FIX TYPE
    coordinates: z.any(),
  }),
  seasonId: z.string(),
  crop: CropForResponseSchema.nullable(),
});

export const CreateFieldBodySchema = z.object({
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

export const UpdateFieldParametersSchema = z.object({
  id: z.string(),
});
export const UpdateFieldBodySchema = CreateFieldBodySchema;

export const CreateFieldsBodySchema = z.array(CreateFieldBodySchema);
export const UpdateFieldsBodySchema = z.array(UpdateFieldBodySchema);

export const DeleteFieldParametersSchema = z.object({
  id: z.string(),
});
