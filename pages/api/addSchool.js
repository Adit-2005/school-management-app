import pool from "../../lib/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, address, city, state, contact, image, email_id } = req.body;

    try {
      const [result] = await pool.query(
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [name, address, city, state, contact, image, email_id]
      );

      res.status(200).json({ message: "School added", id: result.insertId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
