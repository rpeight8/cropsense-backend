import { z } from "zod";

export const CropForResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
});

export const CropsForResponseSchema = z.array(CropForResponseSchema);
