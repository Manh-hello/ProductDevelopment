import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import routes from "./routes";

export function createApp(): Express {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", routes);

  // Thứ tự bắt buộc: notFound trước, errorHandler LUÔN LUÔN cuối cùng.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
