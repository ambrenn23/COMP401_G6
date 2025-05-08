import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/admin")  // Changed localhost to 127.0.0.1
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admin data");
        return res.json();
      })
      .then((rows) => setData(rows))
      .catch((err) => {
        console.error("Admin fetch error:", err);
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
