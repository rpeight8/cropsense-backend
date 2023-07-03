import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const GeometryTypeEnum = z.enum(["POLYGON", "MULTIPOLYGON"]);

const MIN_LATITUDE = -90;
const MAX_LATITUDE = 90;
const MIN_LONGITUDE = -180;
const MAX_LONGITUDE = 180;

export const LatitudeSchema = z.number().min(MIN_LATITUDE).max(MAX_LATITUDE);
export const LongitudeSchema = z.number().min(MIN_LONGITUDE).max(MAX_LONGITUDE);

export const CoordinatesSchema = z.tuple([LatitudeSchema, LongitudeSchema]);

const FieldHoleSchema = z.array(CoordinatesSchema);
const FieldPolygonSchema = z.array(CoordinatesSchema);

export const FieldCoordinatesSchema = z.tuple([
  FieldPolygonSchema,
  FieldHoleSchema,
]);

export const CreateFieldSchema = z.object({
  name: z.string(),
  geometry: z.object({
    type: GeometryTypeEnum,
    coordinates: FieldCoordinatesSchema,
  }),
  cropId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export const CreateFieldsSchema = z.array(CreateFieldSchema);
export const UpdateFieldSchema = CreateFieldSchema;

export const WithIdSchema = z.object({
  id: z.string(),
});

export const UpdateFieldParametersSchema = WithIdSchema;
export const GetFieldParametersSchema = WithIdSchema;
export const DeleteFieldParametersSchema = WithIdSchema;

export const validateCreateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CreateFieldSchema.parseAsync(req.body);
    next();
    console.log("validateCreateField: success");
  } catch (error) {
    res.status(400);
    next(error);
    console.log("validateCreateField: error");
  }
};

export const validateGetField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await GetFieldParametersSchema.parseAsync(req.params);
    next();
    console.log("validateGetField: success");
  } catch (err) {
    res.status(400);
    next(err);
    console.log("validateGetField: error");
  }
};

export const validateUpdateField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await UpdateFieldSchema.parseAsync(req.body);
    await UpdateFieldParametersSchema.parseAsync(req.params);
    next();
    console.log("validateUpdateField: success");
  } catch (err) {
    res.status(400);
    next(err);
    console.log("validateUpdateField: error");
  }
};

export const validateDeleteField = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await DeleteFieldParametersSchema.parseAsync(req.params);
    next();
    console.log("validateDeleteField: success");
  } catch (err) {
    res.status(400);
    next(err);
    console.log("validateDeleteField: error");
  }
};
