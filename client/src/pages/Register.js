import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", date: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
  
      if (response.ok) {
        console.log("✅ Form submitted successfully");
        alert("Registration successful!");
        setForm({ name: "", email: "", date: "" });
      } else {
        console.error("❌ Failed to submit form");
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
      alert("Server error or CORS issue. Check backend is running.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Baptism Class Registration</h2>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      /><br />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      /><br />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      /><br />
      <button type="submit">Register</button>
    </form>
  );
}
