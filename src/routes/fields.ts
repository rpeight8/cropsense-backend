import { Router } from "express";
import { updateField } from "../controllers/fields";
import { protect } from "../middlewares/protect";
import { validateUpdateField } from "../middlewares/requestsValidators/fields";

const router = Router();

router.put("/fields/:id", protect, validateUpdateField, updateField);

export default router;
