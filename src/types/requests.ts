import { z } from "zod";
import {
  CreateSeasonBusinessFieldRequestBodySchema,
  CreateSeasonBusinessFieldRequestParamsSchema,
  CreateWorkspaceRequestBodySchema,
  CreateWorkspaceRequestSchema,
  CreateWorkspaceSeasonRequestBodySchema,
  CreateWorkspaceSeasonRequestParamsSchema,
  DeleteBusinessFieldRequestParamsSchema,
  DeleteSeasonRequestParamsSchema,
  DeleteWorkspaceRequestParamsSchema,
  GetSeasonBusinessFieldsRequestParamsSchema,
  GetWorkspaceSeasonRequestParamsSchema,
  SignUpRequestBodySchema,
  UpdateBusinessFieldRequestBodySchema,
  UpdateBusinessFieldRequestParamsSchema,
  UpdateSeasonRequestBodySchema,
  UpdateSeasonRequestParamsSchema,
  UpdateWorkspaceRequestBodySchema,
  UpdateWorkspaceRequestParamsSchema,
} from "../schemas/requests";
import { ProtectedRequest } from "../middlewares/protect";
import { Request } from "express";

export interface SignUpRequest extends Request {
  body: z.infer<typeof SignUpRequestBodySchema>;
}
export interface SignInRequest extends Request {
  body: z.infer<typeof SignUpRequestBodySchema>;
}

export interface CreateWorkspaceRequest extends ProtectedRequest {
  body: z.infer<typeof CreateWorkspaceRequestBodySchema>;
}
export interface UpdateWorkspaceRequest extends ProtectedRequest {
  body: z.infer<typeof UpdateWorkspaceRequestBodySchema>;
  params: z.infer<typeof UpdateWorkspaceRequestParamsSchema>;
}
export interface DeleteWorkspaceRequest extends ProtectedRequest {
  params: z.infer<typeof DeleteWorkspaceRequestParamsSchema>;
}
export interface CreateWorkspaceSeasonRequest extends ProtectedRequest {
  body: z.infer<typeof CreateWorkspaceSeasonRequestBodySchema>;
  params: z.infer<typeof CreateWorkspaceSeasonRequestParamsSchema>;
}
export interface GetWorkspaceSeasonsRequest extends ProtectedRequest {
  params: z.infer<typeof GetWorkspaceSeasonRequestParamsSchema>;
}

export interface UpdateSeasonRequest extends ProtectedRequest {
  body: z.infer<typeof UpdateSeasonRequestBodySchema>;
  params: z.infer<typeof UpdateSeasonRequestParamsSchema>;
}
export interface DeleteSeasonRequest extends ProtectedRequest {
  params: z.infer<typeof DeleteSeasonRequestParamsSchema>;
}

export interface CreateSeasonBusinessFieldRequest extends ProtectedRequest {
  body: z.infer<typeof CreateSeasonBusinessFieldRequestBodySchema>;
  params: z.infer<typeof CreateSeasonBusinessFieldRequestParamsSchema>;
}
export interface GetSeasonBusinessFieldsRequest extends ProtectedRequest {
  params: z.infer<typeof GetSeasonBusinessFieldsRequestParamsSchema>;
}

export interface UpdateBusinessFieldRequest extends ProtectedRequest {
  body: z.infer<typeof UpdateBusinessFieldRequestBodySchema>;
  params: z.infer<typeof UpdateBusinessFieldRequestParamsSchema>;
}
export interface DeleteBusinessFieldRequest extends ProtectedRequest {
  params: z.infer<typeof DeleteBusinessFieldRequestParamsSchema>;
}
