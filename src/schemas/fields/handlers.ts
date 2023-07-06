import { TypeOf } from "zod";
import { ProtectedRequest } from "../../middlewares/protect";

import { Response } from "express";
import {
  CreateFieldSchema,
  GetFieldParametersSchema,
  GetFieldsParametersSchema,
  UpdateFieldParametersSchema,
  UpdateFieldSchema,
  deleteFieldParametersSchema,
} from "./validators";



