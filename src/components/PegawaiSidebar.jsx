import {
  House,
  BookOpen,
  BookMarked,
  Undo2,
  LogOut,
  UserCircle,
} from "lucide-react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function PegawaiSidebar({
  sidebarOpen,
  onLogout,
  user,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`sidebar ${
        sidebarOpen ? "open" : "closed"
      }`}
    >

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
            MENU PEGAWAI
          </p>
        )}


        {/* DASHBOARD */}
        <div
          className={`menu-item ${
            location.pathname === "/pegawai/dashboard"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/pegawai/dashboard")
          }
        >
          <House size={19} />

          {sidebarOpen && (
            <span>Dashboard</span>
          )}
        </div>


        {/* DATA BUKU */}
        <div
          className={`menu-item ${
            location.pathname === "/pegawai/data-buku"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/pegawai/data-buku")
          }
        >
          <BookOpen size={19} />

          {sidebarOpen && (
            <span>Data Buku</span>
          )}
        </div>


        {/* PEMINJAMAN */}
        <div
          className={`menu-item ${
            location.pathname === "/pegawai/peminjaman"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/pegawai/peminjaman")
          }
        >
          <BookMarked size={19} />

          {sidebarOpen && (
            <span>Peminjaman</span>
          )}
        </div>


        {/* PENGEMBALIAN */}
        <div
          className={`menu-item ${
            location.pathname === "/pegawai/pengembalian"
              ? "active"
              : ""
          }`}
          onClick={() =>
            navigate("/pegawai/pengembalian")
          }
        >
          <Undo2 size={19} />

          {sidebarOpen && (
            <span>Pengembalian</span>
          )}
        </div>

      </div>


      {/* BOTTOM */}
      <div className="sidebar-bottom">

        <div className="admin-box">

          <div className="admin-avatar">
            <UserCircle size={20} />
          </div>

          {sidebarOpen && (
            <div>
              <strong>
                {user?.username || "Pegawai"}
              </strong>

              <small>
                Pegawai
              </small>
            </div>
          )}

        </div>


        {/* LOGOUT */}
        <button
          type="button"
          className="logout"
          onClick={() => {

            const yakin = window.confirm(
              "Apakah kamu yakin ingin keluar dari sistem?"
            );

            if (yakin) {
              onLogout();
            }

          }}
        >
          <LogOut size={18} />

          {sidebarOpen && (
            <span>Logout</span>
          )}

        </button>

      </div>

    </aside>
  );
}

export default PegawaiSidebar;