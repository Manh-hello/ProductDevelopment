import cors from "cors";
import express, { Express } from "express";
import { errorHandler } from "./middlewares/errorHandler";
import { notFound } from "./middlewares/notFound";
import routes from "./routes";
import { env } from "./config/env";

export function createApp(): Express {
  const app = express();

  const origins = env.CORS_ORIGIN?.split(",").map((o) => o.trim()).filter(Boolean);
  app.use(cors(origins && origins.length > 0 ? { origin: origins } : undefined));
  app.use(express.json());

  app.use("/api", routes);

  // Thứ tự bắt buộc: notFound trước, errorHandler LUÔN LUÔN cuối cùng.
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
