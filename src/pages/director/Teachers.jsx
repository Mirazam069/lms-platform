import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeacherForm from "./TeacherForm";
import "./Teachers.css";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const navigate = useNavigate();

  const addTeacher = (newTeacher) => {
    setTeachers((prev) => [...prev, newTeacher]);
    setIsFormOpen(false);
  };

  const openTeacherProfile = (teacherId) => {
    navigate(`/director/teachers/${teacherId}`);
  };

  return (
    <div className="teachers-page">
      <div className="teachers-header">
        <h2>O‘qituvchilar <span>Miqdor — {teachers.length}</span></h2>
        <div className="teachers-buttons">
          <button onClick={() => setIsFormOpen(true)} className="add-btn">Yangi o‘qituvchi qo‘shish</button>
          <button className="import-btn">📥 Import</button>
        </div>
      </div>

      <div className="teachers-list">
        {teachers.map((teacher, index) => (
          <div key={index} className="teacher-card" onClick={() => openTeacherProfile(index)}>
            <p><strong>{teacher.name}</strong></p>
            <p>{teacher.phone}</p>
            <p>0 guruhlar</p>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <TeacherForm
          onClose={() => setIsFormOpen(false)}
          onSave={addTeacher}
        />
      )}
    </div>
  );
};

export default Teachers;
