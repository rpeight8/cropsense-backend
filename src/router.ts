import { Router } from "express";
import fields from "./routes/fields";
import crops from "./routes/crops";
import auth from "./routes/auth";
import user from "./routes/user";

const router = Router();

router.use("/api", fields);
router.use("/api", crops);
router.use(user);
router.use(auth);

export default router;
