import express from "express";
import router from "./router";
import cors from "cors";
import logger from "./middlewares/logger";

const environment = process.env.NODE_ENV || "development";

const app = express();

if (environment === "development") {
  app.use(cors());
}

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use(router);

export default app;
