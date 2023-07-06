import { Router } from "express";
import {
  validateCreateField,
  validateDeleteField,
  validateGetField,
  validateUpdateField,
} from "../middlewares/validators/fields";
import {
  createField,
  deleteField,
  getField,
  getFields,
  updateField,
} from "../controllers/fields";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/fields/:seasonId", protect, getFields);

router.get("/fields/:seasonId", protect, getField);

router.get("/fields/:seasonId/:fieldId", protect, validateGetField, getField);

router.post("/fields/:seasonId/", protect, validateCreateField, createField);

router.put(
  "/fields/:seasonId/:fieldId",
  protect,
  validateUpdateField,
  updateField
);

router.delete(
  "/fields/:seasonId/:fieldId",
  protect,
  validateDeleteField,
  deleteField
);

export default router;
