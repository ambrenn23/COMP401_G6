require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  })
);
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/register", async (req, res) => {
  const { name, email, date, time, payment, phone, parent1, parent2, godparent1, godparent2 } = req.body;
  try {
    await pool.query(
      "INSERT INTO registrations (name, email, date, time, payment, phone, parent1, parent2, godparent1, godparent2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [name, email, date, time, payment, phone, parent1, parent2, godparent1, godparent2]
    );
    res.send("Registered");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM registrations ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.delete("/register/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await pool.query("DELETE FROM registrations WHERE id = $1", [
      id,
    ]);
    if (result.rowCount > 0) {
      res.send(`Student with id ${id} deleted.`);
    } else {
      res.status(404).send("Student not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.put("/register/:id/payment", async (req, res) => {
  const id = parseInt(req.params.id);
  const { payment } = req.body;

  try {
    const result = await pool.query(
      "UPDATE registrations SET payment = $1 WHERE id = $2",
      [payment, id]
    );
    if (result.rowCount > 0) {
      res.send(`Payment status updated for id ${id}.`);
    } else {
      res.status(404).send("Student not found.");
    }
  } catch (err) {
    console.error("Error updating payment:", err);
    res.status(500).json({ error: "Database error" });
  }
});


app.put("/register/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, date, time, payment, phone, parent1, parent2, godparent1, godparent2 } = req.body;
  try {
    const result = await pool.query(
      "UPDATE registrations SET name = $1, email = $2, date = $3, time = $4, payment = $5, phone = $6, parent1 = $7, parent2 = $8, godparent1 = $9, godparent2 = $10 WHERE id = $11",
      [name, email, date, time, payment, phone, parent1, parent2, godparent1, godparent2, id]
    );
    if (result.rowCount > 0) {
      res.send(`Student with id ${id} updated.`);
    } else {
      res.status(404).send("Student not found.");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/admin", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM registrations ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/test", (req, res) => {
  res.send("Server is working");
});

app.listen(5000, "127.0.0.1", () => {
  console.log("Server running on http://127.0.0.1:5000");
});
