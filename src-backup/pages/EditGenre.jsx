import { useState } from "react";

import {
  ArrowLeft,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { useBook } from "../context/BookContext";

import "../css/EditGenre.css";


function EditGenre() {

  const { genre } = useParams();

  const navigate = useNavigate();

  const {
    books,
    updateGenre,
  } = useBook();


  // Genre lama
  const oldGenre = decodeURIComponent(genre);


  // Genre baru
  const [newGenre, setNewGenre] = useState(oldGenre);


  // =================================
  // JUMLAH BUKU
  // =================================

  const totalBuku = books.filter(
    (book) => book.genre === oldGenre
  ).length;


  // =================================
  // SIMPAN
  // =================================

  const handleSubmit = (e) => {

    e.preventDefault();

    const trimmedGenre = newGenre.trim();


    // Jangan kosong
    if (!trimmedGenre) {

      alert("Nama genre tidak boleh kosong.");

      return;
    }


    // Kalau tidak berubah
    if (trimmedGenre === oldGenre) {

      navigate("/data-genre");

      return;
    }


    // Cek genre sudah ada
    const genreSudahAda = books.some(
      (book) =>
        book.genre.toLowerCase() ===
          trimmedGenre.toLowerCase() &&
        book.genre !== oldGenre
    );


    if (genreSudahAda) {

      alert("Genre tersebut sudah ada.");

      return;
    }


    // UPDATE GENRE
    updateGenre(
      oldGenre,
      trimmedGenre
    );


    // Kembali ke data genre
    navigate("/data-genre");

  };


  // =================================
  // BATAL
  // =================================

  const handleCancel = () => {

    navigate("/data-genre");

  };


  return (

    <div className="edit-genre-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="edit-genre-header">


        {/* KEMBALI */}

        <button
          className="back-button"
          onClick={() =>
            navigate("/data-genre")
          }
        >

          <ArrowLeft size={17} />

          Kembali

        </button>


        <span className="breadcrumb">

          Pages / Data Genre / Edit

        </span>


        <h1>
          Edit Genre
        </h1>


        <p>
          Ubah nama genre buku perpustakaan
        </p>


      </div>


      {/* =================================
          FORM CARD
      ================================= */}

      <div className="edit-genre-card">


        {/* INFO GENRE */}

        <div className="edit-info">

          <span>
            Genre saat ini
          </span>

          <strong>
            {oldGenre}
          </strong>

          <small>
            {totalBuku} buku menggunakan genre ini
          </small>

        </div>


        {/* =================================
            FORM
        ================================= */}

        <form onSubmit={handleSubmit}>


          <label>
            Nama Genre Baru
          </label>


          <input
            type="text"
            value={newGenre}
            onChange={(e) =>
              setNewGenre(e.target.value)
            }
            placeholder="Masukkan nama genre"
          />


          {/* =================================
              BUTTON
          ================================= */}

          <div className="edit-genre-actions">


            <button
              type="submit"
              className="btn-save-genre"
            >

              Simpan Perubahan

            </button>


            <button
              type="button"
              className="btn-cancel-genre"
              onClick={handleCancel}
            >

              Batal

            </button>


          </div>


        </form>


      </div>

    </div>

  );

}


export default EditGenre;