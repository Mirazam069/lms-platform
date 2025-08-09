import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";
import videoLms from "../assets/video-lms.mp4"

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const redirectPath = await login(username, password);

    if (redirectPath) {
      navigate(redirectPath);
    } else {
      setError("Login yoki parol noto‘g‘ri!");
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      {/* 🔥 VIDEO background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      >
        <source src={videoLms} type="video/mp4" className={"width: 300px"} />
        Sizning brauzeringiz video formatini qo‘llab-quvvatlamaydi.
      </video>

      <div className="login-wrapper">
        <div className="login-container">
          <h2>Tizimga kirish</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Telefon raqam yoki username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Kirish..." : "Kirish"}
            </button>

            {error && <p className="login-error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
