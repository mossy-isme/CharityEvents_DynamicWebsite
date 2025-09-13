import { Router } from "express";
import { pool } from "../event_db.js";
const router = Router();

/**
 * Utility SQL fragments that match the brief:
 * - "current/upcoming" excludes past and suspended on the home page.
 * - You can show only events with event_date >= CURDATE() and status != 'suspended'.
 */
const BASE_SELECT = `
  SELECT
    e.event_id       AS id,
    e.name,
    e.description,
    e.event_date     AS date,
    e.start_time,
    e.end_time,
    e.location,
    e.status,
    c.name           AS category,
    o.name           AS organisation
  FROM events e
  JOIN categories c    ON e.category_id = c.category_id
  JOIN organisations o ON e.organisation_id = o.organisation_id
`;

/**
 * GET /api/events
 * Query params:
 *   - status: 'current' (default), 'upcoming', or 'all'
 *   - limit, offset: optional pagination
 *
 * "current" and "upcoming" both exclude suspended and past events (homepage use).
 */
router.get("/", async (req, res) => {
    try {
        const { status = "current", limit = 50, offset = 0 } = req.query;

        let where;
        const params = [];

        if (status === "all") {
            // No filter besides not suspended? You can decide. We'll include everything but suspended.
            where = `WHERE e.status != 'suspended'`;
        } else {
            // current/upcoming: event_date today or later, and not suspended
            where = `WHERE e.status != 'suspended' AND e.event_date >= CURDATE()`;
        }

        const sql = `${BASE_SELECT} ${where} ORDER BY e.event_date ASC LIMIT ? OFFSET ?`;
        params.push(Number(limit), Number(offset));

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

/**
 * GET /api/events/search
 * Filters: date (YYYY-MM-DD), location (substring), categoryId (number).
 * All filters are optional and combined with AND.
 */
router.get("/search", async (req, res) => {
    try {
        const { date, location, categoryId, limit = 50, offset = 0 } = req.query;

        const clauses = [];
        const params = [];

        // Only show active events for search by default (exclude suspended)
        clauses.push(`e.status != 'suspended'`);

        if (date) {
            clauses.push(`e.event_date = ?`);
            params.push(date);
        }
        if (location) {
            clauses.push(`e.location LIKE ?`);
            params.push(`%${location}%`);
        }
        if (categoryId) {
            clauses.push(`e.category_id = ?`);
            params.push(Number(categoryId));
        }

        const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
        const sql = `${BASE_SELECT} ${where} ORDER BY e.event_date ASC LIMIT ? OFFSET ?`;

        params.push(Number(limit), Number(offset));

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
});

/**
 * GET /api/events/:id
 * Event detail page requirement.
 */
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const sql = `${BASE_SELECT} WHERE e.event_id = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [id]);

        if (!rows.length) return res.status(404).json({ error: "Event not found" });
        res.json(rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch event" });
    }
});

export default router;
