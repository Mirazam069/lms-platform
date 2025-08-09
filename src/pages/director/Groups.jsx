import React, { useMemo, useState } from "react";
import "./Groups.css";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaChevronDown } from "react-icons/fa";

const initialGroups = [
  {
    id: 1,
    name: "Frontend A-1",
    teacher: "Javlon Bek",
    startDate: "2025-09-01",
    students: 18,
    status: "Active",
  },
  {
    id: 2,
    name: "React Night",
    teacher: "Dilnoza Karimova",
    startDate: "2025-09-10",
    students: 12,
    status: "Inactive",
  },
];

const emptyForm = {
  id: null,
  name: "",
  teacher: "",
  startDate: "",
  students: "",
  status: "Active",
};

export default function Groups() {
  const [groups, setGroups] = useState(initialGroups);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(true);
  const [formMode, setFormMode] = useState("add"); // 'add' | 'edit'
  const [form, setForm] = useState(emptyForm);

  // Search by name/teacher
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups.filter(
      (g) =>
        (g.name || "").toLowerCase().includes(q) ||
        (g.teacher || "").toLowerCase().includes(q)
    );
  }, [groups, query]);

  const resetForm = () => setForm(emptyForm);

  const openAdd = () => {
    setFormMode("add");
    resetForm();
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onEdit = (g) => {
    setFormMode("edit");
    setForm({
      id: g.id,
      name: g.name || "",
      teacher: g.teacher || "",
      startDate: g.startDate || "",
      students: g.students ?? "",
      status: g.status || "Active",
    });
    setFormOpen(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onDelete = (id) => {
    const g = groups.find((x) => x.id === id);
    if (!g) return;
    if (window.confirm(`"${g.name}" guruhini o‘chirishni tasdiqlaysizmi?`)) {
      setGroups((prev) => prev.filter((x) => x.id !== id));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return alert("Guruh nomi majburiy.");
    if (!form.teacher.trim()) return alert("Ustoz nomi majburiy.");

    if (formMode === "add") {
      const newId = groups.length ? Math.max(...groups.map((x) => x.id)) + 1 : 1;
      const newGroup = {
        id: newId,
        name: form.name.trim(),
        teacher: form.teacher.trim(),
        startDate: form.startDate || "",
        students: Number(form.students) || 0,
        status: form.status || "Active",
      };
      // TODO: API POST /groups
      setGroups((prev) => [newGroup, ...prev]);
      alert("Guruh qo‘shildi ✅");
      resetForm();
      setFormMode("add");
    } else {
      // TODO: API PUT /groups/{id}
      setGroups((prev) =>
        prev.map((x) =>
          x.id === form.id
            ? {
                ...x,
                name: form.name.trim(),
                teacher: form.teacher.trim(),
                startDate: form.startDate || "",
                students: Number(form.students) || 0,
                status: form.status || "Active",
              }
            : x
        )
      );
      alert("Guruh tahrirlandi ✨");
    }
  };

  const onCancel = () => {
    resetForm();
    setFormMode("add");
  };

  return (
    <div className="groups-page">
      {/* Header */}
      <div className="groups-header">
        <div className="groups-title">
          <h1>Guruhlar</h1>
          <span className="group-count">Miqdor — {groups.length} ta</span>
        </div>

        <div className="header-buttons">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Qidirish: guruh yoki ustoz..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button className="add-btn" onClick={openAdd}>
            <FaPlus /> Yangi guruh
          </button>
        </div>
      </div>

      {/* Add/Edit form */}
      {formOpen && (
        <div className="form-card">
          <div className="form-header">
            <h2>{formMode === "add" ? "Yangi guruh qo‘shish" : "Guruhni tahrirlash"}</h2>
          </div>

          <form onSubmit={onSubmit} className="form-grid">
            <div className="field">
              <label>Guruh nomi</label>
              <div className="input">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Masalan: Frontend A-1"
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
                  placeholder="Masalan: Javlon Bek"
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
              <label>Talabalar soni</label>
              <div className="input">
                <input
                  type="number"
                  min="0"
                  value={form.students}
                  onChange={(e) => setForm((p) => ({ ...p, students: e.target.value }))}
                  placeholder="18"
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
      <div className="groups-list">
        <div className="groups-list-head">
          <div className="c">Guruh</div>
          <div className="c">Ustoz</div>
          <div className="c">Boshlanish</div>
          <div className="c">Talabalar</div>
          <div className="c">Status</div>
          <div className="c">Amallar</div>
        </div>

        {filtered.length === 0 ? (
          <div className="empty">Ko‘rsatiladigan ma’lumotlar yo‘q</div>
        ) : (
          filtered.map((g) => (
            <div className="group-row" key={g.id}>
              <div className="c">{g.name}</div>
              <div className="c">{g.teacher}</div>
              <div className="c">{g.startDate || "-"}</div>
              <div className="c">{g.students}</div>
              <div className={`c status ${g.status === "Active" ? "st-active" : "st-inactive"}`}>
                {g.status}
              </div>
              <div className="c">
                <div className="actions-inline">
                  <button className="mini-btn" title="Tahrirlash" onClick={() => onEdit(g)}>
                    <FaEdit />
                  </button>
                  <button className="mini-btn" title="O‘chirish" onClick={() => onDelete(g.id)}>
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
