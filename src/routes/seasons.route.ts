import { Router } from "express";
import { validateCreateFieldForSeason } from "../middlewares/requestsValidators/seasons";
import { createFieldForSeason } from "../controllers/seasons.controller";
import { protect } from "../middlewares/protect";

const router = Router();

router.post(
  "/seasons/:id/fields",
  protect,
  validateCreateFieldForSeason,
  createFieldForSeason
);

export default router;
