import { Router } from "express";
import { validateGetNDVI } from "../middlewares/requestsValidators/ndvi";
import { getNDVI } from "../controllers/ndvi.controller";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/ndvi/:fieldId/:date?", protect, validateGetNDVI, getNDVI);

export default router;
