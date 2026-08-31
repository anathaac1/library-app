import {
  House,
  BookOpen,
  Tags,
  BookMarked,
  Undo2,
  LogOut,
  UserCircle
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ sidebarOpen }) {

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>

      {/* LOGO */}
      <div className="sidebar-logo">

        <div className="logo-icon">
          <BookOpen size={22} />
        </div>

        {sidebarOpen && (
          <div className="logo-text">
            <h2>SISPER</h2>
          </div>
        )}

      </div>


      {/* MENU */}
      <div className="sidebar-menu">

        {sidebarOpen && (
          <p className="menu-title">
            MENU UTAMA
          </p>
        )}


        {/* DASHBOARD */}
        <div
          className={`menu-item ${
            location.pathname === "/dashboard"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/dashboard")}
        >
          <House size={19} />

          {sidebarOpen && (
            <span>Dashboard</span>
          )}
        </div>


        {/* DATA BUKU */}
        <div
          className={`menu-item ${
            location.pathname === "/data-buku"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/data-buku")}
        >
          <BookOpen size={19} />

          {sidebarOpen && (
            <span>Data Buku</span>
          )}
        </div>


        {/* DATA GENRE */}
        <div
          className={`menu-item ${
            location.pathname === "/data-genre"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/data-genre")}
        >
          <Tags size={19} />

          {sidebarOpen && (
            <span>Data Genre</span>
          )}
        </div>


        {/* PEMINJAMAN */}
        <div
          className={`menu-item ${
            location.pathname === "/peminjaman"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/peminjaman")}
        >
          <BookMarked size={19} />

          {sidebarOpen && (
            <span>Peminjaman</span>
          )}
        </div>


        {/* PENGEMBALIAN */}
        <div
          className={`menu-item ${
            location.pathname === "/pengembalian"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/pengembalian")}
        >
          <Undo2 size={19} />

          {sidebarOpen && (
            <span>Pengembalian</span>
          )}
        </div>

      </div>


      {/* BOTTOM */}
      <div className="sidebar-bottom">

        {/* ADMIN */}
        <div className="admin-box">

          <div className="admin-avatar">
            <UserCircle size={20} />
          </div>

          {sidebarOpen && (
            <div>
              <strong>Admin</strong>
              <small>Administrator</small>
            </div>
          )}

        </div>


        <button
  className="logout"
  onClick={() => {
    const yakin = window.confirm(
      "Apakah kamu yakin ingin keluar dari sistem?"
    );

    if (yakin) {
      // proses logout
      navigate("/login");
    }
  }}
>
  <LogOut size={18} />
  Logout
</button>

      </div>

    </aside>
  );
}

export default Sidebar;