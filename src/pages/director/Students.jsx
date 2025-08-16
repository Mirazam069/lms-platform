import React, { useMemo, useState } from "react";
import {
  FiPlus,
  FiX,
  FiSearch,
  FiPhone,
  FiMail,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiChevronDown,
} from "react-icons/fi";
import "./Students.css";

/* ======= DEMO MA'LUMOTLAR ======= */
const COURSES = ["Ingliz tili", "Matematika", "React", "Backend", "IELTS"];
const GROUPS = ["A1", "B2", "Kids-A", "SAT-Prep"];
const TEACHERS = ["Abbos shashoq", "Nigora Q.", "Jasur R.", "Aziza S."];

const INITIAL_STUDENTS = [
  {
    id: "s1",
    name: "Asadbek Qodirov",
    phone: "+998 90 111 22 33",
    course: "Ingliz tili",
    group: "A1",
    teacher: "Abbos shashoq",
    status: "active",
    start: "18.08.2025",
    end: "18.08.2026",
    balance: "0 UZS",
  },
  {
    id: "s2",
    name: "Malika Isroilova",
    phone: "+998 93 555 66 77",
    course: "Matematika",
    group: "B2",
    teacher: "Nigora Q.",
    status: "active",
    start: "12.09.2025",
    end: "12.02.2026",
    balance: "50 000 UZS",
  },
  {
    id: "s3",
    name: "Sirojiddin",
    phone: "+998 97 700 80 90",
    course: "React",
    group: "SAT-Prep",
    teacher: "Aziza S.",
    status: "frozen",
    start: "05.11.2025",
    end: "05.05.2026",
    balance: "0 UZS",
  },
  {
    id: "s4",
    name: "Ziyoda",
    phone: "+998 91 222 33 44",
    course: "Ingliz tili",
    group: "Kids-A",
    teacher: "Jasur R.",
    status: "inactive",
    start: "01.10.2025",
    end: "01.04.2026",
    balance: "100 000 UZS",
  },
];

/** +998 XX XXX XX XX format */
const formatUzPhone = (raw) => {
  const d = (raw || "").replace(/\D/g, "");
  let rest = d.startsWith("998") ? d.slice(3) : d;
  rest = rest.slice(0, 9);
  const p1 = rest.slice(0, 2);
  const p2 = rest.slice(2, 5);
  const p3 = rest.slice(5, 7);
  const p4 = rest.slice(7, 9);
  let out = "+998";
  if (p1) out += " " + p1;
  if (p2) out += " " + p2;
  if (p3) out += " " + p3;
  if (p4) out += " " + p4;
  return out;
};

