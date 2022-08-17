import cors from "cors";
import dotenv from "dotenv";
import express, { Application } from "express";
import appRouter from "./routes";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import logger from "./misc/logger";

dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use(appRouter);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
