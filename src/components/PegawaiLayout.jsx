import { useState } from "react";
import { Outlet } from "react-router-dom";

import PegawaiSidebar from "./PegawaiSidebar";
import Navbar from "./Navbar";

function PegawaiLayout({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-layout">

      <PegawaiSidebar
        sidebarOpen={sidebarOpen}
        user={user}
        onLogout={onLogout}
      />

      <div
        className={`main-area ${
          sidebarOpen ? "" : "sidebar-closed"
        }`}
      >

        <Navbar
          user={user}
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default PegawaiLayout;