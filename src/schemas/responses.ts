import { z } from "zod";
import { GeometryTypeEnum } from "./utils";

export const WorkspaceResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
});
export const WorkspacesResponseSchema = z.array(WorkspaceResponseSchema);

export const SeasonResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  workspaceId: z.string(),
});
export const SeasonsResponseSchema = z.array(SeasonResponseSchema);

export const BusinessFieldResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    coordinates: z.any(),
  }),
  seasonId: z.string(),
  crop: z
    .object({
      id: z.string(),
      name: z.string(),
      color: z.string(),
      startDate: z.date(),
      endDate: z.date(),
    })
    .nullable(),
});
export const BusinessFieldsResponseSchema = z.array(
  BusinessFieldResponseSchema
);
