import React, { useEffect, useState } from "react";
import "./Courses.css";
import { FaBookOpen, FaTrash } from "react-icons/fa";
import { getCourses, addCourse, deleteCourse } from "../../api/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ name: "", duration: "" });
  const [loading, setLoading] = useState(true);

  // 📌 Sahifa ochilganda kurslarni olish
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.warn("Token topilmadi. Login qiling.");
          setLoading(false);
          return;
        }

        const data = await getCourses();
        console.log("✅ Kurslar yuklandi:", data);
        setCourses(data);
      } catch (err) {
        console.error("❌ Kurslarni olishda xatolik:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      console.log("📤 Yuborilayotgan kurs:", newCourse);
      const added = await addCourse(newCourse);
      console.log("✅ Qo‘shilgan kurs:", added);
      setCourses([...courses, added]);
      setNewCourse({ name: "", duration: "" });
    } catch (err) {
      console.error("❌ Kurs qo‘shishda xatolik:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      console.error("❌ Kursni o‘chirishda xatolik:", err.response?.data || err.message);
    }
  };

  if (loading) return <p>Kurslar yuklanmoqda...</p>;

  return (
    <div className="courses-container">
      <h1 className="courses-title">Kurslar</h1>

      <form className="course-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Kurs nomi"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Davomiyligi"
          value={newCourse.duration}
          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
          required
        />
        <button type="submit">Qo‘shish</button>
      </form>

      <div className="courses-grid">
        {courses.map((course) => (
          <div className="course-card" key={course.id}>
            <FaBookOpen className="course-icon" />
            <div>
              <h3>{course.name}</h3>
              <p>Davomiyligi: {course.duration || "Noma’lum"}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(course.id)}>
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
