// src/event_db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Optional: default export if you ever want `import db from ...`
export default pool;