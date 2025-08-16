import React, { useMemo, useState } from "react";
import {
  FiChevronDown,
  FiX,
  FiPlus,
  FiSettings,
  FiMoreVertical,
  FiCalendar,
  FiTag,
  FiUser,
  FiBookOpen,
  FiClock,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiDownloadCloud,
} from "react-icons/fi";
import "./Groups.css";

/* ========================= CONSTS & MOCK DATA ========================= */
const ALL_COLUMNS = [
  { key: "group", label: "Group" },
  { key: "course", label: "Course" },
  { key: "teacher", label: "Teacher" },
  { key: "days", label: "Days" },
  { key: "dates", label: "Training dates" },
  { key: "week", label: "Week of study" },
  { key: "room", label: "Room" },
  { key: "tags", label: "Tags" },
  { key: "students", label: "Students" },
  { key: "actions", label: "Actions" },
];

const MOCK_GROUPS = [
  {
    id: "g1",
    name: "A1",
    course: "Ingliz tili",
    teacher: "Abbos shashoq",
    days: "Weekend days · 10:21",
    start: "18.08.2025",
    end: "18.08.2026",
    week: "not started",
    room: "A2",
    tags: [],
    students: 0,
    price: "1 000 000 UZS",
    capacity: 9,
  },
  {
    id: "g2",
    name: "B2",
    course: "Matematika",
    teacher: "Nigora Q.",
    days: "Mon/Wed/Fri · 15:30",
    start: "12.09.2025",
    end: "12.02.2026",
    week: "week 4",
    room: "B1",
    tags: ["olymp"],
    students: 12,
    price: "1 200 000 UZS",
    capacity: 10,
  },
  {
    id: "g3",
    name: "Kids-A",
    course: "Ingliz tili Kids",
    teacher: "Jasur R.",
    days: "Tue/Thu · 10:00",
    start: "01.10.2025",
    end: "01.04.2026",
    week: "week 2",
    room: "K1",
    tags: ["kids"],
    students: 9,
    price: "800 000 UZS",
    capacity: 8,
  },
  {
    id: "g4",
    name: "SAT-Prep",
    course: "SAT",
    teacher: "Aziza S.",
    days: "Sat/Sun · 18:00",
    start: "05.11.2025",
    end: "05.05.2026",
    week: "not started",
    room: "C3",
    tags: ["exam"],
    students: 7,
    price: "1 500 000 UZS",
    capacity: 12,
  },
];

