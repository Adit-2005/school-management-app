import mysql from "mysql2/promise";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
  try {
    const { name, address, city, state, contact, email_id, image } = req.body || {};

    // Basic server-side validation (mirrors client-side)
    if (!name || !address || !city || !state || !contact || !email_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });

    await connection.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, image || "", email_id]
    );
    await connection.end();

    return res.status(200).json({ message: "School added successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
