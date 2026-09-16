import { useEffect, useState } from "react";
import { Search, BookMarked } from "lucide-react";

import { useBook } from "../context/BookContext";
import "../css/Peminjaman.css";

function PeminjamanPegawai() {
  const {
    books = [],
    borrowings = [],
    addBorrowing,
  } = useBook();

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    bukuId: "",
    namaPeminjam: "",
    tanggalPinjam: "",
    tanggalKembali: "",
  });

  // =========================================
  // AMBIL BUKU DARI DATA BUKU
  // =========================================

  useEffect(() => {
    const savedBook =
      localStorage.getItem("selectedBookForBorrowing");

    if (savedBook) {
      try {
        const book = JSON.parse(savedBook);

        setForm((current) => ({
          ...current,
          bukuId: String(book.id),
        }));

        localStorage.removeItem(
          "selectedBookForBorrowing"
        );
      } catch {
        localStorage.removeItem(
          "selectedBookForBorrowing"
        );
      }
    }
  }, []);

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================
  // TAMBAH PEMINJAMAN
  // =========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.bukuId ||
      !form.namaPeminjam.trim() ||
      !form.tanggalPinjam ||
      !form.tanggalKembali
    ) {
      alert("Semua data peminjaman wajib diisi.");
      return;
    }

    const selectedBook = books.find(
      (book) =>
        String(book.id) === String(form.bukuId)
    );

    if (!selectedBook) {
      alert("Buku tidak ditemukan.");
      return;
    }

    if (Number(selectedBook.stock) <= 0) {
      alert("Stok buku sedang habis.");
      return;
    }

    const result = addBorrowing({
      bukuId: selectedBook.id,
      namaPeminjam:
        form.namaPeminjam.trim(),
      tanggalPinjam:
        form.tanggalPinjam,
      tanggalKembali:
        form.tanggalKembali,
    });

    if (!result?.success) {
      alert(
        result?.message ||
          "Peminjaman gagal."
      );
      return;
    }

    alert("Peminjaman berhasil ditambahkan.");

    setForm({
      bukuId: "",
      namaPeminjam: "",
      tanggalPinjam: "",
      tanggalKembali: "",
    });
  };

  // =========================================
  // FILTER
  // =========================================

  const filteredBorrowings =
    borrowings.filter((item) => {
      const keyword =
        `${item.namaPeminjam || ""} ${
          item.namaBuku || ""
        }`.toLowerCase();

      return keyword.includes(
        search.toLowerCase()
      );
    });

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="peminjaman-page">

      {/* HEADER */}
      <div className="page-header">
        <div>
          <div className="breadcrumb">
            Pages / Peminjaman
          </div>

          <h1>Peminjaman</h1>

          <p>
            Kelola data peminjaman buku
            perpustakaan.
          </p>
        </div>
      </div>

      {/* =====================================
          FORM PEMINJAMAN
      ===================================== */}

      <div
        className="peminjaman-card"
        style={{
          marginBottom: "20px",
          padding: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "9px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#f5eee4",
              color: "#3b2119",
            }}
          >
            <BookMarked size={17} />
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "17px",
                color: "#2f211c",
              }}
            >
              Tambah Peminjaman
            </h2>

            <p
              style={{
                margin: "4px 0 0",
                fontSize: "10px",
                color: "#907a70",
              }}
            >
              Pilih buku dan tentukan peminjam.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(2, minmax(0, 1fr))",
              gap: "16px",
            }}
          >

            {/* BUKU */}
            <div className="form-group">
              <label>Buku</label>

              <select
                name="bukuId"
                value={form.bukuId}
                onChange={handleChange}
              >
                <option value="">
                  Pilih buku
                </option>

                {books.map((book) => (
                  <option
                    key={book.id}
                    value={book.id}
                    disabled={
                      Number(book.stock) <= 0
                    }
                  >
                    {book.title} — Stok:{" "}
                    {book.stock}
                  </option>
                ))}
              </select>
            </div>

            {/* PEMINJAM */}
            <div className="form-group">
              <label>Nama Peminjam</label>

              <input
                type="text"
                name="namaPeminjam"
                placeholder="Masukkan nama peminjam"
                value={form.namaPeminjam}
                onChange={handleChange}
              />
            </div>

            {/* TANGGAL PINJAM */}
            <div className="form-group">
              <label>Tanggal Pinjam</label>

              <input
                type="date"
                name="tanggalPinjam"
                value={form.tanggalPinjam}
                onChange={handleChange}
              />
            </div>

            {/* JATUH TEMPO */}
            <div className="form-group">
              <label>Jatuh Tempo</label>

              <input
                type="date"
                name="tanggalKembali"
                value={form.tanggalKembali}
                onChange={handleChange}
              />
            </div>

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "18px",
            }}
          >
            <button
              type="submit"
              className="btn-tambah-peminjaman"
            >
              <BookMarked size={15} />
              Simpan Peminjaman
            </button>
          </div>

        </form>
      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <div className="peminjaman-actions">

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
              setSearch(e.target.value)
            }
          />
        </div>

      </div>

      {/* =====================================
          TABLE
      ===================================== */}

      <div className="peminjaman-card">

        <div className="table-wrapper">

          <table className="peminjaman-table">

            <thead>
              <tr>
                <th>No</th>
                <th>Peminjam</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Jatuh Tempo</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredBorrowings.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "40px",
                    }}
                  >
                    Belum ada data peminjaman.
                  </td>
                </tr>

              ) : (

                filteredBorrowings.map(
                  (item, index) => (

                    <tr key={item.id}>

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item.namaPeminjam}
                      </td>

                      <td>
                        {item.namaBuku}
                      </td>

                      <td>
                        {item.tanggalPinjam}
                      </td>

                      <td>
                        {item.tanggalKembali}
                      </td>

                      <td>
                        <span
                          style={{
                            padding:
                              "5px 9px",
                            borderRadius:
                              "6px",
                            fontSize:
                              "9px",
                            fontWeight:
                              "600",
                            background:
                              "#f4e9df",
                            color:
                              "#70402d",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default PeminjamanPegawai;