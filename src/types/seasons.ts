import { Response } from "express";
import { FieldForResponse, FieldResponse, FieldsResponse } from "./field";
import { ProtectedRequest } from "../middlewares/protect";
import { TypeOf, z } from "zod";
import {
  CreateFieldForSeasonBodySchema,
  CreateFieldForSeasonParametersSchema,
  CreateSeasonBodySchema,
  GetSeasonFieldsParametersSchema,
  SeasonForResponseSchema,
  UpdateSeasonBodySchema,
  UpdateSeasonParametersSchema,
} from "../schemas/seasons";

export interface SeasonForResponse
  extends z.TypeOf<typeof SeasonForResponseSchema> {}

export interface SeasonExtendsFieldsForResponse extends SeasonForResponse {
  fields: FieldForResponse[];
}

export interface SeasonResponse extends Response<SeasonForResponse> {}
export interface SeasonsResponse extends Response<SeasonForResponse[]> {}

export interface SeasonExtendsFieldsResponse
  extends Response<SeasonExtendsFieldsForResponse> {}
export interface SeasonsExtendFieldsResponse
  extends Response<SeasonExtendsFieldsForResponse[]> {}

export interface CreateFieldForSeasonRequest extends ProtectedRequest {
  params: TypeOf<typeof CreateFieldForSeasonParametersSchema>;
  body: TypeOf<typeof CreateFieldForSeasonBodySchema>;
}
export interface CreateFieldForSeasonResponse extends FieldResponse {}

export interface GetSeasonFieldsRequest extends ProtectedRequest {
  params: TypeOf<typeof GetSeasonFieldsParametersSchema>;
}
export interface GetSeasonFieldsResponse extends FieldsResponse {}

export interface UpdateSeasonRequest extends ProtectedRequest {
  body: TypeOf<typeof UpdateSeasonBodySchema>;
  params: TypeOf<typeof UpdateSeasonParametersSchema>;
}
export interface UpdateSeasonResponse extends SeasonResponse {}

export interface DeleteSeasonRequest extends ProtectedRequest {
  params: TypeOf<typeof UpdateSeasonParametersSchema>;
}
