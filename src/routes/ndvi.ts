import { Router } from "express";
import { validateGetNDVI } from "../middlewares/validators/ndvi";
import { getNDVI } from "../controllers/ndvi";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/ndvi/:fieldId/:date?", protect, validateGetNDVI, getNDVI);

export default router;
