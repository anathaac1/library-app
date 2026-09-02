import { useState } from "react";
import {
  Sun,
  Moon,
} from "lucide-react";

function Navbar({
  sidebarOpen,
  setSidebarOpen,
  user,
  onLogout,
}) {

  const [darkMode, setDarkMode] =
    useState(false);


  // =================================
  // THEME
  // =================================

  const handleThemeToggle = () => {

    setDarkMode(
      (current) => !current
    );

  };


  // =================================
  // LOGOUT
  // =================================

  const handleLogout = () => {

    onLogout();

  };


  return (

    <nav
      className={`navbar ${
        sidebarOpen
          ? "navbar-open"
          : "navbar-closed"
      }`}
    >

      {/* =================================
          NAVBAR LEFT
      ================================= */}

      <div className="navbar-left">

        <button
          className="burger-button"
          onClick={() =>
            setSidebarOpen(
              !sidebarOpen
            )
          }
        >
          ☰
        </button>

        <h3>
          SISTEM PERPUSTAKAAN
        </h3>

      </div>


      {/* =================================
          NAVBAR RIGHT
      ================================= */}

      <div className="navbar-right">

        {/* =================================
            THEME
        ================================= */}

        <button
          className={`theme-toggle ${
            darkMode
              ? "dark"
              : "light"
          }`}
          onClick={handleThemeToggle}
          title={
            darkMode
              ? "Gunakan Light Mode"
              : "Gunakan Dark Mode"
          }
        >

          {darkMode ? (

            <Moon size={17} />

          ) : (

            <Sun size={17} />

          )}

        </button>


        {/* =================================
            ADMIN
        ================================= */}

        <div className="navbar-admin">

          <div className="navbar-avatar">

            {user?.nama
              ? user.nama
                  .charAt(0)
                  .toUpperCase()
              : "A"}

          </div>


          <div className="navbar-admin-info">

            <strong>

              {user?.nama || "Admin"}

            </strong>

            <small>
              Administrator
            </small>

          </div>

        </div>


        {/* =================================
            LOGOUT
        ================================= */}

       

      </div>

    </nav>

  );

}

export default Navbar;