import { NextFunction } from "express";
import { ProtectedRequest } from "../middlewares/protect";
import { getCrops as getCropsDB } from "../models/crops.model";
import { GetCropsResponse } from "../types/responses";

export const getCrops = async (
  req: ProtectedRequest,
  res: GetCropsResponse,
  next: NextFunction
) => {
  try {
    const crops = await getCropsDB();
    res.status(200).json(crops);
  } catch (err) {
    next(err);
  }
};
