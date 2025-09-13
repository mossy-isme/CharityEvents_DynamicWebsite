import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Mount REST resources (read-only for A2)
app.use("/api/events", eventsRouter);
app.use("/api/categories", categoriesRouter);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API listening on http://localhost:${port}`));
