// import React from "react";
import React, { useState } from "react";
import "./Students.css";

const dummyStudents = [
  { id: 1, name: "Aliyev Anvar", phone: "+998991112233", group: "Frontend", teacher: "Bekzod", balance: "200 000", comment: "Aktiv" },
  { id: 2, name: "Xasanova Laylo", phone: "+998990001122", group: "Backend", teacher: "Dilshod", balance: "0", comment: "To‘lov to‘lanmagan" },
  { id: 3, name: "Abdullaev Karim", phone: "+998971234567", group: "UI/UX", teacher: "Kamola", balance: "100 000", comment: "-" },
  { id: 4, name: "Ravshanov Murod", phone: "+998933456789", group: "React", teacher: "Odil", balance: "300 000", comment: "Qarzdor emas" },
  { id: 5, name: "Madina Islomova", phone: "+998901234567", group: "SMM", teacher: "Sardor", balance: "150 000", comment: "Bitirgan" },
  { id: 6, name: "Ergashev Ilyos", phone: "+998935432100", group: "Node.js", teacher: "Sarvar", balance: "0", comment: "Tushunmovchilik bo‘lgan" },
  { id: 7, name: "Gulbahor Normurodova", phone: "+998973210987", group: "Dizayn", teacher: "Firdavs", balance: "80 000", comment: "Kechikkan" },
  { id: 8, name: "Rustamov Jaxongir", phone: "+998909998877", group: "Python", teacher: "Nodir", balance: "0", comment: "Qayta yozilgan" },
  { id: 9, name: "Xusanov Bunyod", phone: "+998939191919", group: "PHP", teacher: "Diyor", balance: "50 000", comment: "-" },
  { id: 10, name: "Zuxra G‘ulomova", phone: "+998903334455", group: "Java", teacher: "Madina", balance: "270 000", comment: "Aktiv" },
  { id: 11, name: "Diyorbek Yusupov", phone: "+998909999000", group: "React", teacher: "Sarvar", balance: "0", comment: "Bitirgan" },
  { id: 12, name: "Shahnoza Erkinova", phone: "+998917171717", group: "Marketing", teacher: "Kamola", balance: "0", comment: "Yangi" },
];

const Students = () => {
  const [showToast, setShowToast] = useState(false);

  const handleAddStudent = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="content-students">
      {showToast && (
        <div className="custom-toast">
          <div className="toast-icon">✔</div>
          <div className="toast-content">
            <strong>Muvaffaqiyatli</strong>
            <p>Qo‘shish muvaffaqiyatli yakunlandi!</p>
            <a href="/profile">Profilga o‘ting</a>
          </div>
          <div className="toast-close" onClick={() => setShowToast(false)}>×</div>
        </div>
      )}

      <div className="students-header">
        <h2>Talabalar</h2>
        <button className="add-btn" onClick={handleAddStudent}>Yangi qo‘shish</button>
      </div>

      <div className="filters">
        <input type="text" placeholder="Ism yoki telefon orqali qidirish" />
        <select><option>Kurslar</option></select>
        <select><option>Talaba holati</option></select>
        <select><option>Moliyaviy holati</option></select>
        <select><option>Teglar bo‘yicha</option></select>
        <input type="text" placeholder="Qo‘shimcha ID" />
        <input type="date" placeholder="Boshlanish sanasi" />
        <input type="date" placeholder="Tugash sanasi" />
      </div>

      <table className="students-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Ism</th>
            <th>Telefon</th>
            <th>Guruh</th>
            <th>O‘qituvchi</th>
            <th>Balans</th>
            <th>Izoh</th>
          </tr>
        </thead>
        <tbody>
          {dummyStudents.map((s) => (
            <tr key={s.id}>
              <td><div className="avatar">{s.name.charAt(0)}</div></td>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>{s.group}</td>
              <td>{s.teacher}</td>
              <td>{s.balance}</td>
              <td>{s.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Students;
