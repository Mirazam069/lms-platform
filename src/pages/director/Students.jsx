import React, { useState } from "react";
import "./Students.css";
import { FaUserGraduate } from "react-icons/fa";

const Students = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Islom Karimov", course: "Frontend", date: "2025-06-20" },
    { id: 2, name: "Maftuna Xasanova", course: "Backend", date: "2025-06-21" },
    { id: 3, name: "Behruz Rajabov", course: "English", date: "2025-06-22" },
  ]);

  const [newStudent, setNewStudent] = useState({ name: "", course: "", date: "" });

  const handleAddStudent = (e) => {
    e.preventDefault();
    const id = students.length + 1;
    setStudents([...students, { id, ...newStudent }]);
    setNewStudent({ name: "", course: "", date: "" });
  };

  return (
    <div className="students-container">
      <h1 className="students-title">Talabalar</h1>

      <form className="add-student-form" onSubmit={handleAddStudent}>
        <input
          type="text"
          placeholder="Ism Familiya"
          value={newStudent.name}
          onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Kurs nomi"
          value={newStudent.course}
          onChange={(e) => setNewStudent({ ...newStudent, course: e.target.value })}
          required
        />
        <input
          type="date"
          value={newStudent.date}
          onChange={(e) => setNewStudent({ ...newStudent, date: e.target.value })}
          required
        />
        <button type="submit">+ Qo'shish</button>
      </form>

      <div className="students-grid">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <FaUserGraduate className="student-icon" />
            <div>
              <p className="student-name">{student.name}</p>
              <p><strong>Kurs:</strong> {student.course}</p>
              <p><strong>Qo‘shilgan sana:</strong> {student.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
