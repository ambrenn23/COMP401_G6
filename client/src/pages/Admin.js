import { useEffect, useState } from "react";

export default function Admin() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  const fetchStudents = async () => {
    const response = await fetch("http://127.0.0.1:5000/students");
    const data = await response.json();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?"))
      return;
    const response = await fetch(`http://127.0.0.1:5000/register/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      alert(`Deleted student with id ${id}`);
      fetchStudents();
    } else {
      alert("Failed to delete student.");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent({ ...student });
  };

  const handleEditChange = (e) => {
    setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://127.0.0.1:5000/register/${editingStudent.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingStudent),
      }
    );
    if (response.ok) {
      alert(`Student with id ${editingStudent.id} updated.`);
      setEditingStudent(null);
      fetchStudents();
    } else {
      alert("Failed to update student.");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Admin Panel (Dummy Data)</h2>
      {students.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              {student.name} ({student.email}) - {student.date} - {student.time}{" "}
              - {student.donation}
              <button onClick={() => handleDelete(student.id)}>Delete</button>
              <button onClick={() => handleEdit(student)}>Edit</button>
            </li>
          ))}
        </ul>
      )}

      {editingStudent && (
        <form onSubmit={handleEditSubmit}>
          <h3>Edit Student</h3>
          <input
            name="name"
            value={editingStudent.name}
            onChange={handleEditChange}
            required
          />
          <br />
          <input
            name="email"
            value={editingStudent.email}
            onChange={handleEditChange}
            required
          />
          <br />
          <input
            name="date"
            type="date"
            value={editingStudent.date}
            onChange={handleEditChange}
            required
          />
          <br />
          <input
            name="time"
            type="time"
            value={editingStudent.time}
            onChange={handleEditChange}
            required
          />
          <br />
          <input
            name="donation"
            type="number"
            min="0"
            value={editingStudent.donation}
            onChange={handleEditChange}
          />
          <br />
          <button type="submit">Save</button>
          <button type="button" onClick={() => setEditingStudent(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}
