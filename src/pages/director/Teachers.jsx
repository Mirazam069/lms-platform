import React, { useMemo, useRef, useState } from "react";
import "./Teachers.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSms,
  FaTimes,
  FaSave,
  FaChevronDown,
  FaSearch,
  FaUserCircle,
  FaPhone,
  FaCalendarAlt,
  FaDoorOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const initialTeachers = [
  {
    id: 1,
    name: "Javlon Bek",
    phone: "+998 90 123 45 67",
    birthDate: "1992-05-14",
    gender: "Erkak",
    photoUrl: "",
  },
  {
    id: 2,
    name: "Dilnoza Karimova",
    phone: "+998 93 700 20 30",
    birthDate: "1996-11-02",
    gender: "Ayol",
    photoUrl: "",
  },
  {
    id: 3,
    name: "Sardor Akram",
    phone: "+998 97 111 22 33",
    birthDate: "1990-01-25",
    gender: "Erkak",
    photoUrl: "",
  },
];

const emptyForm = {
  id: null,
  name: "",
  phone: "",
  birthDate: "",
  gender: "Erkak",
  photoFile: null,
  photoUrl: "",
};

export default function Teachers() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(true);
  const [formMode, setFormMode] = useState("add"); // 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);

  const [smsOpen, setSmsOpen] = useState(false);
  const [smsTo, setSmsTo] = useState(null);
  const [smsMessage, setSmsMessage] = useState("");

  const fileRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return teachers;
    return teachers.filter(
      (t) =>
        (t.name || "").toLowerCase().includes(q) ||
        (t.phone || "").toLowerCase().includes(q)
    );
  }, [teachers, query]);

  const resetForm = () => {
    setForm(emptyForm);
    if (fileRef.current) fileRef.current.value = "";
  };

  const openAdd = () => {
    setFormMode("add");
    resetForm();
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onEdit = (t) => {
    setFormMode("edit");
    setForm({
      id: t.id,
      name: t.name || "",
      phone: t.phone || "",
      birthDate: t.birthDate || "",
      gender: t.gender || "Erkak",
      photoFile: null,
      photoUrl: t.photoUrl || "",
    });
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    const t = teachers.find((x) => x.id === id);
    if (!t) return;
    if (window.confirm(`"${t.name}" yozuvini o‘chirishni tasdiqlaysizmi?`)) {
      setTeachers((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const onOpenSMS = (t) => {
    setSmsTo(t);
    setSmsMessage("");
    setSmsOpen(true);
  };

  const onSendSMS = () => {
    alert(
      `SMS yuborildi:\nQabul qiluvchi: ${smsTo.name} (${smsTo.phone})\nMatn: ${smsMessage}`
    );
    setSmsOpen(false);
    setSmsTo(null);
    setSmsMessage("");
  };

  const handlePhotoChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setForm((p) => ({ ...p, photoFile: f, photoUrl: url }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Ism va telefon majburiy.");
      return;
    }

    if (formMode === "add") {
      const newId = teachers.length
        ? Math.max(...teachers.map((x) => x.id)) + 1
        : 1;
      const newTeacher = {
        id: newId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        birthDate: form.birthDate || "",
        gender: form.gender || "Erkak",
        photoUrl: form.photoUrl || "",
      };
      setTeachers((prev) => [newTeacher, ...prev]);
      alert("O‘qituvchi qo‘shildi ✅");
      resetForm();
      setFormMode("add");
    } else {
      setTeachers((prev) =>
        prev.map((x) =>
          x.id === form.id ? { ...x, ...form } : x
        )
      );
      alert("O‘qituvchi tahrirlandi ✨");
    }
  };

  const onCancel = () => {
    resetForm();
    setFormMode("add");
  };

  return (
    <div className="teachers-page">
      {/* Header */}
      <div className="teachers-header">
        <div className="teachers-title">
          <h1>O‘qituvchilar</h1>
          <span className="teacher-count">Miqdor — {teachers.length} ta</span>
        </div>

        <div className="header-buttons">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Qidirish..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={openAdd}>
            <FaPlus /> Yangisini qo‘shish
          </button>
        </div>
      </div>

      {/* Form */}
      {formOpen && (
        <div className="form-card">
          <div className="form-header">
            <h2>{formMode === "add" ? "Yangi o‘qituvchi" : "Tahrirlash"}</h2>
            <button className="icon-btn" onClick={() => setFormOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <form onSubmit={onSubmit} className="form-grid">
            {/* Ism */}
            <div className="field">
              <label>Ism, Familiya</label>
              <div className="input">
                <FaUserCircle />
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
              </div>
            </div>

            {/* Telefon */}
            <div className="field">
              <label>Telefon raqam</label>
              <div className="input">
                <FaPhone />
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                />
              </div>
            </div>

            {/* Sana */}
            <div className="field">
              <label>Tug‘ilgan sana</label>
              <div className="input">
                <FaCalendarAlt />
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) => setForm((p) => ({ ...p, birthDate: e.target.value }))}
                />
              </div>
            </div>

            {/* Jins */}
            <div className="field">
              <label>Jins</label>
              <div className="select">
                <select
                  value={form.gender}
                  onChange={(e) => setForm((p) => ({ ...p, gender: e.target.value }))}
                >
                  <option>Erkak</option>
                  <option>Ayol</option>
                </select>
                <FaChevronDown className="chev" />
              </div>
            </div>

            {/* Rasm */}
            <div className="field">
              <label>Rasm</label>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} />
              {form.photoUrl && (
                <div className="photo-preview">
                  <img src={form.photoUrl} alt="preview" />
                </div>
              )}
            </div>

            <div className="actions-row">
              <button className="add-btn" type="submit">
                <FaSave />
                {formMode === "add" ? "Saqlash" : "O‘zgartirish"}
              </button>
              <button type="button" className="btn-ghost" onClick={onCancel}>
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="teachers-list">
        <div className="teachers-list-head">
          <div className="c">Foto</div>
          <div className="c">Ism</div>
          <div className="c">Telefon</div>
          <div className="c">Tug‘ilgan sana</div>
          <div className="c">Jins</div>
          <div className="c">Amallar</div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">Ma’lumot yo‘q</div>
        ) : (
          filtered.map((t) => (
            <div className="teacher-row" key={t.id}>
              <div className="c">
                {t.photoUrl ? (
                  <img className="avatar-img" src={t.photoUrl} alt={t.name} />
                ) : (
                  <div className="avatar">{t.name?.charAt(0)?.toUpperCase()}</div>
                )}
              </div>
              <div className="c">{t.name}</div>
              <div className="c">{t.phone}</div>
              <div className="c">{t.birthDate || "-"}</div>
              <div className="c">{t.gender || "-"}</div>
              <div className="c">
                <div className="actions-inline">
                  <Link to={`/director/teachers/${t.id}`} className="mini-btn cabinet-btn" title="Kabinet">
                    <FaDoorOpen />
                  </Link>
                  <button className="mini-btn" onClick={() => onEdit(t)} title="Tahrirlash">
                    <FaEdit />
                  </button>
                  <button className="mini-btn" onClick={() => onOpenSMS(t)} title="SMS">
                    <FaSms />
                  </button>
                  <button className="mini-btn" onClick={() => onDelete(t.id)} title="O‘chirish">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SMS modal */}
      {smsOpen && (
        <div className="modal-backdrop" onClick={() => setSmsOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>SMS yuborish</h3>
              <button className="icon-btn" onClick={() => setSmsOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="to">
                <span>Qabul qiluvchi:</span>
                <strong>
                  {smsTo?.name} — {smsTo?.phone}
                </strong>
              </div>
              <textarea
                rows={5}
                maxLength={400}
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
              />
              <div className="meta">Belgilar: {smsMessage.length} / 400</div>
            </div>
            <div className="modal-foot">
              <button className="btn-ghost" onClick={() => setSmsOpen(false)}>
                Bekor qilish
              </button>
              <button className="add-btn" disabled={!smsMessage.trim()} onClick={onSendSMS}>
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
