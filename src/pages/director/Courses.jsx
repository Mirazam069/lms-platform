import React, { useMemo, useRef, useState } from "react";
import "./Courses.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaSave,
  FaChevronDown,
  FaImage,
} from "react-icons/fa";

const initialCourses = [
  {
    id: 1,
    title: "Frontend Bootcamp",
    teacher: "Javlon Bek",
    price: 1200000,
    durationWeeks: 8,
    startDate: "2025-09-01",
    status: "Active",
    coverUrl: "",
  },
  {
    id: 2,
    title: "React Advanced",
    teacher: "Dilnoza Karimova",
    price: 1500000,
    durationWeeks: 6,
    startDate: "2025-09-15",
    status: "Inactive",
    coverUrl: "",
  },
];

const emptyForm = {
  id: null,
  title: "",
  teacher: "",
  price: "",
  durationWeeks: "",
  startDate: "",
  status: "Active",
  coverFile: null,
  coverUrl: "",
};

export default function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(true);
  const [formMode, setFormMode] = useState("add"); // 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);
  const fileRef = useRef(null);

  // Filter: title / teacher
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        (c.title || "").toLowerCase().includes(q) ||
        (c.teacher || "").toLowerCase().includes(q)
    );
  }, [courses, query]);

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

  const onEdit = (c) => {
    setFormMode("edit");
    setForm({
      id: c.id,
      title: c.title || "",
      teacher: c.teacher || "",
      price: c.price || "",
      durationWeeks: c.durationWeeks || "",
      startDate: c.startDate || "",
      status: c.status || "Active",
      coverFile: null,
      coverUrl: c.coverUrl || "",
    });
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    const c = courses.find((x) => x.id === id);
    if (!c) return;
    if (
      window.confirm(
        `"${c.title}" kursini o‘chirishni tasdiqlaysizmi?\nBu amalni qaytarib bo‘lmaydi.`
      )
    ) {
      setCourses((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const handleCoverChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setForm((p) => ({ ...p, coverFile: f, coverUrl: url }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      alert("Kurs nomi majburiy.");
      return;
    }
    if (!form.teacher.trim()) {
      alert("Ustoz nomi majburiy.");
      return;
    }

    if (formMode === "add") {
      const newId = courses.length ? Math.max(...courses.map((x) => x.id)) + 1 : 1;
      const newCourse = {
        id: newId,
        title: form.title.trim(),
        teacher: form.teacher.trim(),
        price: Number(form.price) || 0,
        durationWeeks: Number(form.durationWeeks) || 0,
        startDate: form.startDate || "",
        status: form.status || "Active",
        coverUrl: form.coverUrl || "",
      };
      // TODO: API POST /courses
      setCourses((prev) => [newCourse, ...prev]);
      alert("Kurs qo‘shildi ✅");
      resetForm();
      setFormMode("add");
    } else {
      // TODO: API PUT /courses/{id}
      setCourses((prev) =>
        prev.map((x) =>
          x.id === form.id
            ? {
                ...x,
                title: form.title.trim(),
                teacher: form.teacher.trim(),
                price: Number(form.price) || 0,
                durationWeeks: Number(form.durationWeeks) || 0,
                startDate: form.startDate || "",
                status: form.status || "Active",
                coverUrl: form.coverUrl || x.coverUrl || "",
              }
            : x
        )
      );
      alert("Kurs tahrirlandi ✨");
    }
  };

  const onCancel = () => {
    resetForm();
    setFormMode("add");
  };

  const priceFmt = (n) =>
    (Number(n) || 0).toLocaleString("uz-UZ", { maximumFractionDigits: 0 });

  return (
    <div className="courses-page">
      {/* Header */}
      <div className="courses-header">
        <div className="courses-title">
          <h1>Kurslar</h1>
          <span className="course-count">Miqdor — {courses.length} ta</span>
        </div>

        <div className="header-buttons">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Qidirish: kurs yoki ustoz..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={openAdd}>
            <FaPlus /> Yangi kurs
          </button>
        </div>
      </div>

      {/* Add/Edit form */}
      {formOpen && (
        <div className="form-card">
          <div className="form-header">
            <h2>{formMode === "add" ? "Yangi kurs qo‘shish" : "Kursni tahrirlash"}</h2>
          </div>

          <form onSubmit={onSubmit} className="form-grid">
            <div className="field">
              <label>Kurs nomi</label>
              <div className="input">
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                  placeholder="Masalan: React Advanced"
                />
              </div>
            </div>

            <div className="field">
              <label>Ustoz</label>
              <div className="input">
                <input
                  type="text"
                  value={form.teacher}
                  onChange={(e) => setForm((p) => ({ ...p, teacher: e.target.value }))}
                  placeholder="Masalan: Dilnoza Karimova"
                />
              </div>
            </div>

            <div className="field">
              <label>Narx (so‘m)</label>
              <div className="input">
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                  placeholder="1200000"
                />
              </div>
            </div>

            <div className="field">
              <label>Muddat (hafta)</label>
              <div className="input">
                <input
                  type="number"
                  min="0"
                  value={form.durationWeeks}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, durationWeeks: e.target.value }))
                  }
                  placeholder="8"
                />
              </div>
            </div>

            <div className="field">
              <label>Boshlanish sanasi</label>
              <div className="input">
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm((p) => ({ ...p, startDate: e.target.value }))}
                />
              </div>
            </div>

            <div className="field">
              <label>Status</label>
              <div className="select">
                <select
                  value={form.status}
                  onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                >
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <FaChevronDown className="chev" />
              </div>
            </div>

            <div className="field">
              <label>Cover (ixtiyoriy)</label>
              <div className="input">
                <FaImage />
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverChange}
                />
              </div>
              {form.coverUrl ? (
                <div className="cover-preview">
                  <img src={form.coverUrl} alt="cover" />
                </div>
              ) : null}
            </div>

            <div className="actions-row">
              <button className="add-btn" type="submit">
                <FaSave />
                {formMode === "add" ? "Saqlash" : "O‘zgartirishni saqlash"}
              </button>
              <button type="button" className="btn-ghost" onClick={onCancel}>
                Bekor qilish
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="courses-list">
        <div className="courses-list-head">
          <div className="c">Cover</div>
          <div className="c">Kurs</div>
          <div className="c">Ustoz</div>
          <div className="c">Narx</div>
          <div className="c">Muddat</div>
          <div className="c">Boshlanish</div>
          <div className="c">Status</div>
          <div className="c">Amallar</div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">Ko‘rsatiladigan ma’lumotlar yo‘q</div>
        ) : (
          filtered.map((c) => (
            <div className="course-row" key={c.id}>
              <div className="c">
                {c.coverUrl ? (
                  <img className="cover-img" src={c.coverUrl} alt={c.title} />
                ) : (
                  <div className="cover-ph">No Cover</div>
                )}
              </div>
              <div className="c">{c.title}</div>
              <div className="c">{c.teacher}</div>
              <div className="c">{priceFmt(c.price)} so‘m</div>
              <div className="c">{c.durationWeeks} hafta</div>
              <div className="c">{c.startDate || "-"}</div>
              <div className={`c status ${c.status === "Active" ? "st-active" : "st-inactive"}`}>
                {c.status}
              </div>
              <div className="c">
                <div className="actions-inline">
                  <button className="mini-btn" title="Tahrirlash" onClick={() => onEdit(c)}>
                    <FaEdit />
                  </button>
                  <button className="mini-btn" title="O‘chirish" onClick={() => onDelete(c.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
