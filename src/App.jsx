import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import "./App.css";

// ================================
// CONTEXT
// ================================
import { BookProvider } from "./context/BookContext";

// ================================
// LAYOUT ADMIN
// ================================
import Layout from "./components/Layout";

// ================================
// HALAMAN ADMIN
// ================================
import Dashboard from "./pages/Dashboard";
import DataBuku from "./pages/DataBuku";
import DataGenre from "./pages/DataGenre";
import EditGenre from "./pages/EditGenre";
import Peminjaman from "./pages/Peminjaman";
import Pengembalian from "./pages/Pengembalian";

// ================================
// LAYOUT PEGAWAI
// ================================
import PegawaiLayout from "./components/PegawaiLayout";

// ================================
// HALAMAN PEGAWAI
// ================================
import PegawaiDashboard from "./pages/PegawaiDashboard";
import DataPegawai from "./pages/DataPegawai";
import PeminjamanPegawai from "./pages/PeminjamanPegawai";
import PengembalianPegawai from "./pages/PengembalianPegawai";


function App() {

  // ================================
  // USER LOGIN
  // ================================

  const [user, setUser] = useState(() => {

    const savedUser =
      localStorage.getItem("libraryUser");

    try {

      return savedUser
        ? JSON.parse(savedUser)
        : null;

    } catch {

      localStorage.removeItem("libraryUser");

      return null;

    }

  });


  // ================================
  // LOGIN
  // ================================

  const handleLogin = (userData) => {

    localStorage.setItem(
      "libraryUser",
      JSON.stringify(userData)
    );

    setUser(userData);

  };


  // ================================
  // LOGOUT
  // ================================

  const handleLogout = () => {

    localStorage.removeItem("libraryUser");

    setUser(null);

  };


  // ================================
  // BELUM LOGIN
  // ================================

  if (!user) {

    return (
      <Login
        onLogin={handleLogin}
      />
    );

  }


  // ================================
  // ROUTING
  // ================================

  return (

    <BookProvider>

      <Routes>

        {/* =================================
            ROOT
        ================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to={
                user.role === "admin"
                  ? "/dashboard"
                  : "/pegawai/dashboard"
              }
              replace
            />
          }
        />


        {/* =================================
            ================= ADMIN ==========
            =================================
        */}

        <Route
          element={
            <Layout
              user={user}
              onLogout={handleLogout}
            />
          }
        >

          {/* ================================
              DASHBOARD ADMIN
          ================================= */}

          <Route
            path="/dashboard"
            element={
              user.role === "admin" ? (
                <Dashboard />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              DATA BUKU ADMIN
          ================================= */}

          <Route
            path="/data-buku"
            element={
              user.role === "admin" ? (
                <DataBuku />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              DATA GENRE ADMIN
          ================================= */}

          <Route
            path="/data-genre"
            element={
              user.role === "admin" ? (
                <DataGenre />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              EDIT GENRE ADMIN
          ================================= */}

          <Route
            path="/edit-genre/:genre"
            element={
              user.role === "admin" ? (
                <EditGenre />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              PEMINJAMAN ADMIN
          ================================= */}

          <Route
            path="/peminjaman"
            element={
              user.role === "admin" ? (
                <Peminjaman />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              PENGEMBALIAN ADMIN
          ================================= */}

          <Route
            path="/pengembalian"
            element={
              user.role === "admin" ? (
                <Pengembalian />
              ) : (
                <Navigate
                  to="/pegawai/dashboard"
                  replace
                />
              )
            }
          />

        </Route>


        {/* =================================
            ================= PEGAWAI ========
            =================================
        */}

        <Route
          element={
            <PegawaiLayout
              user={user}
              onLogout={handleLogout}
            />
          }
        >

          {/* ================================
              DASHBOARD PEGAWAI
          ================================= */}

          <Route
            path="/pegawai/dashboard"
            element={
              user.role === "pegawai" ? (
                <PegawaiDashboard />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              DATA BUKU PEGAWAI

              MENGGUNAKAN DataBuku YANG SAMA
              DENGAN ADMIN

              Jadi:
              Admin tambah buku
                    ↓
              BookContext
                    ↓
              Data Buku Pegawai

              Data otomatis sama.
          ================================= */}

          <Route
            path="/pegawai/data-buku"
            element={
              user.role === "pegawai" ? (
                <DataBuku />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              DATA PEGAWAI
          ================================= */}

          <Route
            path="/pegawai/data-pegawai"
            element={
              user.role === "pegawai" ? (
                <DataPegawai />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              PEMINJAMAN PEGAWAI
          ================================= */}

          <Route
            path="/pegawai/peminjaman"
            element={
              user.role === "pegawai" ? (
                <PeminjamanPegawai />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />


          {/* ================================
              PENGEMBALIAN PEGAWAI
          ================================= */}

          <Route
            path="/pegawai/pengembalian"
            element={
              user.role === "pegawai" ? (
                <PengembalianPegawai />
              ) : (
                <Navigate
                  to="/dashboard"
                  replace
                />
              )
            }
          />

        </Route>


        {/* =================================
            UNKNOWN ROUTE
        ================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to={
                user.role === "admin"
                  ? "/dashboard"
                  : "/pegawai/dashboard"
              }
              replace
            />
          }
        />

      </Routes>

    </BookProvider>

  );

}


export default App;