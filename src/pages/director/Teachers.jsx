import React, { useState } from "react";
import "./Teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      fullName: "Mirazim G‘iyosov",
      subject: "Frontend",
      salary: "3 000 000",
      phone: "+998 99 123 45 67",
    },
    {
      id: 2,
      fullName: "Dilnoza To‘xtayeva",
      subject: "Ingliz tili",
      salary: "2 500 000",
      phone: "+998 90 888 88 88",
    },
  ]);

  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    subject: "",
    salary: "",
    phone: "",
  });

  const handleAddTeacher = () => {
    const newId = teachers.length + 1;
    const updatedList = [...teachers, { ...newTeacher, id: newId }];
    setTeachers(updatedList);
    setNewTeacher({ fullName: "", subject: "", salary: "", phone: "" });
  };

  return (
    <div className="teachers-wrapper">
      <h1 className="teachers-title">O‘qituvchilar ro‘yxati</h1>

      <div className="teacher-form">
        <input
          type="text"
          placeholder="Ism Familyasi"
          value={newTeacher.fullName}
          onChange={(e) => setNewTeacher({ ...newTeacher, fullName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Fan"
          value={newTeacher.subject}
          onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
        />
        <input
          type="text"
          placeholder="Maosh"
          value={newTeacher.salary}
          onChange={(e) => setNewTeacher({ ...newTeacher, salary: e.target.value })}
        />
        <input
          type="text"
          placeholder="Telefon"
          value={newTeacher.phone}
          onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
        />
        <button onClick={handleAddTeacher}>Qo‘shish</button>
      </div>

      <div className="teachers-table">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Ismi</th>
              <th>Fan</th>
              <th>Maosh</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) => (
              <tr key={teacher.id}>
                <td>{index + 1}</td>
                <td>{teacher.fullName}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.salary}</td>
                <td>{teacher.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Teachers;
