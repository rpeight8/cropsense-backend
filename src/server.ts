import express from "express";
import router from "./router";
import cors from "cors";
import logger from "./middlewares/logger";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler";

const environment = process.env.NODE_ENV || "development";

console.log(process.env.NODE_ENV);

const app = express();

if (environment === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
}

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);
app.use(errorHandler);

export default app;
