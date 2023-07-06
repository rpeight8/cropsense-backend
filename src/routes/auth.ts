import { Router } from "express";
import { signin, signout, signup, verify } from "../controllers/auth";

const router = Router();
router.post("/verify", verify);
router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signout", signout);

export default router;
