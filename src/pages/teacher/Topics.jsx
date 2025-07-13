// src/pages/teacher/Topics.jsx
import React, { useState } from "react";
import "./Topics.css";

const Topics = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: "React Hooks", module: "Frontend", date: "2025-07-01" },
    { id: 2, title: "API Integration", module: "Frontend", date: "2025-07-02" },
    { id: 3, title: "Authentication", module: "Backend", date: "2025-07-03" },
  ]);

  const [newTopic, setNewTopic] = useState({ title: "", module: "", date: "" });

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (newTopic.title && newTopic.module && newTopic.date) {
      const newEntry = {
        id: topics.length + 1,
        ...newTopic,
      };
      setTopics([...topics, newEntry]);
      setNewTopic({ title: "", module: "", date: "" });
    }
  };

  return (
     <div className="topics-wrapper">
      <h1 className="topics-title">Mavzular</h1>

      <form onSubmit={handleAddTopic} className="topics-form">
        <input
          type="text"
          placeholder="Mavzu nomi"
          value={newTopic.title}
          onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Modul nomi"
          value={newTopic.module}
          onChange={(e) => setNewTopic({ ...newTopic, module: e.target.value })}
          required
        />
        <input
          type="date"
          value={newTopic.date}
          onChange={(e) => setNewTopic({ ...newTopic, date: e.target.value })}
          required
        />
        <button type="submit">Qo‘shish</button>
      </form>

      <table className="topics-table">
        <thead>
          <tr>
            <th>Mavzu</th>
            <th>Modul</th>
            <th>Sana</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <tr key={topic.id}>
              <td>{topic.title}</td>
              <td>{topic.module}</td>
              <td>{topic.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>
  );
};

export default Topics;
