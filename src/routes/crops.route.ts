import { Router } from "express";
import { protect } from "../middlewares/protect";
import { getCrops } from "../controllers/crops.controller";

const router = Router();

router.get("/crops", protect, getCrops);

export default router;
