import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookOpen,
  FaLayerGroup,
  FaCubes,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaListUl,
  FaClipboardCheck
} from "react-icons/fa";
import "./Aside.css";
import logo from "../assets/logo.png";

// DIRECTOR menyusi
const directorMenu = [
  { label: "Dashboard", path: "/director/dashboard", icon: FaTachometerAlt },
  { label: "Kurslar", path: "/director/courses", icon: FaBookOpen },
  { label: "Guruhlar", path: "/director/groups", icon: FaLayerGroup },
  { label: "Modullar", path: "/director/modules", icon: FaCubes },
  { label: "Talabalar", path: "/director/students", icon: FaUserGraduate },
  { label: "O‘qituvchilar", path: "/director/teachers", icon: FaChalkboardTeacher },
  { label: "Mavzular", path: "/director/topics", icon: FaListUl }
];

// TEACHER menyusi
const teacherMenu = [
  { label: "Bosh sahifa", path: "/teacher", icon: FaTachometerAlt },
  { label: "Davomat", path: "/teacher/attendance", icon: FaClipboardCheck },
  { label: "Mavzular", path: "/teacher/topics", icon: FaListUl },
];

// STUDENT menyusi
const studentMenu = [
  { label: "Dashboard", path: "/student/dashboard", icon: FaTachometerAlt },
  { label: "Modullar", path: "/student/modules/1", icon: FaBookOpen }, // Test uchun courseId=1
  { label: "Mavzular", path: "/student/topics/1", icon: FaListUl },     // Test uchun moduleId=1
];

const Aside = () => {
  const role = localStorage.getItem("role"); // 'director', 'teacher', 'student'
  let menu = [];

  if (role === "teacher") menu = teacherMenu;
  else if (role === "student") menu = studentMenu;
  else menu = directorMenu;

  return (
    <aside className="aside-wrapper">
      <div className="aside-logo">
        <h2>
          {role === "teacher"
            ? "Teacher Dashboard"
            : role === "student"
            ? "Student Dashboard"
            : "Director Dashboard"}
        </h2>
      </div>
      <nav className="aside-nav">
        {menu.map((item, index) => (
          <Link key={index} to={item.path} className="aside-link">
            <item.icon className="icon" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Aside;
