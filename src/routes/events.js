import { Router } from "express";
import { pool } from "../event_db.js";
const router = Router();

const BASE_SELECT = `
    SELECT
        e.event_id AS id,
        e.name,
        e.description,
        e.ticket_price,
        e.event_date AS date,
        e.start_time,
        e.end_time,
        e.location,
        e.status,
        c.name AS category,
        o.name AS organisation
    FROM events e
             JOIN categories c    ON e.category_id = c.category_id
             JOIN organisations o ON e.organisation_id = o.organisation_id
`;

// GET /api/events?status=current|upcoming|past|all&limit=50&offset=0
router.get("/", async (req, res) => {
    try {
        const { status = "current", limit = 50, offset = 0 } = req.query;
        const limitNum  = Math.min(Math.max(parseInt(limit, 10)  || 50, 1), 100);
        const offsetNum = Math.max(parseInt(offset, 10) || 0, 0);

        let where = "";
        switch (status) {
            case "all":
                where = `WHERE e.status != 'suspended'`;
                break;
            case "past":
                where = `WHERE e.status != 'suspended' AND e.event_date < CURDATE()`;
                break;
            case "current":
            case "upcoming":
            default:
                where = `WHERE e.status != 'suspended' AND e.event_date >= CURDATE()`;
                break;
        }

        const sql = `${BASE_SELECT} ${where} ORDER BY e.event_date ASC LIMIT ? OFFSET ?`;
        const [rows] = await pool.query(sql, [limitNum, offsetNum]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// GET /api/events/search?date=YYYY-MM-DD&dateFrom=YYYY-MM-DD&dateTo=YYYY-MM-DD&location=...&categoryId=...&ticketPriceMin=...&ticketPriceMax=...&limit=50&offset=0
router.get("/search", async (req, res) => {
    try {
        console.log("Search query:", req.query);
        const { date, dateFrom, dateTo, location = "", categoryId, ticketPriceMin, ticketPriceMax, limit = 50, offset = 0 } = req.query;

        const limitNum  = Math.min(Math.max(parseInt(limit, 10)  || 50, 1), 100);
        const offsetNum = Math.max(parseInt(offset, 10) || 0, 0);

        const clauses = [`e.status != 'suspended'`];
        const params = [];

        if (date) {
            clauses.push(`e.event_date = ?`);
            params.push(date);
        } else {
            if (dateFrom) { clauses.push(`e.event_date >= ?`); params.push(dateFrom); }
            if (dateTo)   { clauses.push(`e.event_date <= ?`); params.push(dateTo); }
        }

        const loc = location.trim();
        if (loc) {
            clauses.push(`e.location LIKE ?`);
            params.push(`%${loc}%`);
        }

        if (categoryId && !Number.isNaN(Number(categoryId))) {
            clauses.push(`e.category_id = ?`);
            params.push(Number(categoryId));
        }
        if (ticketPriceMin && !Number.isNaN(Number(ticketPriceMin))) {
            clauses.push(`e.ticket_price >= ?`);
            params.push(Number(ticketPriceMin));
        }

        if (ticketPriceMax && !Number.isNaN(Number(ticketPriceMax))) {
            clauses.push(`e.ticket_price <= ?`);
            params.push(Number(ticketPriceMax));
        }

        const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
        const sql = `${BASE_SELECT} ${where} ORDER BY e.event_date ASC LIMIT ? OFFSET ?`;
        params.push(limitNum, offsetNum);

        const [rows] = await pool.query(sql, params);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
});

// GET /api/events/:id
router.get("/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) return res.status(400).json({ error: "Invalid id" });

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
