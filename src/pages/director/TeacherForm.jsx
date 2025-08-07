import React, { useState } from "react";
import "./TeacherForm.css";

const TeacherForm = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    birthdate: "",
    gender: "Erkak",
    photo: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose(); // Panelni yopish
  };

  return (
    <div className="overlay">
      <div className="teacher-form-panel">
        <div className="form-header">
          <h2>O‘qituvchi qo‘shish</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Ismi:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Telefon raqam:
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Tug‘ilgan sana:
            <input
              type="date"
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
            />
          </label>

          <label>
            Jinsi:
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
          </label>

          <label>
            Rasm:
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
          </label>

          <label>
            Parol:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className="save-btn">
            Saqlash
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
