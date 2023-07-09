import { Response } from "express";
import { FieldForResponse, FieldResponse, FieldsResponse } from "./field";
import { ProtectedRequest } from "../middlewares/protect";
import { TypeOf } from "zod";
import {
  CreateFieldForSeasonSchema,
  CreateSeasonSchema,
  GetSeasonFieldsParametersSchema,
} from "../schemas/seasons";

export interface SeasonForResponse {
  id: string;
  name: string;
  endDate: Date;
  startDate: Date;
}

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
  body: TypeOf<typeof CreateFieldForSeasonSchema>;
}
export interface CreateFieldForSeasonResponse extends FieldResponse {}

export interface GetSeasonFieldsRequest extends ProtectedRequest {
  params: TypeOf<typeof GetSeasonFieldsParametersSchema>;
}
export interface GetSeasonFieldsResponse extends FieldsResponse {}
