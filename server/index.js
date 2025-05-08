require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/register", async (req, res) => {
  const { name, email, date } = req.body;
  await pool.query("INSERT INTO registrations (name, email, date) VALUES ($1, $2, $3)", [name, email, date]);
  res.send("Registered");
});

app.get("/admin", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM registrations ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


app.listen(5000, () => console.log("Server running on port 5000"));
