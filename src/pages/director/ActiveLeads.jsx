import React, { useMemo, useState } from "react";
import "./ActiveLeads.css";
import {
  FaPlus,
  FaTimes,
  FaEllipsisV,
  FaEdit,
  FaSms,
  FaTrash,
  FaLock,
  FaLockOpen,
  FaUserPlus,
  FaInfoCircle,
  FaClock,
  FaPhone,
  FaSyncAlt,
} from "react-icons/fa";

/* ---------- Default ustunlar ---------- */
const DEFAULT_COLUMNS = [
  { key: "new", label: "Yangi lidlar", locked: false, builtin: true },
  { key: "pending", label: "Kutilayotganlar", locked: false, builtin: true },
  { key: "rejected", label: "Rad etilganlar", locked: false, builtin: true },
  { key: "joined", label: "Qo‘shilganlar", locked: false, builtin: true },
];

/* ---------- Selectlar ---------- */
const COURSES = ["Frontend", "React", "Backend", "UI/UX", "IELTS"];
const SOURCES = ["Instagram", "Telegram", "Reklama", "Do‘stdan eshitgan", "Boshqa"];
const TAGS = ["Hot", "Warm", "Cold"];
const STAFF = ["Menejer 1", "Menejer 2", "Menejer 3"];
const SECTIONS = ["All", "Leads", "Students"];

/* ---------- Demo ma'lumotlar ---------- */
const initialLeads = [
  {
    id: 1,
    name: "Asadbek Qodirov",
    phone: "+998 90 111 22 33",
    course: "Frontend",
    source: "Instagram",
    comment: "Frontend kursiga qiziqdi",
    status: "new",
    createdAt: "2025-08-01T09:00:00.000Z",
    group: "",
  },
  {
    id: 2,
    name: "Malika Isroilova",
    phone: "+998 93 555 66 77",
    course: "React",
    source: "Do‘stdan eshitgan",
    comment: "Sana moslash kerak",
    status: "pending",
    createdAt: "2025-08-02T10:30:00.000Z",
    group: "",
  },
  {
    id: 3,
    name: "Sirojiddin",
    phone: "+998 97 700 80 90",
    course: "Backend",
    source: "Telegram",
    comment: "To‘lov bo‘yicha savollar",
    status: "rejected",
    createdAt: "2025-08-03T12:15:00.000Z",
    group: "",
  },
  {
    id: 4,
    name: "Ziyoda",
    phone: "+998 91 222 33 44",
    course: "React",
    source: "Reklama",
    comment: "React guruhiga qo‘shildi",
    status: "joined",
    createdAt: "2025-08-04T13:20:00.000Z",
    group: "",
  },
];

