import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admin data");
        return res.json();
      })
      .then((rows) => setData(rows))
      .catch((err) => {
        console.error("Admin fetch error:", err);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this entry?")) return;
    try {
      const response = await fetch(`http://127.0.0.1:5000/register/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setData(data.filter((entry) => entry.id !== id));
      } else {
        alert("Failed to delete entry.");
      }
    } catch (err) {
      console.error("Error deleting entry:", err);
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
          maxWidth: "700px",
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
          Admin Panel
        </h2>

        {data.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888" }}>
            No registrations yet.
          </p>
        ) : (
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {data.map((entry) => (
              <li
                key={entry.id}
                style={{
                  border: "1px solid #333",
                  padding: "15px",
                  marginBottom: "15px",
                  borderRadius: "8px",
                  background: "#121212",
                }}
              >
                <p style={{ marginBottom: "8px" }}>
                  <strong>{entry.name}</strong> ({entry.email})
                </p>
                <p style={{ marginBottom: "8px", color: "#0ff" }}>
                  Date:{" "}
                  {entry.date ? new Date(entry.date).toLocaleDateString() : "-"}{" "}
                  | Time: {entry.time || "-"}
                </p>
                <p style={{ marginBottom: "12px", color: "#0f0" }}>
                  Donation: {entry.donation ? `$${entry.donation}` : "None"}
                </p>
                <div>
                  <button
                    style={{
                      background: "linear-gradient(to right, #ff416c, #ff4b2b)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "#fff",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                    onClick={() => handleDelete(entry.id)}
                  >
                    Delete
                  </button>
                  <button
                    style={{
                      background: "linear-gradient(to right, #00f0ff, #8e2de2)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => alert("Edit not implemented yet.")}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
