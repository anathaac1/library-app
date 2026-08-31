import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="app">

      <Sidebar
        sidebarOpen={sidebarOpen}
      />

      <div
        className={`main-area ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;