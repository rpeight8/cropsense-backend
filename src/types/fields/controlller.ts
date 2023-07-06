import { TypeOf } from "zod";
import { ProtectedRequest } from "../../middlewares/protect";
import {
  CreateFieldSchema,
  GetFieldParametersSchema,
  GetFieldsParametersSchema,
  UpdateFieldParametersSchema,
  UpdateFieldSchema,
  deleteFieldParametersSchema,
} from "../../schemas/fields/validators";
import { FieldCoordinatesSchema, GeometryTypeEnum } from "../../schemas/fields";
import { Response } from "express";

export interface ResponseField {
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
  };
}

export interface CreateFieldRequest extends ProtectedRequest {
  body: TypeOf<typeof CreateFieldSchema>;
}
export interface GetFieldsRequest extends ProtectedRequest {
  params: TypeOf<typeof GetFieldsParametersSchema>;
}

export interface GetFieldRequest extends ProtectedRequest {
  params: TypeOf<typeof GetFieldParametersSchema>;
}
export interface UpdateFieldRequest extends ProtectedRequest {
  params: TypeOf<typeof UpdateFieldParametersSchema>;
  body: TypeOf<typeof UpdateFieldSchema>;
}
export interface DeleteFieldRequest extends ProtectedRequest {
  params: TypeOf<typeof deleteFieldParametersSchema>;
}

export interface GetFieldsResponse
  extends Response<ResponseField[] | { message: string }> {}

export interface GetFieldResponse
  extends Response<ResponseField | { message: string }> {}
