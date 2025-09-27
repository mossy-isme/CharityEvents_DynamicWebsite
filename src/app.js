// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Resolve __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from src/public
app.use(express.static(path.join(__dirname, "public")));

// Mount API routes under /api/*
app.use("/api/events", eventsRouter);
app.use("/api/categories", categoriesRouter);

// Health check
app.get("/api/health", (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
