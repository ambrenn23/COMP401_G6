import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    donation: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        console.log("Form submitted successfully");
      } else {
        console.error("Failed to submit form");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Baptism Class Registration</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <br />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <br />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        required
      />
      <br />
      <input
        type="time"
        value={form.time}
        onChange={(e) => setForm({ ...form, time: e.target.value })}
        required
      />
      <br />
      <input
        placeholder="Donation (optional)"
        type="number"
        min="0"
        value={form.donation}
        onChange={(e) => setForm({ ...form, donation: e.target.value })}
      />
      <br />
      <button type="submit">Register</button>
    </form>
  );
}
