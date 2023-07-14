import { Router } from "express";
import { protect } from "../middlewares/protect.middleware";
import {
  validateDeleteBusinessField,
  validateUpdateBusinessField,
} from "../middlewares/requestsValidators/businessFields";
import {
  deleteBusinessField,
  updateBusinessField,
} from "../controllers/businessFields.controller";

import { validateBusinessFieldAccess } from "../middlewares/entityAccess.middleware";

const router = Router();

router.put(
  "/fields/:id",
  protect,
  validateUpdateBusinessField,
  validateBusinessFieldAccess,
  updateBusinessField
);
router.delete(
  "/fields/:id",
  protect,
  validateDeleteBusinessField,
  validateBusinessFieldAccess,
  deleteBusinessField
);

export default router;
