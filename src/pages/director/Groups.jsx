import React, { useMemo, useState } from "react";
import "./Groups.css";
import { FaEllipsisV } from "react-icons/fa";

/* ==== Demo ma'lumotlar ==== */
const TEACHERS = ["Abbos shashoq", "Dilshod Bek", "Malika Karimova"];
const COURSES = ["Ingliz tili", "Frontend", "React", "IELTS"];
const DAYS = ["Odd days", "Even days", "Weekend days"];
const ROOMS = ["A1", "A2", "B1", "B2"];
const TAGS = ["New", "Intensive", "Morning", "Evening"];

const initialGroups = [
  {
    id: 1,
    name: "A1",
    course: "Ingliz tili",
    teacher: "Abbos shashoq",
    days: "Weekend days",
    startDate: "2025-08-18",
    endDate: "2026-08-18",
    weekOfStudy: "not started",
    room: "A2",
    tags: ["New"],
    students: 0,
    status: "Active groups",
  },
];

/* Jadval ustunlari (Columns paneli) */
const ALL_COLUMNS = [
  { key: "name", label: "Group" },
  { key: "course", label: "Course" },
  { key: "teacher", label: "Teacher" },
  { key: "days", label: "Days" },
  { key: "trainingDates", label: "Training dates" }, // computed from start/end
  { key: "weekOfStudy", label: "Week of study" },
  { key: "room", label: "Room" },
  { key: "tags", label: "Tags" },
  { key: "students", label: "Students" },
  { key: "actions", label: "Actions" }, // kebab
];

