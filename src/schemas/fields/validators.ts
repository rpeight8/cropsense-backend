import { z } from "zod";
import { FieldCoordinatesSchema, GeometryTypeEnum } from "./";

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
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const CreateFieldsSchema = z.array(CreateFieldSchema);
export const UpdateFieldSchema = CreateFieldSchema;

export const WithFieldIdSchema = z.object({
  fieldId: z.string(),
});

export const WithSeasonIdSchema = z.object({
  seasonId: z.string(),
});

export const WithFieldIdAndSeasonIdSchema = z.intersection(
  WithFieldIdSchema,
  WithSeasonIdSchema
);

export const UpdateFieldParametersSchema = WithFieldIdAndSeasonIdSchema;

export const GetFieldParametersSchema = WithFieldIdAndSeasonIdSchema;
export const GetFieldsParametersSchema = WithSeasonIdSchema;
export const deleteFieldParametersSchema = WithFieldIdAndSeasonIdSchema;
