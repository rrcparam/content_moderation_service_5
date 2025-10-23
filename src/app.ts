import dotenv from "dotenv";
dotenv.config();

import express, { Express, Request, Response } from "express";
import moderationRoutes from "./api/v1/routes/moderationRoutes";
import morgan from "morgan";
const app: Express = express();
const LOG_LEVEL = process.env.LOG_LEVEL || "dev";
const NODE_ENV = process.env.NODE_ENV || "development";

app.use(express.json());
app.use(express.json());
app.use(morgan(NODE_ENV === "production" ? "combined" : LOG_LEVEL));
/**
 * Mount moderation routes on /api/v1/moderation
 */
app.use("/api/v1/moderation", moderationRoutes);

/**
 * Default error handler for unmatched routes
 */
app.use((req: Request, res: Response): void => {
    res.status(404).json({ message: "Endpoint not found" });
});

export default app;
