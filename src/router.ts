import { Router } from "express";
import fields from "./routes/fields.route";
import crops from "./routes/crops.route";
import auth from "./routes/auth.route";
import ndvi from "./routes/ndvi.route";
import seasons from "./routes/seasons.route";
import workspaces from "./routes/workspaces.route";
import businessFields from "./routes/businessFields.route";

const router = Router();

// router.use("/api", fields);
router.use("/api", businessFields);
router.use("/api", crops);
// router.use("/api", ndvi);
// router.use(user);
router.use("/api", workspaces);
router.use("/api", seasons);
router.use(auth);

export default router;