export default function Groups() {
  /* ====== State ====== */
  const [groups, setGroups] = useState(initialGroups);

  // Filtrlar
  const [filters, setFilters] = useState({
    status: "Active groups",
    teacher: "",
    course: "",
    days: "",
    tag: "",
    startDate: "",
    endDate: "",
  });

  // Columns panel
  const [showColumns, setShowColumns] = useState(false);
  const [visibleCols, setVisibleCols] = useState(
    ALL_COLUMNS.reduce((acc, c) => ({ ...acc, [c.key]: true }), {})
  );

  // Add modal
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    course: "",
    teacher: "",
    days: "",
    room: "",
    lessonTime: "",
    startDate: "",
  });

  // Kebab (uch nuqta) menyu
  const [kebabId, setKebabId] = useState(null);

  /* ====== Helpers ====== */
  const clearFilters = () =>
    setFilters({
      status: "Active groups",
      teacher: "",
      course: "",
      days: "",
      tag: "",
      startDate: "",
      endDate: "",
    });

  const filtered = useMemo(() => {
    return groups.filter((g) => {
      const okStatus = !filters.status || g.status === filters.status;
      const okTeacher = !filters.teacher || g.teacher === filters.teacher;
      const okCourse = !filters.course || g.course === filters.course;
      const okDays = !filters.days || g.days === filters.days;
      const okTag = !filters.tag || (g.tags || []).includes(filters.tag);
      const okStart =
        !filters.startDate || (g.startDate && g.startDate >= filters.startDate);
      const okEnd =
        !filters.endDate || (g.endDate && g.endDate <= filters.endDate);

      return okStatus && okTeacher && okCourse && okDays && okTag && okStart && okEnd;
    });
  }, [groups, filters]);

  const onSubmitAdd = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.course || !form.teacher) {
      alert("Name, Course va Teacher majburiy.");
      return;
    }
    const id = groups.length ? Math.max(...groups.map((g) => g.id)) + 1 : 1;
    const newItem = {
      id,
      name: form.name.trim(),
      course: form.course,
      teacher: form.teacher,
      days: form.days,
      startDate: form.startDate || "",
      endDate: "",
      weekOfStudy: "not started",
      room: form.room || "",
      tags: [],
      students: 0,
      status: "Active groups",
    };
    setGroups((prev) => [newItem, ...prev]);
    setForm({
      name: "",
      course: "",
      teacher: "",
      days: "",
      room: "",
      lessonTime: "",
      startDate: "",
    });
    setShowAdd(false);
  };

  /* ====== UI ====== */
  return (
    <div className="groups-page">
      {/* Header */}
      <div className="groups-head">
        <div className="title-wrap">
          <h1 className="title">Groups</h1>
          <span className="qty">Quantity — {filtered.length}</span>
        </div>

        <button className="add-btn" onClick={() => setShowAdd(true)}>
          ADD NEW
        </button>
      </div>

      {/* Filters */}
      <div className="filters-row">
        <div className="select">
          <select
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
          >
            <option>Active groups</option>
            <option>Archived</option>
          </select>
          <span className="chev">▾</span>
        </div>

        <div className="select">
          <select
            value={filters.teacher}
            onChange={(e) => setFilters((p) => ({ ...p, teacher: e.target.value }))}
          >
            <option value="">Teachers</option>
            {TEACHERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="chev">▾</span>
        </div>

        <div className="select">
          <select
            value={filters.course}
            onChange={(e) => setFilters((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">Courses</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="chev">▾</span>
        </div>

        <div className="select">
          <select
            value={filters.days}
            onChange={(e) => setFilters((p) => ({ ...p, days: e.target.value }))}
          >
            <option value="">Days</option>
            {DAYS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
          <span className="chev">▾</span>
        </div>

        <div className="select">
          <select
            value={filters.tag}
            onChange={(e) => setFilters((p) => ({ ...p, tag: e.target.value }))}
          >
            <option value="">Tags</option>
            {TAGS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <span className="chev">▾</span>
        </div>

        <div className="input with-icon">
          <span className="calendar">📅</span>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters((p) => ({ ...p, startDate: e.target.value }))}
            placeholder="Start date"
          />
        </div>

        <div className="input with-icon">
          <span className="calendar">📅</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters((p) => ({ ...p, endDate: e.target.value }))}
            placeholder="End date"
          />
        </div>

        <button className="columns-btn" onClick={() => setShowColumns(true)}>
          <span className="dots">▥</span> Columns
        </button>

        <button className="clear-btn" title="Clear filters" onClick={clearFilters}>
          ×
        </button>
      </div>

      {/* Table */}
      <div className="table">
        <div className="thead">
          {ALL_COLUMNS.map((col) =>
            visibleCols[col.key] ? (
              <div className="th" key={col.key}>
                {col.label}
              </div>
            ) : null
          )}
        </div>

        <div className="tbody">
          {filtered.length === 0 ? (
            <div className="empty">No data</div>
          ) : (
            filtered.map((g) => {
              const trainingDates = `${g.startDate || "—"}${
                g.endDate ? " — " + g.endDate : ""
              }`;
              return (
                <div className="tr" key={g.id}>
                  {visibleCols.name && <div className="td name-cell">{g.name}</div>}
                  {visibleCols.course && <div className="td">{g.course || "—"}</div>}
                  {visibleCols.teacher && <div className="td">{g.teacher || "—"}</div>}
                  {visibleCols.days && (
                    <div className="td">
                      {g.days || "—"}
                      {g.days?.includes("Weekend") ? (
                        <div className="sub">10:21</div>
                      ) : null}
                    </div>
                  )}
                  {visibleCols.trainingDates && (
                    <div className="td">{trainingDates}</div>
                  )}
                  {visibleCols.weekOfStudy && (
                    <div className="td">{g.weekOfStudy || "—"}</div>
                  )}
                  {visibleCols.room && <div className="td">{g.room || "—"}</div>}
                  {visibleCols.tags && (
                    <div className="td">
                      {(g.tags || []).length ? g.tags.join(", ") : "—"}
                    </div>
                  )}
                  {visibleCols.students && (
                    <div className="td">{g.students ?? 0}</div>
                  )}
                  {visibleCols.actions && (
                    <div className="td actions-cell">
                      <button
                        className="kebab"
                        onClick={() =>
                          setKebabId((prev) => (prev === g.id ? null : g.id))
                        }
                      >
                        <FaEllipsisV />
                      </button>

                      {kebabId === g.id && (
                        <div
                          className="menu"
                          onMouseLeave={() => setKebabId(null)}
                        >
                          <button onClick={() => alert("Edit " + g.name)}>
                            Edit
                          </button>
                          <button onClick={() => alert("Archive " + g.name)}>
                            Archive
                          </button>
                          <button
                            className="danger"
                            onClick={() => alert("Delete " + g.name)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Columns panel */}
      {showColumns && (
        <div className="overlay" onClick={() => setShowColumns(false)} />
      )}
      <div className={`columns-panel ${showColumns ? "show" : ""}`}>
        <div className="panel-head">
          <h3>Columns</h3>
          <button className="close" onClick={() => setShowColumns(false)}>
            ×
          </button>
        </div>
        <div className="panel-body">
          {ALL_COLUMNS.map((c) => (
            <label key={c.key} className="col-item">
              <input
                type="checkbox"
                checked={visibleCols[c.key]}
                onChange={(e) =>
                  setVisibleCols((p) => ({ ...p, [c.key]: e.target.checked }))
                }
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Add new modal (drawer) */}
      {showAdd && <div className="overlay" onClick={() => setShowAdd(false)} />}
      <div className={`add-modal ${showAdd ? "show" : ""}`}>
        <div className="modal-head">
          <h3>Add New Group</h3>
          <button className="close" onClick={() => setShowAdd(false)}>
            ×
          </button>
        </div>

        <form
          className="modal-body"
          onSubmit={onSubmitAdd}
          onClick={(e) => e.stopPropagation()}
        >
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Group name"
          />

          <label>Select course</label>
          <div className="select">
            <select
              value={form.course}
              onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
            >
              <option value="">Select options</option>
              {COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <span className="chev">▾</span>
          </div>

          <label>Select teacher</label>
          <div className="select">
            <select
              value={form.teacher}
              onChange={(e) =>
                setForm((p) => ({ ...p, teacher: e.target.value }))
              }
            >
              <option value="">Select options</option>
              {TEACHERS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="chev">▾</span>
          </div>

          <label>Days</label>
          <div className="select">
            <select
              value={form.days}
              onChange={(e) => setForm((p) => ({ ...p, days: e.target.value }))}
            >
              <option value="">Select options</option>
              {DAYS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <span className="chev">▾</span>
          </div>

          <label>Select room</label>
          <div className="select">
            <select
              value={form.room}
              onChange={(e) => setForm((p) => ({ ...p, room: e.target.value }))}
            >
              <option value="">Select options</option>
              {ROOMS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <span className="chev">▾</span>
          </div>

          <label>Lesson start time</label>
          <div className="input with-icon">
            <span className="clock">🕘</span>
            <input
              type="time"
              value={form.lessonTime}
              onChange={(e) =>
                setForm((p) => ({ ...p, lessonTime: e.target.value }))
              }
              placeholder="No time selected"
            />
          </div>

          <label>Group start date</label>
          <div className="input with-icon">
            <span className="calendar">📅</span>
            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm((p) => ({ ...p, startDate: e.target.value }))
              }
              placeholder="No date selected"
            />
          </div>

          <div className="modal-foot">
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
