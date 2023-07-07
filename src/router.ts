import { Router } from "express";
import fields from "./routes/fields";
import crops from "./routes/crops";
import auth from "./routes/auth";
import ndvi from "./routes/ndvi";
import seasons from "./routes/seasons";
import workspaces from "./routes/workspaces";

const router = Router();

// router.use("/api", fields);
// router.use("/api", crops);
// router.use("/api", ndvi);
// router.use(user);
router.use("/api", workspaces);
router.use("/api", seasons);
router.use(auth);

export default router;
