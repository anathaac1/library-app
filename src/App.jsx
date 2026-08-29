import { useState } from "react";
import Login from "./pages/Login";
import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("libraryUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  // LOGIN
  const handleLogin = (userData) => {
    setUser(userData);
  };

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("libraryUser");
    setUser(null);
  };

  // BELUM LOGIN
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // DASHBOARD SEMENTARA
  return (
    <div className="dashboard-placeholder">

      <h1>
        {user.role === "admin"
          ? "Admin Dashboard"
          : "Pegawai Dashboard"}
      </h1>

      <p>
        Welcome, <strong>{user.username}</strong>
      </p>

      <p>
        Role: <strong>{user.role}</strong>
      </p>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default App;