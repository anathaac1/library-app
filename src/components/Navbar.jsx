import { useEffect, useState } from "react";
import { Sun, Moon, Menu } from "lucide-react";

function Navbar({
  sidebarOpen,
  setSidebarOpen,
  onMenuClick,
  user,
}) {
  // ==========================================
  // THEME
  // ==========================================

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("libraryTheme") === "dark";
  });

  useEffect(() => {
    const theme = darkMode ? "dark" : "light";

    // Simpan theme
    localStorage.setItem("libraryTheme", theme);

    // Terapkan ke HTML
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );

    // Sekalian class body supaya kompatibel
    document.body.classList.toggle(
      "dark-mode",
      darkMode
    );

    document.body.classList.toggle(
      "light-mode",
      !darkMode
    );
  }, [darkMode]);

  const handleThemeToggle = () => {
    setDarkMode((current) => !current);
  };


  // ==========================================
  // SIDEBAR
  // ==========================================

  const handleMenuClick = () => {
    if (typeof setSidebarOpen === "function") {
      setSidebarOpen((current) => !current);
      return;
    }

    if (typeof onMenuClick === "function") {
      onMenuClick();
    }
  };


  // ==========================================
  // USER
  // ==========================================

  const namaUser =
    user?.nama ||
    user?.username ||
    user?.name ||
    "Admin";

  const initial =
    namaUser.charAt(0).toUpperCase();


  // ==========================================
  // RENDER
  // ==========================================

  return (
    <nav className="navbar">

      {/* =====================================
          LEFT
      ===================================== */}

      <div className="navbar-left">

        <button
          type="button"
          className="burger-button"
          onClick={handleMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>

        <h3>
          SISTEM PERPUSTAKAAN
        </h3>

      </div>


      {/* =====================================
          RIGHT
      ===================================== */}

      <div className="navbar-right">

        {/* THEME */}

        <button
          type="button"
          className={`theme-toggle ${
            darkMode ? "dark" : "light"
          }`}
          onClick={handleThemeToggle}
          title={
            darkMode
              ? "Gunakan Light Mode"
              : "Gunakan Dark Mode"
          }
          aria-label="Ganti tema"
        >
          {darkMode ? (
            <Moon size={17} />
          ) : (
            <Sun size={17} />
          )}
        </button>


        {/* USER */}

        <div className="navbar-admin">

          <div className="navbar-avatar">
            {initial}
          </div>

          <div className="navbar-admin-info">

            <strong>
              {namaUser}
            </strong>

            <small>
              {user?.role === "pegawai"
                ? "Pegawai"
                : "Administrator"}
            </small>

          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;