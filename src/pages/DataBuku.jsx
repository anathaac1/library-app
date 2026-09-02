import { useState } from "react";

import {
  Search,
  X,
  Pencil,
  Trash2,
} from "lucide-react";

import { useBook } from "../context/BookContext";

import "../css/buku.css";


// =================================
// FORM KOSONG
// =================================

const emptyForm = {
  title: "",
  author: "",
  publisher: "",
  genre: "",
  stock: "",
  cover: "",
};


// =================================
// COMPONENT
// =================================

function DataBuku() {

  // =================================
  // BOOK CONTEXT
  // =================================

  const {
    books,
    addBook,
    updateBook,
    deleteBook,
  } = useBook();


  // =================================
  // SEARCH
  // =================================

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
  // MODAL EDIT
  // =================================

  const [showEditModal, setShowEditModal] =
    useState(false);


  // =================================
  // ID BUKU YANG SEDANG DIEDIT
  // =================================

  const [editingBookId, setEditingBookId] =
    useState(null);


  // =================================
  // FORM
  // =================================

  const [formData, setFormData] =
    useState(emptyForm);


  // =================================
  // FILTER BUKU
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
  // RESET FORM
  // =================================

  const resetForm = () => {

    setFormData({
      ...emptyForm,
    });

  };


  // =================================
  // BUKA TAMBAH
  // =================================

  const handleOpenAdd = () => {

    resetForm();

    setShowAddModal(true);

  };


  // =================================
  // BATAL TAMBAH
  // =================================

  const handleCancelAdd = () => {

    resetForm();

    setShowAddModal(false);

  };


  // =================================
  // TAMBAH BUKU
  // =================================

  const handleAddBook = (e) => {

    e.preventDefault();


    if (

      !formData.title.trim() ||

      !formData.author.trim() ||

      !formData.publisher.trim() ||

      !formData.genre.trim() ||

      formData.stock === ""

    ) {

      alert(
        "Semua data buku wajib diisi."
      );

      return;

    }


    addBook({

      title:
        formData.title.trim(),

      author:
        formData.author.trim(),

      publisher:
        formData.publisher.trim(),

      genre:
        formData.genre.trim(),

      stock:
        Number(formData.stock),

      cover:
        formData.cover.trim() || "",

    });


    resetForm();

    setShowAddModal(false);

  };


  // =================================
  // BUKA DETAIL
  // =================================

  const handleDetail = (book) => {

    setSelectedBook(book);

  };


  // =================================
  // BUKA EDIT
  // =================================

  const handleEdit = () => {

    if (!selectedBook) {
      return;
    }


    setEditingBookId(
      selectedBook.id
    );


    setFormData({

      title:
        selectedBook.title || "",

      author:
        selectedBook.author || "",

      publisher:
        selectedBook.publisher || "",

      genre:
        selectedBook.genre || "",

      stock:
        selectedBook.stock !== undefined
          ? String(selectedBook.stock)
          : "",

      cover:
        selectedBook.cover || "",

    });


    setSelectedBook(null);

    setShowEditModal(true);

  };


  // =================================
  // BATAL EDIT
  // =================================

  const handleCancelEdit = () => {

    resetForm();

    setEditingBookId(null);

    setShowEditModal(false);

  };


  // =================================
  // SIMPAN PERUBAHAN
  // =================================

  const handleSaveEdit = (e) => {

    e.preventDefault();


    if (editingBookId === null) {

      alert(
        "Buku yang diedit tidak ditemukan."
      );

      return;

    }


    if (

      !formData.title.trim() ||

      !formData.author.trim() ||

      !formData.publisher.trim() ||

      !formData.genre.trim() ||

      formData.stock === ""

    ) {

      alert(
        "Semua data buku wajib diisi."
      );

      return;

    }


    updateBook(

      editingBookId,

      {

        title:
          formData.title.trim(),

        author:
          formData.author.trim(),

        publisher:
          formData.publisher.trim(),

        genre:
          formData.genre.trim(),

        stock:
          Number(formData.stock),

        cover:
          formData.cover.trim(),

      }

    );


    resetForm();

    setEditingBookId(null);

    setShowEditModal(false);

  };


  // =================================
  // HAPUS BUKU
  // =================================

  const handleDelete = (id) => {

    const yakin =
      window.confirm(
        "Apakah kamu yakin ingin menghapus buku ini?"
      );


    if (!yakin) {
      return;
    }


    deleteBook(id);

    setSelectedBook(null);

  };


  // =================================
  // RENDER
  // =================================

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
            onClick={handleOpenAdd}
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

              {book.cover ? (

                <img
                  src={book.cover}
                  alt={book.title}
                  className="book-cover"

                  onError={(e) => {

                    e.currentTarget.style.display =
                      "none";

                  }}

                />

              ) : null}

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

                {book.genre ? (

                  <span>
                    {book.genre}
                  </span>

                ) : (

                  <span className="no-genre">
                    Tanpa Genre
                  </span>

                )}


                <span>
                  Stok: {book.stock}
                </span>

              </div>


              {/* DETAIL */}

              <button
                className="btn-lihat"
                onClick={() =>
                  handleDetail(book)
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


            {/* HEADER */}

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


              {/* COVER */}

              <div className="detail-cover">

                {selectedBook.cover ? (

                  <img
                    src={selectedBook.cover}
                    alt={selectedBook.title}

                    onError={(e) => {

                      e.currentTarget.style.display =
                        "none";

                    }}

                  />

                ) : null}

              </div>



              {/* INFO */}

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



            {/* FOOTER */}

            <div className="modal-footer">


              <button
                className="btn-modal-secondary"

                onClick={() =>
                  setSelectedBook(null)
                }

              >
                Tutup
              </button>


              <button
                className="btn-modal-edit"
                onClick={handleEdit}
              >

                <Pencil size={15} />

                Edit

              </button>


              <button
                className="btn-modal-danger"

                onClick={() =>
                  handleDelete(
                    selectedBook.id
                  )
                }

              >

                <Trash2 size={15} />

                Hapus

              </button>


            </div>


          </div>

        </div>

      )}



      {/* =================================
          MODAL TAMBAH
      ================================= */}

      {showAddModal && (

        <div className="modal-overlay">

          <div
            className="modal-box"

            onClick={(e) =>
              e.stopPropagation()
            }

          >

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
                type="button"
                className="modal-close"

                onClick={handleCancelAdd}

              >

                <X size={18} />

              </button>

            </div>



            <form
              onSubmit={handleAddBook}
              className="book-form"
            >


              <div className="form-group">

                <label>
                  Judul Buku
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Masukkan judul buku"
                  value={formData.title}
                  onChange={handleChange}
                />

              </div>



              <div className="form-group">

                <label>
                  Penulis
                </label>

                <input
                  type="text"
                  name="author"
                  placeholder="Masukkan nama penulis"
                  value={formData.author}
                  onChange={handleChange}
                />

              </div>



              <div className="form-group">

                <label>
                  Penerbit
                </label>

                <input
                  type="text"
                  name="publisher"
                  placeholder="Masukkan nama penerbit"
                  value={formData.publisher}
                  onChange={handleChange}
                />

              </div>



              <div className="form-row">

                <div className="form-group">

                  <label>
                    Genre
                  </label>

                  <input
                    type="text"
                    name="genre"
                    placeholder="Contoh: Petualangan"
                    value={formData.genre}
                    onChange={handleChange}
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
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                  />

                </div>

              </div>



              <div className="form-group">

                <label>
                  URL Cover Buku
                </label>

                <input
                  type="text"
                  name="cover"
                  placeholder="https://..."
                  value={formData.cover}
                  onChange={handleChange}
                />

                <small>
                  Masukkan URL gambar langsung, bukan link Pinterest.
                </small>

              </div>



              <div className="modal-footer">

                <button
                  type="button"
                  className="btn-modal-secondary"
                  onClick={handleCancelAdd}
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



      {/* =================================
          MODAL EDIT
      ================================= */}

      {showEditModal && (

        <div className="modal-overlay">

          <div
            className="modal-box"

            onClick={(e) =>
              e.stopPropagation()
            }

          >

            <div className="modal-header">

              <div>

                <h2>
                  Edit Buku
                </h2>

                <p>
                  Ubah informasi buku
                </p>

              </div>


              <button
                type="button"
                className="modal-close"

                onClick={handleCancelEdit}

              >

                <X size={18} />

              </button>

            </div>



            <form
              onSubmit={handleSaveEdit}
              className="book-form"
            >


              <div className="form-group">

                <label>
                  Judul Buku
                </label>

                <input
                  type="text"
                  name="title"
                  placeholder="Masukkan judul buku"
                  value={formData.title}
                  onChange={handleChange}
                />

              </div>



              <div className="form-group">

                <label>
                  Penulis
                </label>

                <input
                  type="text"
                  name="author"
                  placeholder="Masukkan nama penulis"
                  value={formData.author}
                  onChange={handleChange}
                />

              </div>



              <div className="form-group">

                <label>
                  Penerbit
                </label>

                <input
                  type="text"
                  name="publisher"
                  placeholder="Masukkan nama penerbit"
                  value={formData.publisher}
                  onChange={handleChange}
                />

              </div>



              <div className="form-row">

                <div className="form-group">

                  <label>
                    Genre
                  </label>

                  <input
                    type="text"
                    name="genre"
                    placeholder="Contoh: Petualangan"
                    value={formData.genre}
                    onChange={handleChange}
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
                    placeholder="0"
                    value={formData.stock}
                    onChange={handleChange}
                  />

                </div>

              </div>



              <div className="form-group">

                <label>
                  URL Cover Buku
                </label>

                <input
                  type="text"
                  name="cover"
                  placeholder="https://..."
                  value={formData.cover}
                  onChange={handleChange}
                />

                <small>
                  Masukkan URL gambar langsung, bukan link Pinterest.
                </small>

              </div>



              <div className="modal-footer">

                <button
                  type="button"
                  className="btn-modal-secondary"
                  onClick={handleCancelEdit}
                >
                  Batal
                </button>


                <button
                  type="submit"
                  className="btn-modal-primary"
                >
                  Simpan Perubahan
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