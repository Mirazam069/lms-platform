// Groups.jsx
import React, { useState } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import "./Groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Frontend A", course: "Frontend", students: 18, time: "10:00 - 12:00" },
    { id: 2, name: "Backend B", course: "Backend", students: 15, time: "14:00 - 16:00" },
  ]);

  const [formData, setFormData] = useState({ name: "", course: "", students: "", time: "" });
  const [editId, setEditId] = useState(null);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [isClosing, setIsClosing] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setGroups(groups.map((g) => (g.id === editId ? { ...g, ...formData, students: +formData.students } : g)));
      setEditId(null);
      setShowEditPanel(false);
    } else {
      const newGroup = {
        id: Date.now(),
        ...formData,
        students: +formData.students,
      };
      setGroups([...groups, newGroup]);
    }
    setFormData({ name: "", course: "", students: "", time: "" });
  };

  const handleEdit = (group) => {
    setEditId(group.id);
    setFormData({ ...group });
    setShowEditPanel(true);
  };

  const handleDelete = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  // const closePanel = () => {
  //   setShowEditPanel(false);
  //   setEditId(null);
  // };

  const closePanel = () => {
  setIsClosing(true); // avval animatsiya boshlanadi
  setTimeout(() => {
    setShowEditPanel(false); // keyin panel butunlay yopiladi
    setIsClosing(false); // holat tiklanadi
    setEditId(null);
  }, 2000); // bu vaqt CSS animatsiyaga mos bo‘lishi kerak
};


  return (
    <div className="groups-wrapper">
      <h1 className="groups-heading">Guruhlar</h1>

      <form className="groups-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Guruh nomi" value={formData.name} onChange={handleChange} required />
        <input name="course" placeholder="Kurs nomi" value={formData.course} onChange={handleChange} required />
        <input name="students" type="number" placeholder="O'quvchilar soni" value={formData.students} onChange={handleChange} required />
        <input name="time" placeholder="Dars vaqti" value={formData.time} onChange={handleChange} required />
        <button type="submit">{editId ? "Yangilash" : "Qo‘shish"}</button>
      </form>

      <table className="groups-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Guruh/Modul</th>
            <th>Kurs</th>
            <th>O‘quvchilar</th>
            <th>Dars vaqti</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g, i) => (
            <tr key={g.id}>
              <td>{i + 1}</td>
              <td>{g.name}</td>
              <td>{g.course}</td>
              <td>{g.students}</td>
              <td>{g.time}</td>
              <td className="action-div-icons">
                <button className="action-btn edit-btn" onClick={() => handleEdit(g)}><FaEdit /></button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(g.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditPanel && (
        <div className={`edit-panel ${isClosing ? "closing" : ""}`}>
          <div className="edit-header">
            <h2>Guruhni Tahrirlash</h2>
            <button className="close-btn" onClick={closePanel}><FaTimes /></button>
          </div>
          <form className="edit-form" onSubmit={handleSubmit}>
            <input name="name" placeholder="Guruh nomi" value={formData.name} onChange={handleChange} required />
            <input name="course" placeholder="Kurs nomi" value={formData.course} onChange={handleChange} required />
            <input name="students" type="number" placeholder="O'quvchilar soni" value={formData.students} onChange={handleChange} required />
            <input name="time" placeholder="Dars vaqti" value={formData.time} onChange={handleChange} required />
            <button type="submit">Saqlash</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Groups;
