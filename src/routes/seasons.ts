import { Router } from "express";
import {
  validateCreateFieldForSeason,
  validateCreateSeason,
} from "../middlewares/requestsValidators/seasons";
import { createFieldForSeason, createSeason } from "../controllers/seasons";
import { protect } from "../middlewares/protect";

const router = Router();

router.post("/seasons", protect, validateCreateSeason, createSeason);
router.post(
  "/seasons/:id/fields",
  protect,
  validateCreateFieldForSeason,
  createFieldForSeason
);

export default router;
