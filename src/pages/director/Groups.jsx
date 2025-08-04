import React from "react";
import "./Groups.css";

const dummyGroups = [
  {
    id: 1,
    name: "Frontend Guruh",
    module: "React.js",
    teacher: "Akmalov A.",
    schedule: "Du, Ch, Ju - 15:00",
  },
  {
    id: 2,
    name: "Backend Guruh",
    module: "Django",
    teacher: "Karimova S.",
    schedule: "Se, Pa - 19:00",
  },
  {
    id: 3,
    name: "Beginner Guruh",
    module: "HTML/CSS",
    teacher: "Abdullaev R.",
    schedule: "Sha, Yak - 10:00",
  },
  // ...istalgancha qo‘shing
];

const Groups = () => {
  return (
    <div className="groups-page">
      <h2>Guruhlar</h2>
      <div className="group-table">
        <div className="group-header">
          <span>Guruh nomi</span>
          <span>Modul</span>
          <span>O‘qituvchi</span>
          <span>Dars vaqti</span>
          <span>Amallar</span>
        </div>

        {dummyGroups.map((group) => (
          <div className="group-row" key={group.id}>
            <span>{group.name}</span>
            <span>{group.module}</span>
            <span>{group.teacher}</span>
            <span>{group.schedule}</span>
            <span>
              <button className="edit-btn">✏️</button>
              <button className="delete-btn">🗑</button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Groups;
