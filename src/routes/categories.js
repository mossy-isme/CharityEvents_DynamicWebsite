import { Router } from "express";
import { pool } from "../event_db.js";

const router = Router();

/**
 * GET /api/categories
 * Returns all event categories for use in the Search UI.
 */
router.get("/", async (_req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT category_id AS id, name FROM categories ORDER BY name"
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch categories" });
    }
});

export default router;
