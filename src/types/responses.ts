import { Response } from "express";
import { z } from "zod";
import { PublicUserSchema } from "../schemas/utils";
import {
  BusinessFieldResponseSchema,
  BusinessFieldsResponseSchema,
  CropsResponseSchema,
  SeasonResponseSchema,
  SeasonsResponseSchema,
  WorkspaceResponseSchema,
  WorkspacesResponseSchema,
} from "../schemas/responses";
import { PublicUser } from "../types";

export interface SignInResponse
  extends Response<z.infer<typeof PublicUserSchema> | { message: string }> {}
export interface SignUpResponse extends Response<{ message: string }> {}
export interface SignOutResponse extends Response<{ message: string }> {}
export interface VerifyResponse
  extends Response<{ message: string } | PublicUser> {}

export interface GetWorkspacesResponse
  extends Response<z.infer<typeof WorkspacesResponseSchema>> {}
export interface CreateWorkspaceResponse
  extends Response<z.infer<typeof WorkspaceResponseSchema>> {}
export interface UpdateWorkspaceResponse
  extends Response<z.infer<typeof WorkspaceResponseSchema>> {}
export interface CreateWorkspaceSeasonResponse
  extends Response<z.infer<typeof SeasonResponseSchema>> {}
export interface GetWorkspaceSeasonsResponse
  extends Response<z.infer<typeof SeasonsResponseSchema>> {}

export interface UpdateSeasonResponse
  extends Response<z.infer<typeof SeasonResponseSchema>> {}
export interface GetSeasonBusinessFieldsResponse
  extends Response<z.infer<typeof BusinessFieldsResponseSchema>> {}
export interface CreateSeasonBusinessFieldResponse
  extends Response<z.infer<typeof BusinessFieldResponseSchema>> {}

export interface UpdateBusinessFieldResponse
  extends Response<z.infer<typeof BusinessFieldResponseSchema>> {}

export interface GetCropsResponse
  extends Response<z.infer<typeof CropsResponseSchema>> {}