/* ================================ PAGE ================================= */
export default function Groups() {
  const [filters, setFilters] = useState({
    status: "Active groups",
    teacher: "",
    course: "",
    days: "",
    tags: "",
    start: "",
    end: "",
  });
  const [visibleCols, setVisibleCols] = useState(
    ALL_COLUMNS.reduce((m, c) => ({ ...m, [c.key]: true }), {})
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [columnsOpen, setColumnsOpen] = useState(false);
  const [selected, setSelected] = useState(null); // group id

  const clearFilters = () =>
    setFilters({
      status: "Active groups",
      teacher: "",
      course: "",
      days: "",
      tags: "",
      start: "",
      end: "",
    });

  const data = useMemo(() => {
    return MOCK_GROUPS.filter((g) => {
      if (filters.teacher && !g.teacher.toLowerCase().includes(filters.teacher.toLowerCase())) return false;
      if (filters.course && !g.course.toLowerCase().includes(filters.course.toLowerCase())) return false;
      if (filters.tags && !g.tags.join(",").toLowerCase().includes(filters.tags.toLowerCase())) return false;
      if (filters.start && g.start < filters.start) return false;
      if (filters.end && g.end > filters.end) return false;
      return true;
    });
  }, [filters]);

  if (selected) {
    const group = MOCK_GROUPS.find((g) => g.id === selected);
    return <GroupDetails group={group} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="groups">
      <div className="groups-head">
        <div className="groups-title">
          <h1>Groups</h1>
          <div className="qty">Quantity — {data.length}</div>
        </div>

        <div className="head-actions">
          <button className="columns-btn" onClick={() => setColumnsOpen(true)}>
            <FiSettings /> <span>Columns</span>
          </button>
          <button className="add-btn" onClick={() => setDrawerOpen(true)}>
            <FiPlus /> <span>ADD NEW</span>
          </button>
        </div>
      </div>

      {/* Filters / Search */}
      <div className="filters">
        <div className="filter">
          <button className="select like-input">
            <span>{filters.status}</span>
            <FiChevronDown />
          </button>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiUser />
            <input
              value={filters.teacher}
              onChange={(e) => setFilters((f) => ({ ...f, teacher: e.target.value }))}
              placeholder="Teachers"
            />
          </div>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiBookOpen />
            <input
              value={filters.course}
              onChange={(e) => setFilters((f) => ({ ...f, course: e.target.value }))}
              placeholder="Courses"
            />
          </div>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiClock />
            <input
              value={filters.days}
              onChange={(e) => setFilters((f) => ({ ...f, days: e.target.value }))}
              placeholder="Days"
            />
          </div>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiTag />
            <input
              value={filters.tags}
              onChange={(e) => setFilters((f) => ({ ...f, tags: e.target.value }))}
              placeholder="Tags"
            />
          </div>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiCalendar />
            <input
              type="text"
              value={filters.start}
              onChange={(e) => setFilters((f) => ({ ...f, start: e.target.value }))}
              placeholder="Start date"
            />
          </div>
        </div>

        <div className="filter">
          <div className="like-input">
            <FiCalendar />
            <input
              type="text"
              value={filters.end}
              onChange={(e) => setFilters((f) => ({ ...f, end: e.target.value }))}
              placeholder="End date"
            />
          </div>
        </div>

        <button className="clear-btn" title="Clear filters" onClick={clearFilters}>
          <FiX />
        </button>
      </div>

      {/* Table */}
      <div className="table-wrap">
        <table className="groups-table">
          <thead>
            <tr>
              {visibleCols.group && <th>Group</th>}
              {visibleCols.course && <th>Course</th>}
              {visibleCols.teacher && <th>Teacher</th>}
              {visibleCols.days && <th>Days</th>}
              {visibleCols.dates && <th>Training dates</th>}
              {visibleCols.week && <th>Week of study</th>}
              {visibleCols.room && <th>Room</th>}
              {visibleCols.tags && <th>Tags</th>}
              {visibleCols.students && <th>Students</th>}
              {visibleCols.actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((g) => (
              <tr key={g.id}>
                {visibleCols.group && (
                  <td className="cell-link">
                    <button className="link" onClick={() => setSelected(g.id)}>
                      {g.name}
                    </button>
                  </td>
                )}
                {visibleCols.course && <td>{g.course}</td>}
                {visibleCols.teacher && <td>{g.teacher}</td>}
                {visibleCols.days && <td>{g.days}</td>}
                {visibleCols.dates && (
                  <td>
                    {g.start} — {g.end}
                  </td>
                )}
                {visibleCols.week && <td>{g.week}</td>}
                {visibleCols.room && <td>{g.room}</td>}
                {visibleCols.tags && <td>{g.tags.join(", ")}</td>}
                {visibleCols.students && <td>{g.students}</td>}
                {visibleCols.actions && (
                  <td className="actions-td">
                    <button className="icon-ghost">
                      <FiMoreVertical />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Drawer */}
      {drawerOpen && (
        <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-head">
              <h3>Add New Group</h3>
              <button className="icon-ghost" onClick={() => setDrawerOpen(false)}>
                <FiX />
              </button>
            </div>

            <div className="drawer-body">
              <label className="f-label">Name</label>
              <input className="f-input" placeholder="Group name" />

              <label className="f-label">Select course</label>
              <div className="f-select">
                <span>Select options</span>
                <FiChevronDown />
              </div>

              <label className="f-label">Select teacher</label>
              <div className="f-select">
                <span>Select options</span>
                <FiChevronDown />
              </div>

              <label className="f-label">Days</label>
              <div className="f-select">
                <span>Select options</span>
                <FiChevronDown />
              </div>

              <label className="f-label">Select room</label>
              <div className="f-select">
                <span>Select options</span>
                <FiChevronDown />
              </div>

              <label className="f-label">Lesson start time</label>
              <div className="f-select">
                <span>No time selected</span>
                <FiChevronDown />
              </div>

              <label className="f-label">Group training dates</label>
              <div className="f-date-row">
                <div className="f-date">
                  <FiCalendar />
                  <input placeholder="Start date" />
                </div>
                <div className="f-date">
                  <FiCalendar />
                  <input placeholder="End date" />
                </div>
              </div>
            </div>

            <div className="drawer-foot">
              <button className="btn-secondary" onClick={() => setDrawerOpen(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => setDrawerOpen(false)}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Columns Modal */}
      {columnsOpen && (
        <div className="modal-backdrop" onClick={() => setColumnsOpen(false)}>
          <div className="columns-modal" onClick={(e) => e.stopPropagation()}>
            <div className="columns-head">
              <div className="title">Columns</div>
              <button className="icon-ghost" onClick={() => setColumnsOpen(false)}>
                <FiX />
              </button>
            </div>
            <div className="columns-body">
              {ALL_COLUMNS.filter((c) => c.key !== "actions").map((c) => (
                <label key={c.key} className="col-item">
                  <input
                    type="checkbox"
                    checked={!!visibleCols[c.key]}
                    onChange={(e) =>
                      setVisibleCols((v) => ({ ...v, [c.key]: e.target.checked }))
                    }
                  />
                  <span>{c.label}</span>
                </label>
              ))}
              <label className="col-item">
                <input
                  type="checkbox"
                  checked={!!visibleCols.actions}
                  onChange={(e) =>
                    setVisibleCols((v) => ({ ...v, actions: e.target.checked }))
                  }
                />
                <span>Actions</span>
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================ DETAILS VIEW ============================= */
function GroupDetails({ group, onBack }) {
  const g = group || {};
  return (
    <div className="group-details">
      <div className="gd-top">
        <button className="btn-secondary" onClick={onBack}>
          ← Back
        </button>
        <h2 className="gd-title">
          {g.name} · {g.course} · {g.teacher}
        </h2>
      </div>

      <div className="gd-card">
        <ul className="gd-info">
          <li>
            <strong>Course:</strong> {g.course}
          </li>
          <li>
            <strong>Teacher:</strong> {g.teacher}
          </li>
          <li>
            <strong>Price:</strong> {g.price}
          </li>
          <li>
            <strong>Time:</strong> {g.days}
          </li>
          <li>
            <strong>Rooms:</strong> {g.room}
          </li>
          <li>
            <strong>Room capacity:</strong> {g.capacity}
          </li>
          <li>
            <strong>Training dates:</strong> {g.start} — {g.end}
          </li>
          <li className="gd-id">
            <em>(id: 139793)</em>
          </li>
        </ul>

        <div className="gd-actions">
          <button className="gd-icon" title="Edit">
            <FiEdit2 />
          </button>
          <button className="gd-icon danger" title="Delete">
            <FiTrash2 />
          </button>
          <button className="gd-icon" title="Email">
            <FiMail />
          </button>
          <button className="gd-icon" title="Add">
            <FiPlus />
          </button>
          <button className="gd-icon" title="Export">
            <FiDownloadCloud />
          </button>
        </div>

        <div style={{ height: 1, background: "var(--border-color)", margin: "10px 0 12px" }} />

        <div className="gd-foot" style={{ paddingTop: 6 }}>
          <div className="gd-select">
            <span>By A-Z</span>
            <FiChevronDown />
          </div>

          <button className="gd-archived">Show archived students</button>

          <button
            className="gd-fab"
            title="Download"
            style={{
              border: "2px solid #21a55a",
              color: "#21a55a",
            }}
          >
            <FiDownloadCloud />
          </button>
        </div>
      </div>

      <div className="gd-tabs">
        <button className="tab active">Attendance</button>
        <button className="tab">Online lessons and materials</button>
        <button className="tab">Discount prices</button>
        <button className="tab">Exams</button>
        <button className="tab">History</button>
        <button className="tab">Comments</button>
      </div>

      <div className="gd-panel">
        <div className="gd-panel-bar" />
        <div className="gd-panel-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>Course has not started yet</span>
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                border: "2px solid var(--primary-color)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              title="Calendar"
            >
              <FiCalendar />
            </span>
          </div>
        </div>
      </div>

      <div className="gd-note">
        <div className="gd-note-title">Note</div>
        <textarea placeholder="Write a note..." />
      </div>
    </div>
  );
}
