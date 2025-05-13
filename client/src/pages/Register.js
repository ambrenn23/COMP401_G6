import { useState } from "react";
import { Calendar } from "../components/calendar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    time: "12:00",
    donation: "",
  });
  const [selectedDate, setSelectedDate] = useState();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Registered successfully!");
        setForm({ name: "", email: "", date: "", time: "12:00", donation: "" });
        setSelectedDate(null);
      } else {
        alert("Failed to submit form.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("Error submitting form.");
    }
  };

  return (
    <div
      style={{ background: "#090909", minHeight: "100vh", paddingTop: "40px" }}
    >
      <div
        style={{
          background: "#0f0f0f",
          color: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 20px #00f0ff",
          maxWidth: "450px",
          margin: "0 auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#00f0ff",
          }}
        >
          Baptism Class Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#fff",
            }}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#fff",
            }}
          />

          <label style={{ display: "block", marginBottom: "10px" }}>
            Select Date:
          </label>

          <Calendar
            selected={selectedDate}
            onSelect={(date) => {
              setSelectedDate(date);
              setForm({ ...form, date: date.toISOString().split("T")[0] });
            }}
          />

          {selectedDate && (
            <p style={{ marginTop: "10px", color: "#00f0ff" }}>
              Selected Date: {selectedDate.toLocaleDateString()}
            </p>
          )}

          <TimePicker
            onChange={(value) => setForm({ ...form, time: value })}
            value={form.time}
            clearIcon={null}
            clockIcon={null}
            disableClock={true}
          />

          <input
            name="donation"
            type="number"
            min="0"
            placeholder="Donation (optional)"
            value={form.donation}
            onChange={handleChange}
            style={{
              width: "100%",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #333",
              background: "#121212",
              color: "#fff",
            }}
          />
          <button
            type="submit"
            style={{
              background: "linear-gradient(to right, #00f0ff, #8e2de2)",
              border: "none",
              padding: "12px",
              borderRadius: "8px",
              color: "#fff",
              cursor: "pointer",
              width: "100%",
              marginTop: "10px",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.filter = "brightness(1.2)")}
            onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
