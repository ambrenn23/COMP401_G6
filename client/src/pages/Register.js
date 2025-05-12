import { useState } from "react";
import { Calendar } from "../components/calendar";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    time: "12:00",
    donation: "",
  });
  const [selectedDate, setSelectedDate] = useState();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }

    const formattedForm = {
      ...form,
      date: selectedDate.toISOString().split("T")[0],
    };

    console.log("Simulated form data:", formattedForm);
    alert("Registration simulated. Check console for data.");
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
          <Calendar selected={selectedDate} onSelect={setSelectedDate} />
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
