import { useState } from "react";

import {
  Search,
  Download,
  X,
} from "lucide-react";

import { useBook } from "../context/BookContext";

import "../css/Pengembalian.css";


function Pengembalian() {

  const {
    returns,
    deleteReturn,
  } = useBook();


  const [search, setSearch] =
    useState("");


  // =================================
  // DETAIL PENGEMBALIAN
  // =================================

  const [selectedReturn, setSelectedReturn] =
    useState(null);


  // =================================
  // PARSE TANGGAL
  // =================================

  const parseTanggal = (tanggal) => {

    if (!tanggal) {
      return null;
    }


    const parts =
      tanggal.split("/");


    if (parts.length !== 3) {
      return null;
    }


    const day =
      Number(parts[0]);

    const month =
      Number(parts[1]) - 1;

    const year =
      Number(parts[2]);


    return new Date(
      year,
      month,
      day
    );

  };


  // =================================
  // CEK TERLAMBAT
  // =================================

  const isLate = (item) => {

    const tanggalJatuhTempo =
      parseTanggal(
        item.tanggalJatuhTempo
      );


    const tanggalDikembalikan =
      parseTanggal(
        item.tanggalDikembalikan
      );


    if (
      !tanggalJatuhTempo ||
      !tanggalDikembalikan
    ) {
      return false;
    }


    return (
      tanggalDikembalikan >
      tanggalJatuhTempo
    );

  };


  // =================================
  // CARI DATA PENGEMBALIAN
  // =================================

  const filteredReturns =
    returns.filter(
      (item) => {

        const namaPeminjam =
          item.namaPeminjam || "";


        const namaBuku =
          item.namaBuku || "";


        return (

          `${namaPeminjam} ${namaBuku}`
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )

        );

      }
    );


  // =================================
  // DETAIL
  // =================================

  const handleDetail = (item) => {

    setSelectedReturn(item);

  };


  // =================================
  // TUTUP DETAIL
  // =================================

  const closeDetail = () => {

    setSelectedReturn(null);

  };


  // =================================
  // EXPORT CSV
  // =================================

  const handleExport = () => {

    if (
      filteredReturns.length === 0
    ) {

      alert(
        "Tidak ada data pengembalian untuk diekspor."
      );

      return;

    }


    const headers = [

      "No",
      "Nama Peminjam",
      "Judul Buku",
      "Tanggal Pinjam",
      "Tanggal Jatuh Tempo",
      "Tanggal Dikembalikan",
      "Status",

    ];


    const rows =
      filteredReturns.map(
        (item, index) => {

          const terlambat =
            isLate(item);


          return [

            index + 1,

            item.namaPeminjam || "-",

            item.namaBuku || "-",

            item.tanggalPinjam || "-",

            item.tanggalJatuhTempo || "-",

            item.tanggalDikembalikan || "-",

            terlambat
              ? "Terlambat"
              : "Sudah Dikembalikan",

          ];

        }
      );


    const csvContent = [

      headers,

      ...rows,

    ]
      .map((row) =>

        row
          .map((value) => {

            const text =
              String(value)
                .replace(/"/g, '""');


            return `"${text}"`;

          })
          .join(",")

      )
      .join("\n");


    const BOM =
      "\uFEFF";


    const blob =
      new Blob(

        [
          BOM + csvContent
        ],

        {
          type:
            "text/csv;charset=utf-8;",
        }

      );


    const url =
      URL.createObjectURL(blob);


    const link =
      document.createElement("a");


    link.href =
      url;


    link.download =
      "laporan-pengembalian.csv";


    document.body.appendChild(
      link
    );


    link.click();


    document.body.removeChild(
      link
    );


    URL.revokeObjectURL(
      url
    );

  };


  // =================================
  // HAPUS PENGEMBALIAN
  // =================================

  const handleDelete = (id) => {

    const yakin =
      window.confirm(
        "Apakah kamu yakin ingin menghapus data pengembalian ini?"
      );


    if (!yakin) {
      return;
    }


    deleteReturn(id);

  };


  return (

    <div className="pengembalian-page">


      {/* =================================
          HEADER
      ================================= */}

      <div className="page-header">

        <div className="page-title">

          <span className="breadcrumb">
            Pages / Pengembalian
          </span>


          <h1>
            Pengembalian
          </h1>


          <p>
            Kelola data pengembalian buku
          </p>

        </div>


        {/* SEARCH + EXPORT */}

        <div className="pengembalian-actions">


          {/* SEARCH */}

          <div className="pengembalian-search">

            <Search
              size={15}
              className="search-icon"
            />


            <input
              type="text"
              placeholder="Cari pengembalian..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

          </div>


          {/* EXPORT */}

          <button
            className="btn-export"
            onClick={handleExport}
          >

            <Download
              size={14}
            />

            Export

          </button>

        </div>

      </div>


      {/* =================================
          TABLE
      ================================= */}

      <div className="pengembalian-card">

        <div className="table-wrapper">

          <table className="pengembalian-table">

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
                  Dikembalikan
                </th>

                <th>
                  Status
                </th>

                <th>
                  Aksi
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredReturns.map(
                (item, index) => {

                  const terlambat =
                    isLate(item);


                  return (

                    <tr
                      key={item.id}
                    >


                      {/* NO */}

                      <td>
                        {index + 1}
                      </td>


                      {/* PEMINJAM */}

                      <td>

                        <div className="borrower-name">

                          <div className="borrower-avatar">

                            {item.namaPeminjam
                              ?.charAt(0)
                              .toUpperCase()}

                          </div>


                          <span>
                            {item.namaPeminjam}
                          </span>

                        </div>

                      </td>


                      {/* BUKU */}

                      <td>

                        <div className="book-name">

                          <strong>
                            {item.namaBuku}
                          </strong>


                          <small>
                            {item.namaPenulis}
                          </small>

                        </div>

                      </td>


                      {/* TANGGAL PINJAM */}

                      <td>

                        <span className="date-normal">
                          {item.tanggalPinjam}
                        </span>

                      </td>


                      {/* JATUH TEMPO */}

                      <td>

                        <span className="date-normal">
                          {item.tanggalJatuhTempo}
                        </span>

                      </td>


                      {/* DIKEMBALIKAN */}

                      <td>

                        <span
                          className={
                            terlambat
                              ? "date-late"
                              : "date-normal"
                          }
                        >

                          {item.tanggalDikembalikan}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={
                            terlambat
                              ? "status-badge status-late"
                              : "status-badge status-returned"
                          }
                        >

                          {terlambat
                            ? "Terlambat"
                            : "Sudah Dikembalikan"}

                        </span>

                      </td>


                      {/* AKSI */}

                      <td>

                        <div className="action-buttons">


                          {/* DETAIL */}

                          <button
                            className="btn-detail"
                            title="Lihat Detail"
                            onClick={() =>
                              handleDetail(item)
                            }
                          >

                            Detail

                          </button>


                          {/* HAPUS */}

                          <button
                            className="btn-delete"
                            title="Hapus Pengembalian"
                            onClick={() =>
                              handleDelete(
                                item.id
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

              {filteredReturns.length === 0 && (

                <tr>

                  <td
                    colSpan="8"
                    className="empty-pengembalian"
                  >

                    Tidak ada data pengembalian.

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* =================================
          MODAL DETAIL
      ================================= */}

      {selectedReturn && (

        <div
          className="detail-overlay"
          onClick={closeDetail}
        >

          <div
            className="detail-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* HEADER MODAL */}

            <div className="detail-modal-header">

              <div>

                <h2>
                  Detail Pengembalian
                </h2>

                <p>
                  Informasi lengkap pengembalian buku
                </p>

              </div>


              <button
                className="detail-close"
                onClick={closeDetail}
              >

                <X size={18} />

              </button>

            </div>


            {/* CONTENT */}

            <div className="detail-content">


              {/* PEMINJAM */}

              <div className="detail-section">

                <span className="detail-label">
                  Nama Peminjam
                </span>

                <strong>
                  {selectedReturn.namaPeminjam}
                </strong>

              </div>


              {/* BUKU */}

              <div className="detail-section">

                <span className="detail-label">
                  Buku
                </span>

                <strong>
                  {selectedReturn.namaBuku}
                </strong>

                <small>
                  {selectedReturn.namaPenulis}
                </small>

              </div>


              {/* TANGGAL */}

              <div className="detail-row">


                <div className="detail-section">

                  <span className="detail-label">
                    Tanggal Pinjam
                  </span>

                  <strong>
                    {selectedReturn.tanggalPinjam}
                  </strong>

                </div>


                <div className="detail-section">

                  <span className="detail-label">
                    Jatuh Tempo
                  </span>

                  <strong>
                    {selectedReturn.tanggalJatuhTempo}
                  </strong>

                </div>


              </div>


              {/* TANGGAL KEMBALI */}

              <div className="detail-section">

                <span className="detail-label">
                  Tanggal Dikembalikan
                </span>

                <strong
                  className={
                    isLate(selectedReturn)
                      ? "detail-late"
                      : ""
                  }
                >
                  {selectedReturn.tanggalDikembalikan}
                </strong>

              </div>


              {/* STATUS */}

              <div className="detail-section">

                <span className="detail-label">
                  Status
                </span>

                <span
                  className={
                    isLate(selectedReturn)
                      ? "status-badge status-late"
                      : "status-badge status-returned"
                  }
                >

                  {isLate(selectedReturn)
                    ? "Terlambat"
                    : "Sudah Dikembalikan"}

                </span>

              </div>

            </div>


            {/* FOOTER */}

            <div className="detail-modal-footer">

              <button
                className="btn-detail-close"
                onClick={closeDetail}
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


export default Pengembalian;