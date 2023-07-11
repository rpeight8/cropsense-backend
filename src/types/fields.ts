import { TypeOf, z } from "zod";
import { ProtectedRequest } from "../middlewares/protect";
import {
  CreateFieldBodySchema,
  UpdateFieldParametersSchema,
  UpdateFieldBodySchema,
  FieldForResponseSchema,
} from "../schemas/fields";
import { FieldCoordinatesSchema, GeometryTypeEnum } from "../schemas/fields";
import { Response } from "express";
import prisma from "../modules/db";

export interface FieldForResponse
  extends TypeOf<typeof FieldForResponseSchema> {}

export type GeometryType = TypeOf<typeof GeometryTypeEnum>;

export interface FieldResponse extends Response<FieldForResponse> {}
export interface FieldsResponse extends Response<FieldForResponse[]> {}

export interface UpdateFieldRequest extends ProtectedRequest {
  body: TypeOf<typeof UpdateFieldBodySchema>;
  params: TypeOf<typeof UpdateFieldParametersSchema>;
}

export interface DeleteFieldRequest extends ProtectedRequest {
  params: TypeOf<typeof UpdateFieldParametersSchema>;
}
