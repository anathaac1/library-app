import { useState } from "react";

import {
  Search,
  Pencil,
  Trash2,
  X,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useBook } from "../context/BookContext";

import "../css/genre.css";


function DataGenre() {

  const {
    books,
    genres,
    addGenre,
    deleteGenre,
  } = useBook();


  const navigate = useNavigate();


  // =================================
  // SEARCH
  // =================================

  const [search, setSearch] = useState("");


  // =================================
  // MODAL TAMBAH GENRE
  // =================================

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [newGenre, setNewGenre] =
    useState("");


  // =================================
  // SEARCH GENRE
  // =================================

  const filteredGenres = genres.filter((genre) =>
    genre
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  // =================================
  // TAMBAH GENRE
  // =================================

  const handleAddGenre = (e) => {

    e.preventDefault();


    const berhasil = addGenre(newGenre);


    if (!berhasil) {

      alert(
        newGenre.trim()
          ? "Genre sudah ada."
          : "Nama genre tidak boleh kosong."
      );

      return;
    }


    // Reset input
    setNewGenre("");


    // Tutup modal
    setShowAddModal(false);

  };


  // =================================
  // HAPUS GENRE
  // =================================

  const handleDelete = (genre) => {

    const yakin = window.confirm(
      `Hapus genre "${genre}"? Buku yang menggunakan genre ini akan menjadi "Tanpa Genre".`
    );


    if (yakin) {

      deleteGenre(genre);

    }

  };


  return (

    <div className="data-genre-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="genre-header">

        <div>

          <span className="breadcrumb">
            Pages / Data Genre
          </span>

          <h1>
            Data Genre
          </h1>

          <p>
            Kelola genre buku perpustakaan
          </p>

        </div>

      </div>



      {/* =================================
          SEARCH + TAMBAH
      ================================= */}

      <div className="genre-toolbar">


        {/* SEARCH */}

        <div className="genre-search">

          <Search size={15} />

          <input
            type="text"
            placeholder="Cari genre..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        {/* TAMBAH */}

        <button
          className="btn-tambah-genre"
          onClick={() =>
            setShowAddModal(true)
          }
        >

          + Tambah Genre

        </button>

      </div>



      {/* =================================
          GRID GENRE
      ================================= */}

      <div className="genre-grid">


        {filteredGenres.map((genre) => {


          // HITUNG JUMLAH BUKU

          const totalBuku = books.filter(
            (book) => book.genre === genre
          ).length;


          return (

            <div
              className="genre-card"
              key={genre}
            >


              {/* INFO */}

              <div className="genre-content">

                <h3>
                  {genre}
                </h3>

                <p>
                  {totalBuku} Buku
                </p>

              </div>



              {/* ACTION */}

              <div className="genre-actions">


                {/* EDIT */}

                <button
                  className="btn-edit-genre"
                  title="Edit Genre"
                  onClick={() =>
                    navigate(
                      `/edit-genre/${encodeURIComponent(genre)}`
                    )
                  }
                >

                  <Pencil size={14} />

                </button>



                {/* HAPUS */}

                <button
                  className="btn-delete-genre"
                  title="Hapus Genre"
                  onClick={() =>
                    handleDelete(genre)
                  }
                >

                  <Trash2 size={14} />

                </button>


              </div>

            </div>

          );

        })}



        {/* TIDAK DITEMUKAN */}

        {filteredGenres.length === 0 && (

          <p className="genre-empty">

            Genre tidak ditemukan.

          </p>

        )}

      </div>



      {/* =================================
          MODAL TAMBAH GENRE
      ================================= */}

      {showAddModal && (

        <div className="modal-overlay">

          <div className="modal-box">


            {/* HEADER MODAL */}

            <div className="modal-header">

              <div>

                <h2>
                  Tambah Genre
                </h2>

                <p>
                  Tambahkan genre baru ke perpustakaan.
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() => {

                  setShowAddModal(false);
                  setNewGenre("");

                }}
              >

                <X size={20} />

              </button>

            </div>



            {/* FORM */}

            <form
              onSubmit={handleAddGenre}
              className="genre-form"
            >

              <label>
                Nama Genre
              </label>


              <input
                type="text"
                placeholder="Contoh: Fantasi"
                value={newGenre}
                onChange={(e) =>
                  setNewGenre(e.target.value)
                }
                autoFocus
              />



              {/* BUTTON */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-batal"
                  onClick={() => {

                    setShowAddModal(false);
                    setNewGenre("");

                  }}
                >

                  Batal

                </button>


                <button
                  type="submit"
                  className="btn-simpan"
                >

                  Tambah Genre

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default DataGenre;