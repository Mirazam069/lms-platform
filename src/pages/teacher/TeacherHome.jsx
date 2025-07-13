import React from "react";
import "./TeacherHome.css";
import {
  FaClipboardCheck,
  FaUsers,
  FaBookOpen,
  FaLayerGroup,
} from "react-icons/fa";

const TeacherHome = () => {
  return (
    <div className="teacher-home">
      <h1 className="teacher-title">O‘qituvchi Paneli</h1>

      <div className="teacher-stats">
        <div className="teacher-card">
          <FaLayerGroup className="teacher-icon" />
          <div>
            <p className="teacher-label">Mening Guruhlarim</p>
            <h3>3 ta</h3>
          </div>
        </div>
        <div className="teacher-card">
          <FaUsers className="teacher-icon" />
          <div>
            <p className="teacher-label">Talabalarim</p>
            <h3>48 nafar</h3>
          </div>
        </div>
        <div className="teacher-card">
          <FaBookOpen className="teacher-icon" />
          <div>
            <p className="teacher-label">Mavzular</p>
            <h3>24 ta</h3>
          </div>
        </div>
        <div className="teacher-card">
          <FaClipboardCheck className="teacher-icon" />
          <div>
            <p className="teacher-label">Davomat</p>
            <h3>92%</h3>
          </div>
        </div>
      </div>

      <div className="teacher-welcome">
        <h2>Xush kelibsiz, o‘qituvchi!</h2>
        <p>
          O‘zingizga biriktirilgan guruhlar, talabalar va mavzularni boshqarish
          uchun menyudan foydalaning.
        </p>
      </div>
    </div>
  );
};

export default TeacherHome;
