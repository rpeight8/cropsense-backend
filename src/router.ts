import { Router } from "express";
import fields from "./routes/fields";
import crops from "./routes/crops";
import auth from "./routes/auth";
import user from "./routes/user";

import { protect } from "./modules/auth";

const router = Router();

router.use("/api", protect, fields);
router.use("/api", protect, crops);
router.use(user);
router.use(auth);

export default router;
