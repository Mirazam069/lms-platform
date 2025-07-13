import React, { useState } from "react";
import "./Topics.css";
import { FaListUl } from "react-icons/fa";

const Topics = () => {
  const [topics, setTopics] = useState([
    { id: 1, title: "HTML asoslari", module: "Frontend", lessons: 5 },
    { id: 2, title: "JS funksiyalar", module: "Frontend", lessons: 8 },
    { id: 3, title: "Django Views", module: "Backend", lessons: 4 },
    { id: 4, title: "SQL Query", module: "Database", lessons: 6 },
  ]);

  const [newTopic, setNewTopic] = useState({ title: "", module: "", lessons: "" });

  const handleAddTopic = (e) => {
    e.preventDefault();
    const id = topics.length + 1;
    setTopics([...topics, { id, ...newTopic }]);
    setNewTopic({ title: "", module: "", lessons: "" });
  };

  return (
    <div className="topics-container">
      <h1 className="topics-title">Mavzular ro'yxati</h1>

      <form className="add-topic-form" onSubmit={handleAddTopic}>
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
          type="number"
          placeholder="Darslar soni"
          value={newTopic.lessons}
          onChange={(e) => setNewTopic({ ...newTopic, lessons: e.target.value })}
          required
        />
        <button type="submit">+ Qo'shish</button>
      </form>

      <div className="topics-grid">
        {topics.map((topic) => (
          <div key={topic.id} className="topic-card">
            <FaListUl className="topic-icon" />
            <div>
              <p className="topic-title">{topic.title}</p>
              <p><strong>Modul:</strong> {topic.module}</p>
              <p><strong>Darslar:</strong> {topic.lessons}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;
