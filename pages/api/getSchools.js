import pool from "../../lib/db";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query("SELECT id, name, address, city, image FROM schools");
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
