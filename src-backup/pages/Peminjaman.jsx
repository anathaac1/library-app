import { useState } from "react";

import {
  Search,
  X,
} from "lucide-react";

import { useBook } from "../context/BookContext";

import "../css/Peminjaman.css";


function Peminjaman() {

  const {
    books,
    borrowings,
    addBorrowing,
    returnBook,
    deleteBorrowing,
  } = useBook();


  // =================================
  // STATE
  // =================================

  const [search, setSearch] = useState("");

  const [showTambah, setShowTambah] =
    useState(false);

  const [showDetail, setShowDetail] =
    useState(false);

  const [selectedBorrowing, setSelectedBorrowing] =
    useState(null);


  // FORM TAMBAH
  const [namaPeminjam, setNamaPeminjam] =
    useState("");

  const [bukuId, setBukuId] =
    useState("");

  const [tanggalPinjam, setTanggalPinjam] =
    useState("");

  const [tanggalKembali, setTanggalKembali] =
    useState("");


  // =================================
  // FORMAT TANGGAL
  // =================================

  const formatTanggal = (tanggal) => {

    if (!tanggal) {
      return "";
    }

    const [tahun, bulan, hari] =
      tanggal.split("-");

    return `${hari}/${bulan}/${tahun}`;

  };


  // =================================
  // CARI DATA PEMINJAMAN
  // =================================

  const filteredBorrowings =
    borrowings.filter(
      (borrowing) => {

        const book =
          books.find(
            (item) =>
              item.id ===
              borrowing.bukuId
          );


        const namaBuku =
          book?.title || "";


        return (
          `${borrowing.namaPeminjam} ${namaBuku}`
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
        );

      }
    );


  // =================================
  // BUKA DETAIL
  // =================================

  const handleDetail = (borrowing) => {

    setSelectedBorrowing(borrowing);

    setShowDetail(true);

  };


  // =================================
  // BUKA TAMBAH
  // =================================

  const handleOpenTambah = () => {

    setNamaPeminjam("");
    setBukuId("");
    setTanggalPinjam("");
    setTanggalKembali("");

    setShowTambah(true);

  };


  // =================================
  // TAMBAH PEMINJAMAN
  // =================================

  const handleTambah = (e) => {

    e.preventDefault();


    if (
      !namaPeminjam.trim() ||
      !bukuId ||
      !tanggalPinjam ||
      !tanggalKembali
    ) {

      alert(
        "Semua data wajib diisi."
      );

      return;

    }


    const selectedBook =
      books.find(
        (book) =>
          book.id === Number(bukuId)
      );


    if (!selectedBook) {

      alert(
        "Buku tidak ditemukan."
      );

      return;

    }


    // CEK STOCK

    if (selectedBook.stock <= 0) {

      alert(
        "Stok buku sedang habis."
      );

      return;

    }


    // CEK TANGGAL

    if (
      new Date(tanggalKembali) <
      new Date(tanggalPinjam)
    ) {

      alert(
        "Tanggal jatuh tempo tidak boleh sebelum tanggal pinjam."
      );

      return;

    }


    // TAMBAH DATA

    addBorrowing({

      namaPeminjam:
        namaPeminjam.trim(),

      bukuId:
        Number(bukuId),

      tanggalPinjam:
        formatTanggal(tanggalPinjam),

      tanggalKembali:
        formatTanggal(tanggalKembali),

    });


    // TUTUP MODAL

    setShowTambah(false);


    // RESET FORM

    setNamaPeminjam("");
    setBukuId("");
    setTanggalPinjam("");
    setTanggalKembali("");

  };


  // =================================
  // KEMBALIKAN BUKU
  // =================================

  const handleReturn = (id) => {

    const yakin =
      window.confirm(
        "Apakah buku ini sudah dikembalikan?"
      );


    if (!yakin) {
      return;
    }


    returnBook(id);

  };


  // =================================
  // HAPUS PEMINJAMAN
  // =================================

  const handleDelete = (id) => {

    const yakin =
      window.confirm(
        "Apakah kamu yakin ingin menghapus data peminjaman ini?"
      );


    if (!yakin) {
      return;
    }


    deleteBorrowing(id);

  };


  return (

    <div className="peminjaman-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="page-header">

        <div className="page-title">

          <span className="breadcrumb">
            Pages / Peminjaman
          </span>


          <h1>
            Peminjaman
          </h1>


          <p>
            Kelola data peminjaman buku
          </p>

        </div>


        {/* SEARCH + TAMBAH */}

        <div className="peminjaman-actions">


          {/* SEARCH */}

          <div className="peminjaman-search">

            <Search
              size={15}
              className="search-icon"
            />


            <input
              type="text"
              placeholder="Cari peminjaman..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          {/* TAMBAH */}

          <button
            className="btn-tambah-peminjaman"
            onClick={handleOpenTambah}
          >
            + Tambah Peminjaman
          </button>

        </div>

      </div>


      {/* =================================
          TABLE
      ================================= */}

      <div className="peminjaman-card">

        <div className="table-wrapper">

          <table className="peminjaman-table">

            <thead>

              <tr>

                <th>
                  No
                </th>

                <th>
                  Peminjam
                </th>

                <th>
                  Buku
                </th>

                <th>
                  Tanggal Pinjam
                </th>

                <th>
                  Jatuh Tempo
                </th>

                <th>
                  Aksi
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredBorrowings.map(
                (borrowing, index) => {

                  const book =
                    books.find(
                      (item) =>
                        item.id ===
                        borrowing.bukuId
                    );


                  return (

                    <tr
                      key={borrowing.id}
                    >


                      {/* NO */}

                      <td>
                        {index + 1}
                      </td>


                      {/* PEMINJAM */}

                      <td>

                        <div className="borrower-name">

                          <div className="borrower-avatar">

                            {borrowing.namaPeminjam
                              .charAt(0)
                              .toUpperCase()}

                          </div>


                          <span>
                            {borrowing.namaPeminjam}
                          </span>

                        </div>

                      </td>


                      {/* BUKU */}

                      <td>

                        <div className="book-name">

                          <strong>
                            {book?.title ||
                              "Buku tidak ditemukan"}
                          </strong>


                          <small>
                            {book?.author ||
                              "-"}
                          </small>

                        </div>

                      </td>


                      {/* TANGGAL PINJAM */}

                      <td>
                        {borrowing.tanggalPinjam}
                      </td>


                      {/* JATUH TEMPO */}

                      <td>
                        {borrowing.tanggalKembali}
                      </td>


                      {/* AKSI */}

                      <td>

                        <div className="action-buttons">


                          {/* DETAIL */}

                          <button
                            className="btn-detail"
                            onClick={() =>
                              handleDetail(
                                borrowing
                              )
                            }
                          >
                            Detail
                          </button>


                          {/* KEMBALIKAN */}

                          <button
                            className="btn-return"
                            onClick={() =>
                              handleReturn(
                                borrowing.id
                              )
                            }
                          >
                            Kembalikan
                          </button>


                          {/* HAPUS */}

                          <button
                            className="btn-delete"
                            onClick={() =>
                              handleDelete(
                                borrowing.id
                              )
                            }
                          >
                            Hapus
                          </button>


                        </div>

                      </td>

                    </tr>

                  );

                }
              )}


              {/* DATA KOSONG */}

              {filteredBorrowings.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="empty-peminjaman"
                  >
                    Tidak ada data peminjaman.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>



      {/* =========================================
          MODAL TAMBAH PEMINJAMAN
      ========================================= */}

      {showTambah && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowTambah(false)
          }
        >

          <div
            className="modal-box"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Tambah Peminjaman
                </h2>

                <p>
                  Tambahkan data peminjaman buku
                </p>

              </div>


              <button
                className="modal-close"
                onClick={() =>
                  setShowTambah(false)
                }
              >
                <X size={18} />
              </button>

            </div>


            {/* FORM */}

            <form
              onSubmit={handleTambah}
              className="peminjaman-form"
            >


              {/* NAMA */}

              <div className="form-group">

                <label>
                  Nama Peminjam
                </label>

                <input
                  type="text"
                  placeholder="Masukkan nama peminjam"
                  value={namaPeminjam}
                  onChange={(e) =>
                    setNamaPeminjam(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* BUKU */}

              <div className="form-group">

                <label>
                  Buku
                </label>

                <select
                  value={bukuId}
                  onChange={(e) =>
                    setBukuId(
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Pilih buku
                  </option>


                  {books.map((book) => (

                    <option
                      key={book.id}
                      value={book.id}
                      disabled={
                        book.stock <= 0
                      }
                    >

                      {book.title}
                      {" "}
                      - Stok: {book.stock}

                    </option>

                  ))}

                </select>

              </div>


              {/* TANGGAL PINJAM */}

              <div className="form-group">

                <label>
                  Tanggal Pinjam
                </label>

                <input
                  type="date"
                  value={tanggalPinjam}
                  onChange={(e) =>
                    setTanggalPinjam(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* TANGGAL KEMBALI */}

              <div className="form-group">

                <label>
                  Jatuh Tempo
                </label>

                <input
                  type="date"
                  value={tanggalKembali}
                  onChange={(e) =>
                    setTanggalKembali(
                      e.target.value
                    )
                  }
                />

              </div>


              {/* BUTTON */}

              <div className="modal-actions">

                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() =>
                    setShowTambah(false)
                  }
                >
                  Batal
                </button>


                <button
                  type="submit"
                  className="btn-modal-save"
                >
                  Simpan Peminjaman
                </button>

              </div>

            </form>

          </div>

        </div>

      )}



      {/* =========================================
          MODAL DETAIL
      ========================================= */}

      {showDetail &&
        selectedBorrowing && (

          <div
            className="modal-overlay"
            onClick={() =>
              setShowDetail(false)
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
                    Detail Peminjaman
                  </h2>

                  <p>
                    Informasi lengkap peminjaman
                  </p>

                </div>


                <button
                  className="modal-close"
                  onClick={() =>
                    setShowDetail(false)
                  }
                >
                  <X size={18} />
                </button>

              </div>


              {/* DETAIL */}

              {(() => {

                const book =
                  books.find(
                    (item) =>
                      item.id ===
                      selectedBorrowing.bukuId
                  );


                return (

                  <div className="detail-content">


                    {/* PEMINJAM */}

                    <div className="detail-row">

                      <span>
                        Nama Peminjam
                      </span>

                      <strong>
                        {
                          selectedBorrowing
                            .namaPeminjam
                        }
                      </strong>

                    </div>


                    {/* BUKU */}

                    <div className="detail-row">

                      <span>
                        Buku
                      </span>

                      <strong>
                        {book?.title ||
                          "Buku tidak ditemukan"}
                      </strong>

                    </div>


                    {/* PENULIS */}

                    <div className="detail-row">

                      <span>
                        Penulis
                      </span>

                      <strong>
                        {book?.author || "-"}
                      </strong>

                    </div>


                    {/* TANGGAL PINJAM */}

                    <div className="detail-row">

                      <span>
                        Tanggal Pinjam
                      </span>

                      <strong>
                        {
                          selectedBorrowing
                            .tanggalPinjam
                        }
                      </strong>

                    </div>


                    {/* JATUH TEMPO */}

                    <div className="detail-row">

                      <span>
                        Jatuh Tempo
                      </span>

                      <strong>
                        {
                          selectedBorrowing
                            .tanggalKembali
                        }
                      </strong>

                    </div>


                    {/* STATUS */}

                    <div className="detail-row">

                      <span>
                        Status
                      </span>

                      <strong className="status-dipinjam">
                        Sedang Dipinjam
                      </strong>

                    </div>


                  </div>

                );

              })()}


              {/* FOOTER */}

              <div className="modal-actions">

                <button
                  className="btn-modal-cancel"
                  onClick={() =>
                    setShowDetail(false)
                  }
                >
                  Tutup
                </button>

              </div>

            </div>

          </div>

        )}

    </div>

  );

}


export default Peminjaman;