import { Router } from "express";
import { signin, signout } from "../handlers/auth";

const router = Router();

router.post("/signin", signin);
router.post("/signout", signout);

export default router;
