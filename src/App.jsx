import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";

import DataBuku from "./pages/DataBuku";

import DataGenre from "./pages/DataGenre";

import EditGenre from "./pages/EditGenre";

import Peminjaman from "./pages/Peminjaman";

import Pengembalian from "./pages/Pengembalian";

function App() {

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

      <Route element={<Layout />}>


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

        <Route
  path="/peminjaman"
  element={<Peminjaman />}
/>

<Route
  path="/pengembalian"
  element={<Pengembalian />}
/>
      </Route>

      

    </Routes>

  );

}


export default App;