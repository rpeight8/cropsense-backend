import { z } from "zod";

export const CropAPIResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});
export const CropsAPIResponseSchema = z.array(CropAPIResponseSchema);
