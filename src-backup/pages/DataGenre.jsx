import { useState } from "react";

import {
  Search,
  Pencil,
  Trash2,
  X,
  Users,
  Compass,
  Castle,
  BookOpen,
  ScanSearch,
  Ghost,
  Lightbulb,
  Skull,
  Brain,
  Target,
  UserRound,
  WandSparkles,
  Feather,
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
  // GENRE YANG DIPILIH
  // Untuk menampilkan buku dalam genre
  // =================================

  const [selectedGenre, setSelectedGenre] =
    useState(null);


  // =================================
  // BUKU YANG DIPILIH
  // Untuk menampilkan detail buku
  // tanpa tombol edit/hapus
  // =================================

  const [selectedBook, setSelectedBook] =
    useState(null);


  // =================================
  // ICON GENRE
  // =================================

  const genreIcons = {

    "Persahabatan": Users,

    "Petualangan": Compass,

    "Romansa": Castle,

    "Fiksi Sejarah": BookOpen,

    "Fiksi": ScanSearch,

    "Misteri": Ghost,

    "Motivasi": Lightbulb,

    "Horor": Skull,

    "Filsafat": Brain,

    "Thriller": Target,

    "Fiksi Remaja": UserRound,

    "Fantasi": WandSparkles,

    "Poetry": Feather,

  };


  // =================================
  // SEARCH GENRE
  // =================================

  const filteredGenres =
    genres.filter((genre) =>

      genre
        .toLowerCase()
        .includes(search.toLowerCase())

    );


  // =================================
  // TAMBAH GENRE
  // =================================

  const handleAddGenre = (e) => {

    e.preventDefault();


    const berhasil =
      addGenre(newGenre);


    if (!berhasil) {

      alert(

        newGenre.trim()

          ? "Genre sudah ada."

          : "Nama genre tidak boleh kosong."

      );

      return;

    }


    setNewGenre("");

    setShowAddModal(false);

  };


  // =================================
  // HAPUS GENRE
  // =================================

  const handleDelete = (genre) => {

    const yakin =
      window.confirm(

        `Hapus genre "${genre}"? Buku yang menggunakan genre ini akan menjadi "Tanpa Genre".`

      );


    if (yakin) {

      deleteGenre(genre);

    }

  };


  // =================================
  // BUKA GENRE
  // =================================

  const handleOpenGenre = (genre) => {

    setSelectedGenre(genre);

  };


  // =================================
  // TUTUP MODAL GENRE
  // =================================

  const handleCloseGenre = () => {

    setSelectedGenre(null);

    setSelectedBook(null);

  };


  // =================================
  // BUKA DETAIL BUKU
  // =================================

  const handleOpenBook = (book) => {

    setSelectedBook(book);

  };


  // =================================
  // TUTUP DETAIL BUKU
  // =================================

  const handleCloseBook = () => {

    setSelectedBook(null);

  };


  // =================================
  // BUKU BERDASARKAN GENRE
  // =================================

  const genreBooks = selectedGenre

    ? books.filter(
        (book) =>
          book.genre === selectedGenre
      )

    : [];


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

          <Search size={16} />

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


        {filteredGenres.map(
          (genre, index) => {

            // =================================
            // HITUNG JUMLAH BUKU
            // =================================

            const totalBuku =
              books.filter(
                (book) =>
                  book.genre === genre
              ).length;


            // =================================
            // AMBIL ICON
            // =================================

            const Icon =
              genreIcons[genre] ||
              BookOpen;


            return (

              <div
                className="genre-card"
                key={genre}
              >


                {/* =================================
                    BAGIAN ATAS CARD
                ================================= */}

                <div className="genre-card-top">

                  <div className="genre-icon">

                    <Icon
                      size={32}
                      strokeWidth={1.8}
                    />

                  </div>

                </div>



                {/* =================================
                    CONTENT
                ================================= */}

                <div className="genre-content">

                  <h3>
                    {genre}
                  </h3>

                  <p>
                    {totalBuku} Buku
                  </p>

                </div>



                {/* =================================
                    ACTION
                ================================= */}

                {/* =================================
    ACTION
================================= */}

<div className="genre-actions">

  {/* LIHAT BUKU */}
  <button
    className="btn-lihat-genre"
    title="Lihat Buku"
    aria-label="Lihat Buku"
    onClick={() => handleOpenGenre(genre)}
  >
    <BookOpen size={15} strokeWidth={2} />
  </button>


  {/* EDIT GENRE */}
  <button
    className="btn-edit-genre"
    title="Edit Genre"
    aria-label="Edit Genre"
    onClick={() =>
      navigate(
        `/edit-genre/${encodeURIComponent(genre)}`
      )
    }
  >
    <Pencil size={15} strokeWidth={2} />
  </button>


  {/* HAPUS GENRE */}
  <button
    className="btn-delete-genre"
    title="Hapus Genre"
    aria-label="Hapus Genre"
    onClick={() => handleDelete(genre)}
  >
    <Trash2 size={15} strokeWidth={2} />
  </button>

</div>

              </div>

            );

          }

        )}



        {/* =================================
            TIDAK DITEMUKAN
        ================================= */}

        {filteredGenres.length === 0 && (

          <p className="genre-empty">

            Genre tidak ditemukan.

          </p>

        )}

      </div>



      {/* =================================
          MODAL DAFTAR BUKU DALAM GENRE
      ================================= */}

      {selectedGenre && (

        <div
          className="modal-overlay"

          onClick={handleCloseGenre}

        >

          <div
            className="modal-box genre-books-modal"

            onClick={(e) =>
              e.stopPropagation()
            }

          >


            {/* =================================
                HEADER
            ================================= */}

            <div className="modal-header">

              <div>

                <h2>
                  {selectedGenre}
                </h2>

                <p>
                  Daftar buku dalam genre ini
                </p>

              </div>


              <button
                className="modal-close"

                onClick={
                  handleCloseGenre
                }

              >

                <X size={20} />

              </button>

            </div>



            {/* =================================
                DAFTAR BUKU
            ================================= */}

            <div className="genre-book-list">


              {genreBooks.length > 0 ? (

                genreBooks.map((book) => (

                  <div
                    className="genre-book-item"

                    key={book.id}

                    onClick={() =>
                      handleOpenBook(book)
                    }

                  >


                    {/* COVER */}

                    <div className="genre-book-cover">

                      {book.cover ? (

                        <img
                          src={book.cover}
                          alt={book.title}

                          onError={(e) => {

                            e.currentTarget.style.display =
                              "none";

                          }}

                        />

                      ) : (

                        <BookOpen
                          size={25}
                        />

                      )}

                    </div>



                    {/* INFO */}

                    <div className="genre-book-info">

                      <h3>
                        {book.title}
                      </h3>

                      <p>
                        {book.author}
                      </p>

                      <span>
                        Stok: {book.stock}
                      </span>

                    </div>


                  </div>

                ))

              ) : (

                <div className="genre-no-book">

                  <BookOpen size={35} />

                  <p>
                    Belum ada buku dalam genre ini.
                  </p>

                </div>

              )}

            </div>



            {/* =================================
                FOOTER
            ================================= */}

            <div className="modal-footer">

              <button
                className="btn-modal-secondary"

                onClick={
                  handleCloseGenre
                }

              >

                Tutup

              </button>

            </div>


          </div>

        </div>

      )}



      {/* =================================
          MODAL DETAIL BUKU DARI GENRE
          TANPA EDIT / HAPUS
      ================================= */}

      {selectedBook && (

        <div
          className="modal-overlay"

          onClick={handleCloseBook}

        >

          <div
            className="modal-box genre-book-detail-modal"

            onClick={(e) =>
              e.stopPropagation()
            }

          >


            {/* =================================
                HEADER
            ================================= */}

            <div className="modal-header">

              <div>

                <h2>
                  Detail Buku
                </h2>

                <p>
                  Informasi buku
                </p>

              </div>


              <button
                className="modal-close"

                onClick={
                  handleCloseBook
                }

              >

                <X size={18} />

              </button>

            </div>



            {/* =================================
                DETAIL
            ================================= */}

            <div className="genre-detail-content">


              {/* COVER */}

              <div className="genre-detail-cover">

                {selectedBook.cover ? (

                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}

                    onError={(e) => {

                      e.currentTarget.style.display =
                        "none";

                    }}

                  />

                ) : (

                  <BookOpen
                    size={40}
                  />

                )}

              </div>



              {/* INFO */}

              <div className="genre-detail-info">

                <h3>
                  {selectedBook.title}
                </h3>


                <div className="genre-detail-row">

                  <span>
                    Penulis
                  </span>

                  <strong>
                    {selectedBook.author}
                  </strong>

                </div>


                <div className="genre-detail-row">

                  <span>
                    Penerbit
                  </span>

                  <strong>
                    {selectedBook.publisher}
                  </strong>

                </div>


                <div className="genre-detail-row">

                  <span>
                    Genre
                  </span>

                  <strong>
                    {selectedBook.genre ||
                      "Tanpa Genre"}
                  </strong>

                </div>


                <div className="genre-detail-row">

                  <span>
                    Stok
                  </span>

                  <strong>
                    {selectedBook.stock}
                  </strong>

                </div>

              </div>

            </div>



            {/* =================================
                FOOTER
                CUMA TUTUP
            ================================= */}

            <div className="modal-footer">

              <button
                className="btn-modal-secondary"

                onClick={
                  handleCloseBook
                }

              >

                Tutup

              </button>

            </div>


          </div>

        </div>

      )}



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
                  setNewGenre(
                    e.target.value
                  )
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