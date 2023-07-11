import { Router } from "express";
import { deleteField, updateField } from "../controllers/fields.controller";
import { protect } from "../middlewares/protect";
import {
  validateDeleteField,
  validateUpdateField,
} from "../middlewares/requestsValidators/fields";

const router = Router();

router.put("/fields/:id", protect, validateUpdateField, updateField);
router.delete("/fields/:id", protect, validateDeleteField, deleteField);

export default router;
