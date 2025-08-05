import React, { useState } from "react";
import "./Students.css";
import {
  FiTrash2,
  FiMessageCircle,
  FiDownload,
  FiMoreVertical,
  FiSettings,
  FiUpload,
} from "react-icons/fi";

const initialStudents = [
  {
    id: 1,
    name: "Aliyev Anvar",
    phone: "+998991112233",
    group: "Frontend",
    teacher: "Bekzod",
    balance: "200 000",
    comment: "Aktiv",
  },
  {
    id: 2,
    name: "Xasanova Laylo",
    phone: "+998990001122",
    group: "Backend",
    teacher: "Dilshod",
    balance: "0",
    comment: "To‘lov to‘lanmagan",
  },
  {
    id: 3,
    name: "Abdullaev Karim",
    phone: "+998971234567",
    group: "UI/UX",
    teacher: "Kamola",
    balance: "100 000",
    comment: "-",
  },
  {
    id: 4,
    name: "Ravshanov Murod",
    phone: "+998933456789",
    group: "React",
    teacher: "Odil",
    balance: "300 000",
    comment: "Qarzdor emas",
  },
  {
    id: 5,
    name: "Madina Islomova",
    phone: "+998901234567",
    group: "SMM",
    teacher: "Sardor",
    balance: "150 000",
    comment: "Bitirgan",
  },
];

const Students = () => {
  const [students, setStudents] = useState(initialStudents);
  const [selectedIds, setSelectedIds] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [activeDotsId, setActiveDotsId] = useState(null);
  const ALL_COLUMNS = [
    { key: "name", label: "Ism" },
    { key: "phone", label: "Telefon" },
    { key: "group", label: "Guruh" },
    { key: "teacher", label: "O‘qituvchi" },
    { key: "balance", label: "Balans" },
    { key: "comment", label: "Izoh" },
  ];

  const [selectedColumns, setSelectedColumns] = useState([
    "name",
    "phone",
    "group",
    "teacher",
    "balance",
    "comment",
  ]);
  const [showColumnPanel, setShowColumnPanel] = useState(false);

  const handleDotsClick = (id) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));
  };

  const handleEditStudent = (id) => {
    alert(`Tahrirlash bosildi: ID ${id}`);
    setActiveDotsId(null);
  };

  const handleDeleteStudent = (id) => {
    alert(`O‘chirish bosildi: ID ${id}`);
    setActiveDotsId(null);
  };

  const handlePaymentStudent = (id) => {
    alert(`To‘lov bosildi: ID ${id}`);
    setActiveDotsId(null);
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    setStudents((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
  };

  const handleAddStudent = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  return (
    <div className="content-students">
      {/* TOAST */}
      {showToast && (
        <div className="custom-toast">
          <div className="toast-icon">✔</div>
          <div className="toast-content">
            <strong>Muvaffaqiyatli</strong>
            <p>Qo‘shish muvaffaqiyatli yakunlandi!</p>
            <a href="/profile">Profilga o‘ting</a>
          </div>
          <div className="toast-close" onClick={() => setShowToast(false)}>
            ×
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="students-header">
        <h2>
          Talabalar{" "}
          <span className="student-count">
            Miqdor — {initialStudents.length} ta
          </span>
        </h2>

        <div className="header-buttons">
          <button className="add-btn" onClick={handleAddStudent}>
            Yangi qo‘shish
          </button>

          <button
            className="columns-btn"
            onClick={() => setShowColumnPanel(true)}
          >
            <FiSettings className="icon rotate-icon" /> Ustunlar
          </button>
          {/* Upload Excel */}
          <div className="excel-icon" data-tooltip="Upload to Excel">
            <FiUpload />
          </div>

          {/* Export Excel */}
          <div className="excel-icon excel-export" data-tooltip="Export Excel">
            <FiDownload />
          </div>
        </div>
      </div>

      {/* ACTION BAR */}
      <div className="actions-bar">
        <button
          className="action-bar-delete"
          onClick={handleDeleteSelected}
          disabled={selectedIds.length === 0}
        >
          <FiTrash2 /> O‘chirish
        </button>
        <button className="action-bar-sms" disabled={selectedIds.length === 0}>
          <FiMessageCircle /> SMS
        </button>
        <button className="action-bar-file" disabled={selectedIds.length === 0}>
          <FiDownload /> Faylga olish
        </button>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <input type="text" placeholder="Ism yoki telefon orqali qidirish" />
        <select>
          <option>Kurslar</option>
        </select>
        <select>
          <option>Talaba holati</option>
        </select>
        <select>
          <option>Moliyaviy holati</option>
        </select>
        <select>
          <option>Teglar bo‘yicha</option>
        </select>
        <input type="text" placeholder="Qo‘shimcha ID" />
        <input type="date" placeholder="Boshlanish sanasi" />
        <input type="date" placeholder="Tugash sanasi" />
      </div>

      {/* TABLE */}
      <table className="students-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(students.map((s) => s.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th>Foto</th>
            {selectedColumns.includes("name") && <th>Ism</th>}
            {selectedColumns.includes("phone") && <th>Telefon</th>}
            {selectedColumns.includes("group") && <th>Guruh</th>}
            {selectedColumns.includes("teacher") && <th>O‘qituvchi</th>}
            {selectedColumns.includes("balance") && <th>Balans</th>}
            {selectedColumns.includes("comment") && <th>Izoh</th>}
            <th>
              <FiMoreVertical />
            </th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="student-row">
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(s.id)}
                  onChange={() => handleSelect(s.id)}
                />
              </td>
              <td>
                <div className="avatar">{s.name.charAt(0)}</div>
              </td>
              {selectedColumns.includes("name") && <td>{s.name}</td>}
              {selectedColumns.includes("phone") && <td>{s.phone}</td>}
              {selectedColumns.includes("group") && <td>{s.group}</td>}
              {selectedColumns.includes("teacher") && <td>{s.teacher}</td>}
              {selectedColumns.includes("balance") && <td>{s.balance}</td>}
              {selectedColumns.includes("comment") && <td>{s.comment}</td>}

              <td className="dots-cell">
                <div className="dots-menu">
                  <span onClick={() => handleDotsClick(s.id)}>⋮</span>
                  {activeDotsId === s.id && (
                    <div className="dots-dropdown">
                      <div onClick={() => handleEditStudent(s.id)}>
                        ✏️ Tahrirlash
                      </div>
                      <div onClick={() => handleDeleteStudent(s.id)}>
                        🗑 O‘chirish
                      </div>
                      <div onClick={() => handlePaymentStudent(s.id)}>
                        💰 To‘lov
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showColumnPanel && (
        <>
          <div className="overlay" onClick={() => setShowColumnPanel(false)} />
          <div className="columns-panel" onClick={(e) => e.stopPropagation()}>
            <div className="columns-panel-header">
              <h3>Ustunlarni tanlang</h3>
              <span onClick={() => setShowColumnPanel(false)}>✖</span>
            </div>
            <div className="columns-panel-body">
              {ALL_COLUMNS.map((col) => (
                <label
                  key={col.key}
                  className={`column-option-panel ${
                    selectedColumns.includes(col.key) ? "" : "faded"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedColumns.includes(col.key)}
                    onChange={() => {
                      if (selectedColumns.includes(col.key)) {
                        setSelectedColumns(
                          selectedColumns.filter((c) => c !== col.key)
                        );
                      } else {
                        setSelectedColumns([...selectedColumns, col.key]);
                      }
                    }}
                  />
                  {col.label}
                </label>
              ))}
            </div>
            <div className="columns-panel-footer">
              <button onClick={() => setShowColumnPanel(false)}>Saqlash</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
