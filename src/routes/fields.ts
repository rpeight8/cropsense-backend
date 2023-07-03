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
} from "../handlers/fields";
import { protect } from "../middlewares/protect";

const router = Router();

router.get("/fields", protect, getFields);

router.get("/fields/:id", protect, validateGetField, getField);

router.post("/fields", protect, validateCreateField, createField);

router.put("/fields/:id", protect, validateUpdateField, updateField);

router.delete("/fields/:id", protect, validateDeleteField, deleteField);

export default router;
