import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import DataBuku from "./pages/DataBuku";
import DataGenre from "./pages/DataGenre";
import EditGenre from "./pages/EditGenre";
import Peminjaman from "./pages/Peminjaman";
import Pengembalian from "./pages/Pengembalian";

function App() {

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("libraryUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });


  // =================================
  // LOGIN
  // =================================

  const handleLogin = (userData) => {

    localStorage.setItem(
      "libraryUser",
      JSON.stringify(userData)
    );

    setUser(userData);

  };


  // =================================
  // LOGOUT
  // =================================

  const handleLogout = () => {

    localStorage.removeItem(
      "libraryUser"
    );

    setUser(null);

  };


  // =================================
  // BELUM LOGIN
  // =================================

  if (!user) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  // =================================
  // SUDAH LOGIN
  // =================================

  return (

    <Routes>

      {/* ROOT */}

      <Route
        path="/"
        element={
          <Navigate
            to="/dashboard"
            replace
          />
        }
      />


      {/* LAYOUT */}

      <Route
        element={
          <Layout
            onLogout={handleLogout}
          />
        }
      >

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* DATA BUKU */}

        <Route
          path="/data-buku"
          element={<DataBuku />}
        />


        {/* DATA GENRE */}

        <Route
          path="/data-genre"
          element={<DataGenre />}
        />


        {/* EDIT GENRE */}

        <Route
          path="/edit-genre/:genre"
          element={<EditGenre />}
        />


        {/* PEMINJAMAN */}

        <Route
          path="/peminjaman"
          element={<Peminjaman />}
        />


        {/* PENGEMBALIAN */}

        <Route
          path="/pengembalian"
          element={<Pengembalian />}
        />

      </Route>

    </Routes>

  );
}

export default App;