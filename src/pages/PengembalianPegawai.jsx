import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import { useBook } from "../context/BookContext";

import "../css/Pengembalian.css";

function PengembalianPegawai() {
  const {
    borrowings = [],
    returns = [],
    returnBook,
  } = useBook();

  const [search, setSearch] = useState("");

  // =========================================
  // DATA PENGEMBALIAN
  // =========================================

  const filteredReturns = returns.filter(
    (item) => {
      const keyword =
        `${item.namaPeminjam || ""} ${
          item.namaBuku || ""
        }`.toLowerCase();

      return keyword.includes(
        search.toLowerCase()
      );
    }
  );

  // =========================================
  // DATA PEMINJAMAN AKTIF
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
  // KEMBALIKAN
  // =========================================

  const handleReturn = (id) => {
    const yakin = window.confirm(
      "Apakah buku ini sudah dikembalikan?"
    );

    if (!yakin) {
      return;
    }

    returnBook(id);

    alert(
      "Buku berhasil dikembalikan."
    );
  };

  // =========================================
  // RENDER
  // =========================================

  return (
    <div className="pengembalian-page">

      {/* HEADER */}

      <div className="page-header">

        <div className="page-title">

          <div className="breadcrumb">
            Pages / Pengembalian
          </div>

          <h1>
            Pengembalian
          </h1>

          <p>
            Kelola data pengembalian buku
            perpustakaan.
          </p>

        </div>

      </div>

      {/* SEARCH */}

      <div className="pengembalian-actions">

        <div className="pengembalian-search">

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
          BUKU YANG BELUM DIKEMBALIKAN
      ===================================== */}

      <div
        className="pengembalian-card"
        style={{
          marginBottom: "20px",
        }}
      >

        <div
          style={{
            padding: "20px",
            borderBottom:
              "1px solid #eee7dd",
          }}
        >

          <h2
            style={{
              margin: 0,
              fontSize: "17px",
              color: "#2f211c",
            }}
          >
            Peminjaman Aktif
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "10px",
              color: "#907a70",
            }}
          >
            Buku yang masih sedang dipinjam.
          </p>

        </div>

        <div className="table-wrapper">

          <table className="pengembalian-table">

            <thead>

              <tr>
                <th>No</th>
                <th>Peminjam</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Jatuh Tempo</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>

            </thead>

            <tbody>

              {filteredBorrowings.length ===
              0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "40px",
                    }}
                  >
                    Tidak ada buku yang
                    sedang dipinjam.
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
                          Sedang Dipinjam
                        </span>
                      </td>

                      <td>

                        <button
                          type="button"
                          onClick={() =>
                            handleReturn(
                              item.id
                            )
                          }
                          style={{
                            display:
                              "inline-flex",
                            alignItems:
                              "center",
                            gap: "5px",
                            padding:
                              "7px 10px",
                            border:
                              "1px solid #dfd4ca",
                            borderRadius:
                              "6px",
                            background:
                              "white",
                            color:
                              "#4d382f",
                            fontSize:
                              "9px",
                            fontWeight:
                              "600",
                            cursor:
                              "pointer",
                          }}
                        >

                          <RotateCcw
                            size={13}
                          />

                          Kembalikan

                        </button>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =====================================
          RIWAYAT PENGEMBALIAN
      ===================================== */}

      <div className="pengembalian-card">

        <div
          style={{
            padding: "20px",
            borderBottom:
              "1px solid #eee7dd",
          }}
        >

          <h2
            style={{
              margin: 0,
              fontSize: "17px",
              color: "#2f211c",
            }}
          >
            Riwayat Pengembalian
          </h2>

          <p
            style={{
              margin: "4px 0 0",
              fontSize: "10px",
              color: "#907a70",
            }}
          >
            Daftar buku yang sudah
            dikembalikan.
          </p>

        </div>

        <div className="table-wrapper">

          <table className="pengembalian-table">

            <thead>

              <tr>
                <th>No</th>
                <th>Peminjam</th>
                <th>Buku</th>
                <th>Tanggal Pinjam</th>
                <th>Jatuh Tempo</th>
                <th>Dikembalikan</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {filteredReturns.length ===
              0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign:
                        "center",
                      padding:
                        "40px",
                    }}
                  >
                    Belum ada data
                    pengembalian.
                  </td>

                </tr>

              ) : (

                filteredReturns.map(
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
                        {item.tanggalJatuhTempo}
                      </td>

                      <td>
                        {item.tanggalDikembalikan}
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
                              "#eee8df",
                            color:
                              "#5f5148",
                          }}
                        >
                          Sudah Dikembalikan
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

export default PengembalianPegawai;