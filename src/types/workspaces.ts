import e, { Response } from "express";
import { TypeOf } from "zod";
import {
  CreateWorkspaceBodySchema,
  GetWorkspacesSeasonsParametersSchema,
  UpdateWorkspaceBodySchema,
  UpdateWorkspaceParametersSchema,
} from "../schemas/workspaces";
import { ProtectedRequest } from "../middlewares/protect";
import { SeasonExtendsFieldsForResponse, SeasonForResponse } from "./seasons";
import { CreateSeasonBodySchema } from "../schemas/seasons";

export interface WorkspaceForResponse {
  id: string;
  name: string;
}
export interface WorkspaceExtendsSeasonsForResponse
  extends WorkspaceForResponse {
  seasons: SeasonForResponse[];
}
export interface WorkspaceExtendsSeasonsFieldsForResponse
  extends WorkspaceForResponse {
  seasons: SeasonExtendsFieldsForResponse[];
}

export interface WorkspaceResponse extends Response<WorkspaceForResponse> {}
export interface WorkspacesResponse extends Response<WorkspaceForResponse[]> {}

export interface WorkspacesExtendSeasonsResponse
  extends Response<WorkspaceExtendsSeasonsForResponse[]> {}

export interface WorkspacesExtendSeasonsFieldsResponse
  extends Response<WorkspaceExtendsSeasonsFieldsForResponse[]> {}

export interface CreateWorkspaceRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateWorkspaceBodySchema>;
}
export interface CreateWorkspaceResponse extends WorkspaceResponse {}

export interface UpdateWorkspaceRequest extends ProtectedRequest {
  body: TypeOf<typeof UpdateWorkspaceBodySchema>;
  params: TypeOf<typeof UpdateWorkspaceParametersSchema>;
}
export interface UpdateWorkspaceResponse extends WorkspaceResponse {}

export interface DeleteWorkspaceRequest extends ProtectedRequest {
  params: TypeOf<typeof UpdateWorkspaceParametersSchema>;
}

export interface CreateSeasonForWorkspaceRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateSeasonBodySchema>;
}

export interface GetWorkspacesSeasonsRequest extends ProtectedRequest {
  params: TypeOf<typeof GetWorkspacesSeasonsParametersSchema>;
}
