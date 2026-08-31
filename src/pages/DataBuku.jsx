import { useState } from "react";
import { Search, X } from "lucide-react";

import { useBook } from "../context/BookContext";

import "../css/buku.css";


function DataBuku() {

  const {
    books,
    addBook,
  } = useBook();


  const [search, setSearch] = useState("");


  // =================================
  // MODAL DETAIL
  // =================================

  const [selectedBook, setSelectedBook] =
    useState(null);


  // =================================
  // MODAL TAMBAH
  // =================================

  const [showAddModal, setShowAddModal] =
    useState(false);


  // =================================
  // FORM TAMBAH BUKU
  // =================================

  const [formData, setFormData] = useState({

    title: "",
    author: "",
    publisher: "",
    genre: "",
    stock: "",
    cover: "",

  });


  // =================================
  // SEARCH BUKU
  // =================================

  const filteredBooks = books.filter((book) =>

    `${book.title} ${book.author} ${book.genre}`
      .toLowerCase()
      .includes(search.toLowerCase())

  );


  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((current) => ({

      ...current,

      [name]: value,

    }));

  };


  // =================================
  // TAMBAH BUKU
  // =================================

  const handleAddBook = (e) => {

    e.preventDefault();


    // Validasi sederhana

    if (
      !formData.title ||
      !formData.author ||
      !formData.publisher ||
      !formData.genre ||
      !formData.stock
    ) {

      alert("Semua data buku wajib diisi.");

      return;

    }


    addBook({

      title: formData.title,

      author: formData.author,

      publisher: formData.publisher,

      genre: formData.genre,

      stock: Number(formData.stock),

      // Kalau cover kosong
      // gunakan gambar kosong

      cover:
        formData.cover ||
        "https://via.placeholder.com/150x220?text=Buku",

    });


    // Reset form

    setFormData({

      title: "",
      author: "",
      publisher: "",
      genre: "",
      stock: "",
      cover: "",

    });


    // Tutup modal

    setShowAddModal(false);

  };


  return (

    <div className="data-buku-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="page-header">

        <div>

          <span className="breadcrumb">
            Pages / Data Buku
          </span>

          <h1>
            Data Buku
          </h1>

          <p>
            Kelola data buku perpustakaan
          </p>

        </div>


        {/* SEARCH + TAMBAH */}

        <div className="page-actions">


          {/* SEARCH */}

          <div className="search-box">

            <Search
              size={15}
              className="search-icon"
            />

            <input
              type="text"
              placeholder="Cari buku..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          {/* TAMBAH */}

          <button
            className="btn-tambah"
            onClick={() =>
              setShowAddModal(true)
            }
          >

            + Tambah Buku

          </button>


        </div>

      </div>



      {/* =================================
          GRID BUKU
      ================================= */}

      <div className="book-grid">


        {filteredBooks.map((book) => (

          <div
            className="book-card"
            key={book.id}
          >


            {/* COVER */}

            <div className="book-cover-wrapper">

              <img
                src={book.cover}
                alt={book.title}
                className="book-cover"
              />

            </div>



            {/* INFO */}

            <div className="book-info">


              <h3>
                {book.title}
              </h3>


              <p className="book-author">
                {book.author}
              </p>



              <div className="book-meta">


                {/* GENRE */}

                {book.genre ? (

                  <span>
                    {book.genre}
                  </span>

                ) : (

                  <span className="no-genre">
                    Tanpa Genre
                  </span>

                )}


                {/* STOCK */}

                <span>
                  Stok: {book.stock}
                </span>


              </div>



              {/* DETAIL */}

              <button
                className="btn-lihat"
                onClick={() =>
                  setSelectedBook(book)
                }
              >

                Lihat Detail

              </button>


            </div>

          </div>

        ))}



        {/* EMPTY */}

        {filteredBooks.length === 0 && (

          <p className="empty-book">

            Buku tidak ditemukan.

          </p>

        )}

      </div>



      {/* =================================
          MODAL DETAIL
      ================================= */}

      {selectedBook && (

        <div
          className="modal-overlay"
          onClick={() =>
            setSelectedBook(null)
          }
        >

          <div
            className="modal-box detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER MODAL */}

            <div className="modal-header">

              <div>

                <h2>
                  Detail Buku
                </h2>

                <p>
                  Informasi lengkap buku
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setSelectedBook(null)
                }
              >

                <X size={18} />

              </button>

            </div>



            {/* DETAIL */}

            <div className="detail-content">


              <div className="detail-cover">

                <img
                  src={selectedBook.cover}
                  alt={selectedBook.title}
                />

              </div>



              <div className="detail-info">

                <h3>
                  {selectedBook.title}
                </h3>


                <div className="detail-row">

                  <span>
                    Penulis
                  </span>

                  <strong>
                    {selectedBook.author}
                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Penerbit
                  </span>

                  <strong>
                    {selectedBook.publisher}
                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Genre
                  </span>

                  <strong>
                    {selectedBook.genre ||
                      "Tanpa Genre"}
                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Stok
                  </span>

                  <strong>
                    {selectedBook.stock}
                  </strong>

                </div>

              </div>

            </div>



            <div className="modal-footer">

              <button
                className="btn-modal-secondary"
                onClick={() =>
                  setSelectedBook(null)
                }
              >

                Tutup

              </button>

            </div>

          </div>

        </div>

      )}



      {/* =================================
          MODAL TAMBAH BUKU
      ================================= */}

      {showAddModal && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowAddModal(false)
          }
        >

          <div
            className="modal-box add-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Tambah Buku
                </h2>

                <p>
                  Tambahkan buku baru ke perpustakaan
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowAddModal(false)
                }
              >

                <X size={18} />

              </button>

            </div>



            {/* FORM */}

            <form
              onSubmit={handleAddBook}
              className="book-form"
            >


              {/* JUDUL */}

              <div className="form-group">

                <label>
                  Judul Buku
                </label>

                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Masukkan judul buku"
                />

              </div>



              {/* PENULIS */}

              <div className="form-group">

                <label>
                  Penulis
                </label>

                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Masukkan nama penulis"
                />

              </div>



              {/* PENERBIT */}

              <div className="form-group">

                <label>
                  Penerbit
                </label>

                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Masukkan nama penerbit"
                />

              </div>



              {/* GENRE + STOCK */}

              <div className="form-row">


                <div className="form-group">

                  <label>
                    Genre
                  </label>

                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Contoh: Petualangan"
                  />

                </div>



                <div className="form-group">

                  <label>
                    Stok
                  </label>

                  <input
                    type="number"
                    name="stock"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                  />

                </div>


              </div>



              {/* COVER */}

              <div className="form-group">

                <label>
                  URL Cover Buku
                </label>

                <input
                  type="text"
                  name="cover"
                  value={formData.cover}
                  onChange={handleChange}
                  placeholder="https://..."
                />

                <small>
                  Kosongkan jika tidak memiliki cover.
                </small>

              </div>



              {/* BUTTON */}

              <div className="modal-footer">


                <button
                  type="button"
                  className="btn-modal-secondary"
                  onClick={() =>
                    setShowAddModal(false)
                  }
                >

                  Batal

                </button>


                <button
                  type="submit"
                  className="btn-modal-primary"
                >

                  Simpan Buku

                </button>


              </div>


            </form>

          </div>

        </div>

      )}

    </div>

  );

}


export default DataBuku;