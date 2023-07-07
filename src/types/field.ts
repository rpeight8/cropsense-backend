import { TypeOf } from "zod";
import { ProtectedRequest } from "../middlewares/protect";
import {
  CreateFieldSchema,
  UpdateFieldParametersSchema,
  UpdateFieldSchema,
} from "../schemas/fields";
import { FieldCoordinatesSchema, GeometryTypeEnum } from "../schemas/fields";
import { Response } from "express";
import prisma from "../modules/db";

export interface FieldForResponse {
  id: string;
  name: string;
  geometry: {
    type: TypeOf<typeof GeometryTypeEnum>;
    coordinates: any;
  };
  crop: {
    id: string;
    name: string;
    color: string;
  } | null;
}

export type GeometryType = TypeOf<typeof GeometryTypeEnum>;

export interface FieldResponse extends Response<FieldForResponse> {}

export interface UpdateFieldRequest extends ProtectedRequest {
  body: TypeOf<typeof UpdateFieldSchema>;
  params: TypeOf<typeof UpdateFieldParametersSchema>;
}
