import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((rows) => setData(rows))
      .catch((err) => {
        console.error("Failed to fetch admin data:", err);
        alert("Failed to load admin data. Is the backend running?");
      });
  }, []);

  return (
    <div>
      <h2>Admin View</h2>
      <ul>
        {data.map((entry) => (
          <li key={entry.id}>
            {entry.name} ({entry.email}) - {entry.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
