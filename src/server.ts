import express from "express";
import router from "./router";
import cors from "cors";
import logger from "./middlewares/logger";
import { protect } from "./modules/auth";
import { createUser, signin, signout } from "./handlers/user";
import cookieParser from "cookie-parser";

const environment = process.env.NODE_ENV || "development";

console.log(process.env.NODE_ENV);

const app = express();

if (environment === "development") {
  app.use(cors());
}

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", protect, router);
app.post("/user", createUser);
app.post("/signin", signin);
app.post("/signout", signout);

app.use(router);

export default app;
