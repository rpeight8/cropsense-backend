import { z } from "zod";

export const PublicUserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  businessUserId: z.string(),
});

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
