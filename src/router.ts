import { Router } from "express";
import fields from "./routes/fields";
import crops from "./routes/crops";

const router = Router();

router.use(fields);
router.use(crops);

export default router;
