import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ContactDetails from "./pages/ContactDetails";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!token ? <Register /> : <Navigate to="/" />}
        />

        {/* Protected routes */}
        <Route
          path="/"
          element={token ? <Dashboard token={token} /> : <Navigate to="/login" />}
        />
        <Route
          path="/contact/:id"
          element={
            token ? <ContactDetails token={token} /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}