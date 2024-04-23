import { z } from "zod";
import { PublicUserSchema } from "../schemas/utils";
import { BusinessField, Crop, CropRotation, Prisma } from "@prisma/client";

export type PublicUser = z.infer<typeof PublicUserSchema>;

export type AuditFields =
  | "createdById"
  | "createdAt"
  | "updatedAt"
  | "updatedById";

export type RemoveAuditFields<T> = Omit<T, AuditFields>;

