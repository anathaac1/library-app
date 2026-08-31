function Navbar({ sidebarOpen, setSidebarOpen }) {
  return (
    <nav className={`navbar ${sidebarOpen ? "navbar-open" : "navbar-closed"}`}>

      <div className="navbar-left">

        <button
          className="burger-button"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>

        <h3>SISTEM PERPUSTAKAAN</h3>

      </div>

      <div className="navbar-right">

        <span className="notification">
          🔔
        </span>

        <div className="navbar-admin">

          <div className="navbar-avatar">
            A
          </div>

          <div className="navbar-admin-info">
            <strong>Admin</strong>
            <small>Administrator</small>
          </div>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;