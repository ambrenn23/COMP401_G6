require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

let students = [
  {
    id: 1,
    name: "Ashley",
    email: "ashley@gmail.com",
    date: "2025-05-12",
    time: "10:00",
    donation: "20",
  },
  {
    id: 2,
    name: "Stacy",
    email: "stacy@gmail.com",
    date: "2025-05-14",
    time: "11:00",
    donation: "0",
  },
];

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
  const { name, email, date, time, donation } = req.body;
  await pool.query(
    "INSERT INTO registrations (name, email, date, time, donation) VALUES ($1, $2, $3, $4, $5)",
    [name, email, date, time, donation]
  );
  res.send("Registered");
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

app.listen(5000, "127.0.0.1", () =>
  console.log("Server running on http://127.0.0.1:5000")
);

app.delete("/register/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = students.findIndex((student) => student.id === id);
  if (index !== -1) {
    students.splice(index, 1);
    res.send(`Student with id ${id} deleted.`);
  } else {
    res.status(404).send("Student not found.");
  }
});

app.put("/register/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, date, time, donation } = req.body;
  const student = students.find((student) => student.id === id);
  if (student) {
    student.name = name;
    student.email = email;
    student.date = date;
    student.time = time;
    student.donation = donation;
    res.send(`Student with id ${id} updated.`);
  } else {
    res.status(404).send("Student not found.");
  }
});

app.get("/students", (req, res) => {
  res.json(students);
});
