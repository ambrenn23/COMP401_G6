import { useState } from "react";
import { Calendar } from "../components/calendar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "#00f0ff",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1.1rem",
  transition: "all 0.3s",
};

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
      style={{
        background: "#090909",
        minHeight: "100vh",
        position: "relative",
        padding: "20px",
      }}
    >
      <div
        style={{
          position: "fixed",
          left: "40px",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img
          src="/logo.jpg"
          alt="Church Logo"
          style={{
            width: "200px",
            height: "200px",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 0 25px rgba(0, 240, 255, 0.5)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "125px",
        }}
      >
        <header
          style={{
            textAlign: "center",
            marginBottom: "20px",
            marginTop: "20px",
          }}
        >
          <h1
            style={{
              color: "#00f0ff",
              fontSize: "2.5rem",
              marginBottom: "10px",
            }}
          >
            St Stephen's Catholic Church
          </h1>
          <div style={{ marginTop: "10px" }}>
            <Link to="/" style={linkStyle}>
              Register
            </Link>
            <span style={{ color: "#666", margin: "0 10px" }}>|</span>
            <Link to="/admin" style={linkStyle}>
              Admin
            </Link>
          </div>
        </header>

        <div
          style={{
            background: "#0f0f0f",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 0 20px #00f0ff",
            maxWidth: "450px",
            width: "100%",
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
              style={inputStyle}
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              style={inputStyle}
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
              style={inputStyle}
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.filter = "brightness(1.2)")}
              onMouseOut={(e) => (e.target.style.filter = "brightness(1)")}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginBottom: "10px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#121212",
  color: "#fff",
};

const buttonStyle = {
  background: "linear-gradient(to right, #00f0ff, #8e2de2)",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  color: "#fff",
  cursor: "pointer",
  width: "100%",
  marginTop: "10px",
  transition: "all 0.3s",
};
