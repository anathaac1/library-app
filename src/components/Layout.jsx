import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ onLogout }) {

  const [sidebarOpen, setSidebarOpen] =
    useState(true);


  return (

    <div className="app">

      {/* =================================
          SIDEBAR
      ================================= */}

      <Sidebar
        sidebarOpen={sidebarOpen}
        onLogout={onLogout}
      />


      {/* =================================
          MAIN AREA
      ================================= */}

      <div
        className={`main-area ${
          sidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >

        {/* =================================
            NAVBAR
        ================================= */}

        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />


        {/* =================================
            CONTENT
        ================================= */}

        <main className="content">

          <Outlet />

        </main>

      </div>

    </div>

  );
}

export default Layout;