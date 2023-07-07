import e, { Response } from "express";
import { TypeOf } from "zod";
import { CreateWorkspaceSchema } from "../schemas/workspaces";
import { ProtectedRequest } from "../middlewares/protect";
import { SeasonExtendsFieldsForResponse, SeasonForResponse } from "./seasons";

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
  body: TypeOf<typeof CreateWorkspaceSchema>;
}
