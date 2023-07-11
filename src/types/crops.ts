import { TypeOf } from "zod";
import {
  CropForResponseSchema,
  CropsForResponseSchema,
} from "../schemas/crops";
import { Response } from "express";

export interface CropForResponse extends TypeOf<typeof CropForResponseSchema> {}
export interface CropsForResponse
  extends TypeOf<typeof CropsForResponseSchema> {}

export interface CropsResponse extends Response<CropsForResponse> {}
