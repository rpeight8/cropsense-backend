import { Router } from "express";
import { signin, signout, signup } from "../handlers/auth";

const router = Router();

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;