export default function Students() {
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selected, setSelected] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [editingId, setEditingId] = useState(null);

  const [filters, setFilters] = useState({
    q: "",
    course: "",
    group: "",
    teacher: "",
    start: "",
    end: "",
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    group: "",
    teacher: "",
    start: "",
    end: "",
    balance: "0 UZS",
    status: "active",
  });

  const openAdd = () => {
    setMode("add");
    setEditingId(null);
    setForm({
      name: "",
      phone: "",
      course: "",
      group: "",
      teacher: "",
      start: "",
      end: "",
      balance: "0 UZS",
      status: "active",
    });
    setDrawerOpen(true);
  };

  const openEdit = (s) => {
    setMode("edit");
    setEditingId(s.id);
    setForm({ ...s });
    setDrawerOpen(true);
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Ism va telefon majburiy.");
      return;
    }
    if (mode === "add") {
      const id = "s" + (Math.max(0, ...students.map((x) => +x.id.slice(1))) + 1);
      setStudents((p) => [{ ...form, id }, ...p]);
    } else {
      setStudents((p) => p.map((x) => (x.id === editingId ? { ...form } : x)));
    }
    setDrawerOpen(false);
  };

  const onDelete = (id) => {
    const st = students.find((x) => x.id === id);
    if (!st) return;
    if (window.confirm(`"${st.name}" ni o‘chirishni tasdiqlaysizmi?`)) {
      setStudents((p) => p.filter((x) => x.id !== id));
    }
  };

  const clearFilters = () =>
    setFilters({ q: "", course: "", group: "", teacher: "", start: "", end: "" });

  const data = useMemo(() => {
    const q = filters.q.toLowerCase();
    return students.filter((s) => {
      const m1 =
        !q || s.name.toLowerCase().includes(q) || s.phone.toLowerCase().includes(q);
      const m2 = !filters.course || s.course === filters.course;
      const m3 = !filters.group || s.group === filters.group;
      const m4 = !filters.teacher || s.teacher === filters.teacher;
      const m5 = !filters.start || s.start >= filters.start;
      const m6 = !filters.end || s.end <= filters.end;
      return m1 && m2 && m3 && m4 && m5 && m6;
    });
  }, [students, filters]);

  /* ---------- DETAILS VIEW ---------- */
  if (selected) {
    const s = students.find((x) => x.id === selected);
    return (
      <div className="students">
        {/* HEAD */}
        <div className="students-head">
          <button className="btn-secondary" onClick={() => setSelected(null)}>
            ← Back
          </button>
          <h2 className="students-title">
            {s.name} · {s.course} · {s.group}
          </h2>
        </div>

        {/* CARD */}
        <div className="students-detail-card">
          <div className="students-detail-col">
            <div className="row"><b>Name:</b> <span>{s.name}</span></div>
            <div className="row"><b>Phone:</b> <span>{s.phone}</span></div>
            <div className="row"><b>Course:</b> <span>{s.course}</span></div>
            <div className="row"><b>Group:</b> <span>{s.group}</span></div>
          </div>
          <div className="students-detail-col">
            <div className="row"><b>Teacher:</b> <span>{s.teacher}</span></div>
            <div className="row"><b>Dates:</b> <span>{s.start} — {s.end}</span></div>
            <div className="row">
              <b>Status:</b> <span className={`badge ${s.status}`}>{s.status}</span>
            </div>
            <div className="row"><b>Balance:</b> <span>{s.balance}</span></div>
          </div>
          <div className="students-detail-actions">
            <button className="ico" onClick={() => openEdit(s)} title="Edit"><FiEdit2/></button>
            <button className="ico" onClick={() => (window.location.href = `tel:${s.phone.replace(/\D/g,"")}`)} title="Call"><FiPhone/></button>
            <button className="ico" title="Mail"><FiMail/></button>
            <button className="ico danger" title="Delete" onClick={() => onDelete(s.id)}><FiTrash2/></button>
          </div>
        </div>

        <div className="students-tabs">
          <button className="tab active">Attendance</button>
          <button className="tab">Payments</button>
          <button className="tab">Homework</button>
          <button className="tab">History</button>
          <button className="tab">Comments</button>
        </div>

        <div className="students-panel">
          <div className="panel-bar" />
          <div className="panel-card">No lessons yet</div>
        </div>

        <div className="students-note">
          <div className="note-title">Note</div>
          <textarea placeholder="Write a note..." />
        </div>
      </div>
    );
  }

  /* ---------- LIST VIEW ---------- */
  return (
    <div className="students">
      {/* HEADER */}
      <div className="students-top">
        <div className="students-left">
          <h1>Students</h1>
          <span className="qty">Quantity — {data.length}</span>
        </div>
        <div className="students-right">
          <button className="btn-primary" onClick={openAdd}>
            <FiPlus /> <span>ADD NEW</span>
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="students-filters">
        <div className="fi">
          <FiSearch />
          <input
            value={filters.q}
            onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
            placeholder="Search by name or phone"
          />
        </div>

        <div className="fi">
          <span className="fi-ico"><FiChevronDown /></span>
          <select
            value={filters.course}
            onChange={(e) => setFilters((f) => ({ ...f, course: e.target.value }))}
          >
            <option value="">Courses</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="fi">
          <span className="fi-ico"><FiChevronDown /></span>
          <select
            value={filters.group}
            onChange={(e) => setFilters((f) => ({ ...f, group: e.target.value }))}
          >
            <option value="">Groups</option>
            {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div className="fi">
          <span className="fi-ico"><FiChevronDown /></span>
          <select
            value={filters.teacher}
            onChange={(e) => setFilters((f) => ({ ...f, teacher: e.target.value }))}
          >
            <option value="">Teachers</option>
            {TEACHERS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="fi">
          <FiCalendar />
          <input
            value={filters.start}
            onChange={(e) => setFilters((f) => ({ ...f, start: e.target.value }))}
            placeholder="Start date"
          />
        </div>

        <div className="fi">
          <FiCalendar />
          <input
            value={filters.end}
            onChange={(e) => setFilters((f) => ({ ...f, end: e.target.value }))}
            placeholder="End date"
          />
        </div>

        <button className="clear" title="Clear filters" onClick={clearFilters}>
          <FiX />
        </button>
      </div>

      {/* LONG BUTTON LIST */}
      <div className="students-list">
        {data.map((s) => (
          <button key={s.id} className="students-row" onClick={() => setSelected(s.id)}>
            <div className="row-left">
              <div className="avatar" aria-hidden="true">
                {(s.name || "?").trim().charAt(0).toUpperCase()}
              </div>
              <div className="meta">
                <div className="name">{s.name}</div>
                <div className="sub">
                  <span className={`badge ${s.status}`}>{s.status}</span>
                  <span className="dot">•</span>
                  <span className="mono">{s.phone}</span>
                </div>
                <div className="chips">
                  <span className="chip">{s.course}</span>
                  <span className="chip">Group: {s.group}</span>
                  <span className="chip">Teacher: {s.teacher}</span>
                  <span className="chip">{s.start} — {s.end}</span>
                  <span className="chip">Balance: {s.balance}</span>
                </div>
              </div>
            </div>

            <div className="row-right" onClick={(e) => e.stopPropagation()}>
              <button
                className="ico"
                title="Call"
                onClick={() => (window.location.href = `tel:${s.phone.replace(/\D/g, "")}`)}
              >
                <FiPhone />
              </button>
              <button className="ico" title="Mail">
                <FiMail />
              </button>
              <button className="ico" title="Edit" onClick={() => openEdit(s)}>
                <FiEdit2 />
              </button>
              <button className="ico danger" title="Delete" onClick={() => onDelete(s.id)}>
                <FiTrash2 />
              </button>
            </div>
          </button>
        ))}
      </div>

      {/* DRAWER */}
      {drawerOpen && (
        <div className="drawer-b" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-h">
              <h3>{mode === "add" ? "Add New Student" : "Edit Student"}</h3>
              <button className="ico" onClick={() => setDrawerOpen(false)}>
                <FiX />
              </button>
            </div>

            <form className="drawer-body" onSubmit={onSave}>
              <label className="lbl">Full name *</label>
              <input
                className="inp"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Student name"
              />

              <label className="lbl">Phone *</label>
              <input
                className="inp"
                value={form.phone}
                maxLength={19}
                onChange={(e) => setForm((f) => ({ ...f, phone: formatUzPhone(e.target.value) }))}
                placeholder="+998 XX XXX XX XX"
              />

              <label className="lbl">Course</label>
              <div className="sel">
                <select
                  value={form.course}
                  onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                >
                  <option value="">Select course</option>
                  {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <FiChevronDown />
              </div>

              <label className="lbl">Group</label>
              <div className="sel">
                <select
                  value={form.group}
                  onChange={(e) => setForm((f) => ({ ...f, group: e.target.value }))}
                >
                  <option value="">Select group</option>
                  {GROUPS.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
                <FiChevronDown />
              </div>

              <label className="lbl">Teacher</label>
              <div className="sel">
                <select
                  value={form.teacher}
                  onChange={(e) => setForm((f) => ({ ...f, teacher: e.target.value }))}
                >
                  <option value="">Select teacher</option>
                  {TEACHERS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
                <FiChevronDown />
              </div>

              <label className="lbl">Dates</label>
              <div className="dates">
                <div className="date"><FiCalendar /><input placeholder="Start date" value={form.start} onChange={(e)=>setForm((f)=>({...f,start:e.target.value}))}/></div>
                <div className="date"><FiCalendar /><input placeholder="End date" value={form.end} onChange={(e)=>setForm((f)=>({...f,end:e.target.value}))}/></div>
              </div>

              <label className="lbl">Balance</label>
              <input
                className="inp"
                value={form.balance}
                onChange={(e) => setForm((f) => ({ ...f, balance: e.target.value }))}
                placeholder="0 UZS"
              />

              <div className="drawer-foot">
                <button type="button" className="btn-secondary" onClick={() => setDrawerOpen(false)}>Cancel</button>
                <button className="btn-primary" type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
