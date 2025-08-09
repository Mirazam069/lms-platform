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
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="overlay">
      <div className="teacher-form-panel">
        <div className="form-header">
          <h2>O‘qituvchi qo‘shish</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-field">
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            <label>Ismi</label>
          </div>

          <div className="form-field">
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
            <label>Telefon raqam</label>
          </div>

          <div className="form-field">
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
            <label className="fixed">Tug‘ilgan sana</label>
          </div>

          <div className="form-field">
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Erkak">Erkak</option>
              <option value="Ayol">Ayol</option>
            </select>
            <label className="fixed">Jinsi</label>
          </div>

          <div className="form-field">
            <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            <label className="fixed">Rasm</label>
          </div>

          <div className="form-field">
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <label>Parol</label>
          </div>

          <button type="submit" className="save-btn">Saqlash</button>
        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
