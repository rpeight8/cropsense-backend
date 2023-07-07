import { Response } from "express";
import { FieldForResponse } from "./field";
import { ProtectedRequest } from "../middlewares/protect";
import { TypeOf } from "zod";
import {
  CreateFieldForSeasonSchema,
  CreateSeasonSchema,
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

export interface CreateSeasonRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateSeasonSchema>;
}

export interface CreateFieldForSeasonRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateFieldForSeasonSchema>;
}
