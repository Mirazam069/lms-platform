import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DirectorDashboard from "./pages/DirectorDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { AuthProvider, useAuth } from "./context/AuthContext";

import { TranslationProvider } from "./context/TranslationContext";

function PrivateRoute({ children, role }) {
  const { user } = useAuth();
  return user && user.role === role ? children : <Navigate to="/" />;
}

function App() {
  return (
    <AuthProvider>
       <TranslationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Har bir dashboard o'z ichki yo‘llarini o‘zi boshqaradi */}
          <Route
            path="/director/*"
            element={
              <PrivateRoute role="director">
                <DirectorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/teacher/*"
            element={
              <PrivateRoute role="teacher">
                <TeacherDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/*"
            element={
              <PrivateRoute role="student">
                <StudentDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
        </TranslationProvider>
    </AuthProvider>
  );
}

export default App;
