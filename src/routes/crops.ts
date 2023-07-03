import { Router } from "express";
import { protect } from "../middlewares/protect";
import {
  createCrop,
  deleteCrop,
  getCrop,
  getCrops,
  updateCrop,
} from "../handlers/crops";

const router = Router();

router.get("/crops", protect, getCrops);

router.get("/crops/:id", protect, getCrop);

router.post("/crops", protect, createCrop);

router.put("/crops/:id", protect, updateCrop);

router.delete("/crops/:id", protect, deleteCrop);

export default router;
