import { Router } from "express";

const router = Router();

router.get("/fields", (req, res) => {
  res.json({ message: "Hello, world!" });
  res.end();
});

router.get("/fields/:id", (req, res) => {});

router.post("/fields", (req, res) => {});

router.put("/fields/:id", (req, res) => {});

router.delete("/fields/:id", (req, res) => {});

export default router;