/* --------- Helperlar --------- */
function formatDateTime(iso) {
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${dd}.${mm}.${yyyy}, ${hh}:${mi}:${ss}`;
  } catch {
    return iso?.slice(0, 10) || "";
  }
}

const cleanTel = (s) => (s || "").replace(/[^\d+]/g, "");

/* UZ raqam formatiga avtomatik: +998 XX XXX XX XX */
function formatUzPhone(raw) {
  const digits = (raw || "").replace(/\D/g, "");
  if (!digits) return "";
  let rest = digits.startsWith("998") ? digits.slice(3) : digits;
  rest = rest.slice(0, 9); // 2+3+2+2
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
}

export default function ActiveLeads() {
  // INFO POPOVER
const [infoPop, setInfoPop] = useState({ open: false, x: 0, y: 0, lead: null });

const openInfo = (e, lead) => {
  e.stopPropagation();
  const r = e.currentTarget.getBoundingClientRect();
  // popover ~300px kenglik deb hisoblab, ekrandan chiqib ketmasin:
  const left = Math.min(r.right + 8 + window.scrollX, window.innerWidth - 320);
  const top  = r.top + window.scrollY - 6; // ikonkaning yonida, sal yuqoriroq
  setInfoPop({ open: true, x: left, y: top, lead });
};

const closeInfo = () => setInfoPop({ open: false, x: 0, y: 0, lead: null });

// ochiq bo'lsa — resize/gorizontal scrollda yopib qo'yamiz
React.useEffect(() => {
  if (!infoPop.open) return;
  const colWrap = document.querySelector(".al-columns");
  window.addEventListener("resize", closeInfo);
  colWrap && colWrap.addEventListener("scroll", closeInfo, { passive: true });
  document.addEventListener("click", closeInfo); // tashqariga bosilsa yopilsin
  return () => {
    window.removeEventListener("resize", closeInfo);
    colWrap && colWrap.removeEventListener("scroll", closeInfo);
    document.removeEventListener("click", closeInfo);
  };
}, [infoPop.open]);

  /* ====== Leadlar ====== */
  const [leads, setLeads] = useState(initialLeads);

  /* ====== Ustunlar ====== */
  const [columns, setColumns] = useState(DEFAULT_COLUMNS);

  /* ==== Boxlar (guruhlar): [{name, locked}] ==== */
  const [groups, setGroups] = useState(
    Object.fromEntries(columns.map((c) => [c.key, []]))
  );

  /* ====== Drawer (qo‘shish/tahrirlash) ====== */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    course: "",
    source: "",
    comment: "",
  });

  /* ====== Qidiruv ====== */
  const [search, setSearch] = useState({
    name: "",
    phone: "",
    course: "",
    source: "",
    section: "",
    tag: "",
    staff: "",
    from: "",
    to: "",
  });
  const resetSearch = () =>
    setSearch({
      name: "",
      phone: "",
      course: "",
      source: "",
      section: "",
      tag: "",
      staff: "",
      from: "",
      to: "",
    });

  /* ====== Card kebab ====== */
  const [menuOpenId, setMenuOpenId] = useState(null);

  /* ====== Info popover ====== */
  const [infoOpenId, setInfoOpenId] = useState(null);

  /* ====== SMS modal (single yoki group) ====== */
  const [smsOpen, setSmsOpen] = useState(false);
  const [smsTargets, setSmsTargets] = useState([]); // [{name,phone}, ...]
  const [smsText, setSmsText] = useState("");

  /* ====== Comment modal ====== */
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentLeadId, setCommentLeadId] = useState(null);
  const [commentText, setCommentText] = useState("");

  /* ====== Reminder modal ====== */
  const [remOpen, setRemOpen] = useState(false);
  const [remLead, setRemLead] = useState(null);
  const [remForm, setRemForm] = useState({
    title: "",
    desc: "",
    tags: [],
    date: "",
    assignee: "",
  });

  /* ====== Box (guruh) paneli: yangi box qo‘shish ====== */
  const [groupPanel, setGroupPanel] = useState({
    open: false,
    status: "new",
    name: "",
  });

  /* ====== Header kebab (3 nuqta) ====== */
  const [headMenu, setHeadMenu] = useState(false);

  /* ====== Column settings modal ====== */
  const [colPanel, setColPanel] = useState(false);
  const [newColName, setNewColName] = useState("");

  /* ====== Drag & Drop ====== */
  const [draggingId, setDraggingId] = useState(null);
  const onDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "move";
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };
  const onDropToColumn = (e, statusKey) => {
    e.preventDefault();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: statusKey, group: "" } : l))
    );
    setDraggingId(null);
  };
  const onDropToGroup = (e, statusKey, targetGroup) => {
    e.preventDefault();
    e.stopPropagation();
    const id = Number(e.dataTransfer.getData("text/plain"));
    if (!id) return;
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: statusKey, group: targetGroup } : l
      )
    );
    setDraggingId(null);
  };
  const onDragOverGroup = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /* ====== Drawer helperlari ====== */
  const openDrawerAdd = () => {
    setMode("add");
    setEditingId(null);
    setForm({ name: "", phone: "", course: "", source: "", comment: "" });
    setDrawerOpen(true);
  };
  const openDrawerEdit = (lead) => {
    setMode("edit");
    setEditingId(lead.id);
    setForm({
      name: lead.name || "",
      phone: lead.phone || "",
      course: lead.course || "",
      source: lead.source || "",
      comment: lead.comment || "",
    });
    setDrawerOpen(true);
    setMenuOpenId(null);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setMode("add");
    setEditingId(null);
    setForm({ name: "", phone: "", course: "", source: "", comment: "" });
  };
  const onSaveLead = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Ism va telefon majburiy.");
      return;
    }
    if (mode === "add") {
      const newId = leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
      const newLead = {
        id: newId,
        name: form.name.trim(),
        phone: form.phone.trim(),
        course: form.course.trim(),
        source: form.source.trim(),
        comment: form.comment.trim(),
        status: "new",
        createdAt: new Date().toISOString(),
        group: "",
      };
      setLeads((prev) => [newLead, ...prev]);
    } else {
      setLeads((prev) =>
        prev.map((l) =>
          l.id === editingId
            ? {
                ...l,
                name: form.name.trim(),
                phone: form.phone.trim(),
                course: form.course.trim(),
                source: form.source.trim(),
                comment: form.comment.trim(),
              }
            : l
        )
      );
    }
    closeDrawer();
  };

  /* ====== Qidiruv filter ====== */
  const filteredLeads = useMemo(() => {
    const n = search.name.trim().toLowerCase();
    const p = search.phone.trim().toLowerCase();
    const c = search.course;
    const s = search.source;
    const from = search.from ? new Date(search.from) : null;
    const to = search.to ? new Date(search.to) : null;

    return leads.filter((l) => {
      const m1 = !n || (l.name || "").toLowerCase().includes(n);
      const m2 = !p || (l.phone || "").toLowerCase().includes(p);
      const m3 = !c || l.course === c;
      const m4 = !s || l.source === s;
      const created = new Date(l.createdAt);
      const m5 = !from || created >= from;
      const m6 = !to || created <= to;
      return m1 && m2 && m3 && m4 && m5 && m6;
    });
  }, [leads, search]);

  /* ====== Column -> bucket ====== */
  const colBuckets = useMemo(() => {
    const map = Object.fromEntries(columns.map((c) => [c.key, []]));
    filteredLeads.forEach((l) => {
      if (map[l.status]) map[l.status].push(l);
      else map["new"]?.push(l);
    });
    return map;
  }, [filteredLeads, columns]);

  /* ====== Card kebab ====== */
  const onOpenMenu = (id) => setMenuOpenId((cur) => (cur === id ? null : id));
  const onDelete = (id) => {
    const item = leads.find((x) => x.id === id);
    if (!item) return;
    if (window.confirm(`"${item.name}" lidingizni o‘chirishni tasdiqlaysizmi?`)) {
      setLeads((prev) => prev.filter((x) => x.id !== id));
      setMenuOpenId(null);
    }
  };

  /* ====== SMS (single / group) ====== */
  const openSmsForOne = (lead) => {
    setSmsTargets([{ name: lead.name, phone: lead.phone }]);
    setSmsText("");
    setSmsOpen(true);
    setMenuOpenId(null);
  };
  const openSmsForGroup = (statusKey, groupName) => {
    const list = colBuckets[statusKey].filter((l) => (l.group || "") === groupName);
    const targets = list.map((l) => ({ name: l.name, phone: l.phone }));
    if (!targets.length) {
      alert("Bu box ichida kontakt yo‘q.");
      return;
    }
    setSmsTargets(targets);
    setSmsText("");
    setSmsOpen(true);
  };
  const onSendSms = () => {
    setSmsOpen(false);
    setSmsTargets([]);
    setSmsText("");
    alert("SMS yuborildi.");
  };

  /* ====== Comment modal ====== */
  const openCommentFor = (lead) => {
    setCommentLeadId(lead.id);
    setCommentText(lead.comment || "");
    setCommentOpen(true);
    setMenuOpenId(null);
  };
  const saveComment = () => {
    if (commentLeadId == null) return;
    setLeads((prev) =>
      prev.map((l) => (l.id === commentLeadId ? { ...l, comment: commentText } : l))
    );
    setCommentOpen(false);
    setCommentLeadId(null);
    setCommentText("");
  };

  /* ====== Reminder ====== */
  const openReminder = (lead) => {
    setRemLead(lead);
    setRemForm({ title: "", desc: "", tags: [], date: "", assignee: "" });
    setRemOpen(true);
  };
  const createReminder = () => {
    if (!remForm.title || !remForm.date) {
      alert("Title va Date majburiy");
      return;
    }
    setRemOpen(false);
    alert("Reminder created!");
  };

  /* ====== Box panel (yangi) ====== */
  const openGroupPanelFor = (statusKey) =>
    setGroupPanel({ open: true, status: statusKey, name: "" });
  const closeGroupPanel = () =>
    setGroupPanel({ open: false, status: "new", name: "" });
  const saveGroup = (e) => {
    e.preventDefault();
    const raw = groupPanel.name.trim();
    if (!raw) return;
    const exists = (groups[groupPanel.status] || []).some(
      (g) => g.name.toLowerCase() === raw.toLowerCase()
    );
    if (exists) {
      alert("Bu nomli box allaqachon mavjud.");
      return;
    }
    setGroups((prev) => ({
      ...prev,
      [groupPanel.status]: [...(prev[groupPanel.status] || []), { name: raw, locked: false }],
    }));
    closeGroupPanel();
  };

  /* ====== Column settings ====== */
  const openColPanel = () => {
    setColPanel(true);
    setHeadMenu(false);
  };
  const addColumn = (e) => {
    e.preventDefault();
    const name = newColName.trim();
    if (!name) return;
    const key = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setColumns((prev) => [...prev, { key, label: name, locked: false, builtin: false }]);
    setGroups((prev) => ({ ...prev, [key]: [] }));
    setNewColName("");
  };
  const renameColumn = (key, label) =>
    setColumns((prev) => prev.map((c) => (c.key === key ? { ...c, label } : c)));
  const removeColumn = (key) => {
    const col = columns.find((c) => c.key === key);
    if (!col || col.builtin) return;
    if (!window.confirm(`"${col.label}" ustunini o‘chirishni tasdiqlaysizmi?`)) return;
    setLeads((prev) => prev.map((l) => (l.status === key ? { ...l, status: "new" } : l)));
    setColumns((prev) => prev.filter((c) => c.key !== key));
    setGroups((prev) => {
      const cp = { ...prev };
      delete cp[key];
      return cp;
    });
  };
  const toggleColLock = (key) =>
    setColumns((prev) =>
      prev.map((c) => (c.key === key ? { ...c, locked: !c.locked } : c))
    );

  /* ====== Box (group) util ====== */
  const toggleBoxLock = (statusKey, groupName) => {
    setGroups((prev) => ({
      ...prev,
      [statusKey]: (prev[statusKey] || []).map((g) =>
        g.name === groupName ? { ...g, locked: !g.locked } : g
      ),
    }));
  };
  const renameBox = (statusKey, groupName) => {
    const newName = prompt("Yangi nom:", groupName);
    if (!newName || newName.trim() === groupName) return;
    const nn = newName.trim();
    setGroups((prev) => ({
      ...prev,
      [statusKey]: (prev[statusKey] || []).map((g) =>
        g.name === groupName ? { ...g, name: nn } : g
      ),
    }));
    setLeads((prev) =>
      prev.map((l) => (l.status === statusKey && l.group === groupName ? { ...l, group: nn } : l))
    );
  };
  const deleteBox = (statusKey, groupName) => {
    if (!window.confirm(`"${groupName}" boxini o‘chirishni tasdiqlaysizmi?`)) return;
    setGroups((prev) => ({
      ...prev,
      [statusKey]: (prev[statusKey] || []).filter((g) => g.name !== groupName),
    }));
    setLeads((prev) =>
      prev.map((l) => (l.status === statusKey && l.group === groupName ? { ...l, group: "" } : l))
    );
  };

  /* ====== Box kebab menyu holati ====== */
  const [boxMenuKey, setBoxMenuKey] = useState(null); // `${status}|${groupName}`
  const toggleBoxMenu = (statusKey, groupName) => {
    const key = `${statusKey}|${groupName}`;
    setBoxMenuKey((cur) => (cur === key ? null : key));
  };

  /* ====== Faqat birinchi ustunda inline qo‘shish ====== */
  const [inlineAddOpen, setInlineAddOpen] = useState(false);
  const [inlineForm, setInlineForm] = useState({
    name: "",
    phone: "",
    source: "",
    targetStatus: "new",
    comment: "",
  });
  const submitInlineAdd = (e) => {
    e.preventDefault();
    const { name, phone, source, targetStatus, comment } = inlineForm;
    if (!name.trim() || !phone.trim()) {
      alert("Ism va raqam majburiy.");
      return;
    }
    const newId = leads.length ? Math.max(...leads.map((l) => l.id)) + 1 : 1;
    const newLead = {
      id: newId,
      name: name.trim(),
      phone: phone.trim(),
      course: "",
      source: source.trim(),
      comment: comment.trim(),
      status: targetStatus,
      createdAt: new Date().toISOString(),
      group: "",
    };
    setLeads((prev) => [newLead, ...prev]);
    setInlineForm({ name: "", phone: "", source: "", targetStatus: "new", comment: "" });
    setInlineAddOpen(false);
  };

  /* ====== Group renderer ====== */
  const renderGroupBox = (statusKey, boxObj, isColLocked) => {
    const groupName = boxObj?.name || "";
    const boxLocked = !!boxObj?.locked;
    const list = colBuckets[statusKey].filter((l) => (l.group || "") === groupName);
    const isLocked = isColLocked || boxLocked;
    const boxKey = `${statusKey}|${groupName || "_ungrouped"}`;

    return (
      <div
        key={boxKey}
        className={`al-group ${!groupName ? "ungrouped" : ""} ${isLocked ? "locked" : ""}`}
        onDragOver={groupName ? onDragOverGroup : onDragOver}
        onDrop={(e) =>
          isLocked
            ? null
            : groupName
            ? onDropToGroup(e, statusKey, groupName)
            : onDropToColumn(e, statusKey)
        }
        aria-hidden={isLocked ? "true" : "false"}
      >
        <div className={`al-group-head ${groupName ? "" : "subtle"}`}>
          <div className="al-group-left">
            <span className="al-group-title">{groupName || "Boshqa"}</span>
            <span className="al-group-count">{list.length}</span>
          </div>

          <div className="al-group-right">
            {groupName ? (
              <>
                <button
                  className="al-col-lock"
                  title={boxLocked ? "Unlock box" : "Lock box"}
                  onClick={() => toggleBoxLock(statusKey, groupName)}
                >
                  {boxLocked ? <FaLock /> : <FaLockOpen />}
                </button>

                <div className="al-kebab-wrap">
                  <button
                    className="al-col-kebab"
                    onClick={() => toggleBoxMenu(statusKey, groupName)}
                    aria-label="Box actions"
                  >
                    <FaEllipsisV />
                  </button>
                  {boxMenuKey === `${statusKey}|${groupName}` && (
                    <div
                      className="al-head-menu al-box-menu"
                      onMouseLeave={() => setBoxMenuKey(null)}
                    >
                      <button onClick={() => { setBoxMenuKey(null); renameBox(statusKey, groupName); }}>
                        <FaEdit /> Tahrirlash
                      </button>
                      <button
                        onClick={() => {
                          setBoxMenuKey(null);
                          openSmsForGroup(statusKey, groupName);
                        }}
                      >
                        <FaSms /> SMS (box ichidagilar)
                      </button>
                      <button
                        className="danger"
                        onClick={() => {
                          setBoxMenuKey(null);
                          deleteBox(statusKey, groupName);
                        }}
                      >
                        <FaTrash /> O‘chirish
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className={`al-group-body ${isLocked ? "locked" : ""}`}>
          {isLocked ? (
            <div className="al-locked-msg">Qulflangan</div>
          ) : list.length === 0 ? (
            <div className="al-empty small">Bu yerga tashlang</div>
          ) : (
            list.map((l) => renderCard(l))
          )}
        </div>
      </div>
    );
  };

  const renderCard = (l) => {
    const initial = (l.name || "?").trim().charAt(0).toUpperCase();
    return (
      <div
        key={l.id}
        className={`al-card compact ${draggingId === l.id ? "dragging" : ""}`}
        draggable
        onDragStart={(e) => onDragStart(e, l.id)}
        onDragEnd={() => setDraggingId(null)}
      >
        <div className="al-card-left">
          <div className="al-avatar" aria-hidden="true">{initial}</div>
          <div className="al-card-main">
            <div className="al-card-name">{l.name}</div>
            <div className="al-card-phone">{l.phone}</div>
          </div>
        </div>

        <div className="al-card-right">
          <div className="al-ico-wrap">
            <button className="al-ico" onClick={(e) => openInfo(e, l)} aria-label="Info">
  <FaInfoCircle />
</button>

         {infoPop.open && infoPop.lead && (
  <div
    className="al-popover"
    style={{ position: "fixed", top: infoPop.y, left: infoPop.x }}
    onClick={(e) => e.stopPropagation()}
  >
    <div className="al-pop-title">{infoPop.lead.name}</div>
    <div className="al-pop-row">
      <span className="t">Phone</span>
      <span className="v">{infoPop.lead.phone}</span>
    </div>
    <div className="al-pop-row">
      <span className="t">Comment</span>
      <span className="v">{infoPop.lead.comment || "—"}</span>
    </div>
    <div className="al-pop-row">
      <span className="t">Updated</span>
      <span className="v">{formatDateTime(infoPop.lead.createdAt).slice(0,10)}</span>
    </div>
    <div className="al-pop-row">
      <span className="t">Lead ID</span>
      <span className="v">{infoPop.lead.id}</span>
    </div>
  </div>
)}

          </div>

          <button
            className="al-ico"
            title="Create reminder"
            onClick={(e) => { e.stopPropagation(); openReminder(l); }}
          >
            <FaClock />
          </button>

          <span className="al-time">{formatDateTime(l.createdAt)}</span>

          <div className="al-kebab-wrap">
            <button className="al-kebab" onClick={() => onOpenMenu(l.id)} aria-label="More">
              <FaEllipsisV />
            </button>
            {menuOpenId === l.id && (
              <div className="al-menu al-menu-big" onMouseLeave={() => setMenuOpenId(null)}>
                <button onClick={() => openDrawerEdit(l)}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => openSmsForOne(l)}>
                  <FaSms /> SMS
                </button>
                <button onClick={() => openCommentFor(l)}>
                  💬 Comment
                </button>
                <a
                  className="al-menu-link"
                  href={`tel:${cleanTel(l.phone)}`}
                  onClick={() => setMenuOpenId(null)}
                >
                  <FaPhone /> Call
                </a>
                <button className="danger" onClick={() => onDelete(l.id)}>
                  <FaTrash /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  /* ====== JSX ====== */
  return (
    <div className="active-leads">
      {/* ===== Header ===== */}
      <div className="al-head">
        <h1 className="al-title">Faol lidlar</h1>

        <div className="al-head-actions">
          <button className="al-add-btn" onClick={openDrawerAdd}>
            <FaPlus />
            <span>Lid qo‘shish</span>
          </button>

          <div className="al-kebab-wrap">
            <button
              className="al-head-kebab"
              onClick={() => setHeadMenu((v) => !v)}
              aria-label="More"
            >
              <FaEllipsisV />
            </button>
            {headMenu && (
              <>
                <div className="al-overlay" onClick={() => setHeadMenu(false)} />
                <div className="al-head-menu" onMouseLeave={() => setHeadMenu(false)}>
                  <button onClick={() => alert("Archive leads")}>Archive leads</button>
                  <button onClick={() => alert("Import leads")}>Import leads</button>
                  <button onClick={() => alert("Export leads")}>Export leads</button>
                  <button onClick={openColPanel}>Column settings</button>
                  <button onClick={() => alert("Tags")}>Tags</button>
                  <button onClick={() => alert("Forms")}>Forms</button>
                  <button onClick={() => alert("Reasons for removal")}>
                    Reasons for removal
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ===== Search (kengaytirilgan) ===== */}
      <div className="al-search">
        <input
          type="text"
          placeholder="Search by name or phone"
          value={search.name}
          onChange={(e) => setSearch((p) => ({ ...p, name: e.target.value }))}
        />
        {/* <div className="select-wrap">
          <select
            value={search.section}
            onChange={(e) => setSearch((p) => ({ ...p, section: e.target.value }))}
          >
            <option value="">Section</option>
            {SECTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div> */}
        <div className="select-wrap">
          <select
            value={search.course}
            onChange={(e) => setSearch((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">By courses</option>
            {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="select-wrap">
          <select
            value={search.tag}
            onChange={(e) => setSearch((p) => ({ ...p, tag: e.target.value }))}
          >
            <option value="">Tags</option>
            {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className="select-wrap">
          <select
            value={search.source}
            onChange={(e) => setSearch((p) => ({ ...p, source: e.target.value }))}
          >
            <option value="">Leads Sources</option>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="select-wrap">
          <select
            value={search.staff}
            onChange={(e) => setSearch((p) => ({ ...p, staff: e.target.value }))}
          >
            <option value="">By staff</option>
            {STAFF.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        {/* <input
          type="date"
          value={search.from}
          onChange={(e) => setSearch((p) => ({ ...p, from: e.target.value }))}
          placeholder="Date from"
        />
        <input
          type="date"
          value={search.to}
          onChange={(e) => setSearch((p) => ({ ...p, to: e.target.value }))}
          placeholder="Date to"
        /> */}
        <button className="al-reset" title="Reset filters" onClick={resetSearch}>
          <FaSyncAlt />
        </button>
      </div>

      {/* ===== Ustunlar (gorizontal scroll) ===== */}
      <div className={`al-columns ${draggingId ? "dragging" : ""}`}>
        {columns.map((col, idx) => {
          const colGroups = groups[col.key] || [];
          const totalCount = colBuckets[col.key]?.length || 0;
          const isFirst = idx === 0;

          const ungroupedList = colBuckets[col.key].filter((l) => !(l.group || "").trim());

          return (
            <div
              key={col.key}
              className="al-col"
              onDragOver={onDragOver}
              onDrop={(e) => (!col.locked ? onDropToColumn(e, col.key) : null)}
            >
              <div className="al-col-head">
                <div className="left">
                  <span className="al-col-title">{col.label}</span>
                  <span className="al-col-count">{totalCount}</span>
                </div>
                <div className="right">
                  <button
                    className="al-col-lock"
                    title={col.locked ? "Unlock" : "Lock"}
                    onClick={() => toggleColLock(col.key)}
                  >
                    {col.locked ? <FaLock /> : <FaLockOpen />}
                  </button>
                  <button
                    className="al-col-plus"
                    title="Guruh (box) qo‘shish"
                    onClick={() => openGroupPanelFor(col.key)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Faqat 1-ustunda inline qo‘shish */}
              {isFirst && (
                <div className="al-inline-add">
                  <button
                    className={`al-inline-toggle ${inlineAddOpen ? "open" : ""}`}
                    onClick={() => setInlineAddOpen((v) => !v)}
                    title="Lid qo‘shish"
                  >
                    <FaUserPlus />
                  </button>

                  {inlineAddOpen && (
                    <form className="al-inline-form" onSubmit={submitInlineAdd}>
                      <div className="row">
                        <input
                          type="text"
                          placeholder="Ism *"
                          value={inlineForm.name}
                          onChange={(e) =>
                            setInlineForm((p) => ({ ...p, name: e.target.value }))
                          }
                        />
                        <input
                          type="tel"
                          maxLength={19}
                          placeholder="+998 XX XXX XX XX *"
                          value={inlineForm.phone}
                          onChange={(e) =>
                            setInlineForm((p) => ({ ...p, phone: formatUzPhone(e.target.value) }))
                          }
                        />
                      </div>
                      <div className="row">
                        <select
                          value={inlineForm.source}
                          onChange={(e) =>
                            setInlineForm((p) => ({ ...p, source: e.target.value }))
                          }
                        >
                          <option value="">Manba</option>
                          {SOURCES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                        <select
                          value={inlineForm.targetStatus}
                          onChange={(e) =>
                            setInlineForm((p) => ({ ...p, targetStatus: e.target.value }))
                          }
                        >
                          {columns.map((c) => (
                            <option key={c.key} value={c.key}>
                              {c.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Comment"
                        value={inlineForm.comment}
                        onChange={(e) =>
                          setInlineForm((p) => ({ ...p, comment: e.target.value }))
                        }
                      />
                      <button type="submit" className="al-save">Qo‘shish</button>
                    </form>
                  )}
                </div>
              )}

              <div className="al-col-body">
                {/* Agar boxlar yo‘q bo‘lsa – shunchaki lidlar ro‘yxati */}
                {colGroups.length === 0 ? (
                  ungroupedList.length ? (
                    ungroupedList.map((l) => renderCard(l))
                  ) : (
                    <div className="al-empty small">Bu yerga tashlang</div>
                  )
                ) : (
                  <>
                    {colGroups.map((g) => renderGroupBox(col.key, g, col.locked))}
                    {renderGroupBox(col.key, { name: "", locked: false }, col.locked)}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== Lead Drawer ===== */}
      {drawerOpen && <div className="al-overlay" onClick={closeDrawer} />}
      <aside className={`al-drawer ${drawerOpen ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="al-drawer-head">
          <h2>{mode === "add" ? "Yangi lid qo‘shish" : "Lidni tahrirlash"}</h2>
          <button className="al-close" onClick={closeDrawer}>
            <FaTimes />
          </button>
        </div>
        <form className="al-form" onSubmit={onSaveLead} onClick={(e) => e.stopPropagation()}>
          <label>
            Ism <span className="req">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="Masalan: Akmal Qodirov"
          />

          <label>
            Raqam <span className="req">*</span>
          </label>
          <input
            type="tel"
            maxLength={19}
            value={form.phone}
            onChange={(e) =>
              setForm((p) => ({ ...p, phone: formatUzPhone(e.target.value) }))
            }
            placeholder="+998 XX XXX XX XX"
          />

          <label>Kurs</label>
          <select
            value={form.course}
            onChange={(e) => setForm((p) => ({ ...p, course: e.target.value }))}
          >
            <option value="">Tanlang</option>
            {COURSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <label>Qayerdan bilib kelgani</label>
          <select
            value={form.source}
            onChange={(e) => setForm((p) => ({ ...p, source: e.target.value }))}
          >
            <option value="">Tanlang</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <label>Comment</label>
          <textarea
            rows={4}
            value={form.comment}
            onChange={(e) => setForm((p) => ({ ...p, comment: e.target.value }))}
            placeholder="Qisqacha izoh..."
          />
          <button type="submit" className="al-save">
            {mode === "add" ? "Saqlash" : "O‘zgartirishni saqlash"}
          </button>
        </form>
      </aside>

      {/* ===== Group Drawer (yangi box) ===== */}
      {groupPanel.open && <div className="al-overlay" onClick={closeGroupPanel} />}
      <aside className={`al-drawer ${groupPanel.open ? "show" : ""}`} role="dialog" aria-modal="true">
        <div className="al-drawer-head">
          <h2>Guruh (box) qo‘shish</h2>
          <button className="al-close" onClick={closeGroupPanel}>
            <FaTimes />
          </button>
        </div>
        <form className="al-form" onSubmit={saveGroup} onClick={(e) => e.stopPropagation()}>
          <label>
            Nom <span className="req">*</span>
          </label>
          <input
            type="text"
            value={groupPanel.name}
            onChange={(e) => setGroupPanel((p) => ({ ...p, name: e.target.value }))}
            placeholder="Masalan: Sentabr"
          />
          <button type="submit" className="al-save">
            Saqlash
          </button>
        </form>
      </aside>

      {/* ===== Column settings modal ===== */}
      {colPanel && <div className="al-overlay" onClick={() => setColPanel(false)} />}
      <div className={`al-colpanel ${colPanel ? "show" : ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="al-colpanel-head">
          <h3>Column settings</h3>
          <button className="al-close" onClick={() => setColPanel(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="al-colpanel-body">
          {columns.map((c) => (
            <div key={c.key} className="al-colrow">
              <input
                className="al-colrow-input"
                value={c.label}
                onChange={(e) => renameColumn(c.key, e.target.value)}
                disabled={c.builtin}
              />
              <div className="al-colrow-actions">
                <button
                  className="al-colrow-lock"
                  title={c.locked ? "Unlock" : "Lock"}
                  onClick={() => toggleColLock(c.key)}
                >
                  {c.locked ? <FaLock /> : <FaLockOpen />}
                </button>
                {!c.builtin && (
                  <button className="al-colrow-del" onClick={() => removeColumn(c.key)}>
                    <FaTrash />
                  </button>
                )}
              </div>
            </div>
          ))}

          <form className="al-coladd" onSubmit={addColumn}>
            <input
              type="text"
              placeholder="Ustun nomi (masalan: On hold)"
              value={newColName}
              onChange={(e) => setNewColName(e.target.value)}
            />
            <button type="submit" className="al-save">
              Ustun qo‘shish
            </button>
          </form>
        </div>
      </div>

      {/* ===== SMS modal ===== */}
      {smsOpen && (
        <div className="al-overlay" onClick={() => setSmsOpen(false)}>
          <div className="al-sms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-sms-head">
              <h3>SMS yuborish</h3>
              <button className="al-close" onClick={() => setSmsOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="al-sms-body">
              <div className="al-sms-to">
                Qabul qiluvchilar: <strong>{smsTargets.length}</strong> ta
              </div>
              <textarea
                rows={5}
                maxLength={400}
                value={smsText}
                onChange={(e) => setSmsText(e.target.value)}
                placeholder="Matn..."
              />
              <div className="al-sms-meta">Belgilar: {smsText.length} / 400</div>
            </div>
            <div className="al-sms-foot">
              <button className="al-btn-ghost" onClick={() => setSmsOpen(false)}>
                Bekor qilish
              </button>
              <button className="al-add-btn" disabled={!smsText.trim()} onClick={onSendSms}>
                Yuborish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Comment modal ===== */}
      {commentOpen && (
        <div className="al-overlay" onClick={() => setCommentOpen(false)}>
          <div className="al-sms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-sms-head">
              <h3>Comment</h3>
              <button className="al-close" onClick={() => setCommentOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="al-sms-body">
              <textarea
                rows={5}
                maxLength={400}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Izoh..."
              />
              <div className="al-sms-meta">Belgilar: {commentText.length} / 400</div>
            </div>
            <div className="al-sms-foot">
              <button className="al-btn-ghost" onClick={() => setCommentOpen(false)}>
                Bekor qilish
              </button>
              <button className="al-add-btn" onClick={saveComment}>
                Saqlash
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Reminder modal ===== */}
      {remOpen && (
        <div className="al-overlay" onClick={() => setRemOpen(false)}>
          <div className="al-sms-modal" onClick={(e) => e.stopPropagation()}>
            <div className="al-sms-head">
              <h3>Create reminder</h3>
              <button className="al-close" onClick={() => setRemOpen(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="al-sms-body">
              <label>Title *</label>
              <input
                type="text"
                value={remForm.title}
                onChange={(e) => setRemForm((p) => ({ ...p, title: e.target.value }))}
              />
              <label>Description</label>
              <textarea
                rows={4}
                maxLength={255}
                value={remForm.desc}
                onChange={(e) => setRemForm((p) => ({ ...p, desc: e.target.value }))}
              />
              <label>Lead</label>
              <input type="text" value={remLead?.name || ""} disabled />
              <label>Date & time *</label>
              <input
                type="datetime-local"
                value={remForm.date}
                onChange={(e) => setRemForm((p) => ({ ...p, date: e.target.value }))}
              />
              <label>Assignee</label>
              <select
                value={remForm.assignee}
                onChange={(e) => setRemForm((p) => ({ ...p, assignee: e.target.value }))}
              >
                <option value="">Select assignee</option>
                {STAFF.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="al-sms-foot">
              <button className="al-btn-ghost" onClick={() => setRemOpen(false)}>
                Reset
              </button>
              <button className="al-add-btn" onClick={createReminder}>
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
