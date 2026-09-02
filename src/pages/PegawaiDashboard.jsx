import {
  BookOpen,
  BookMarked,
  Undo2,
  Clock,
  List,
  ArrowDownToLine,
  ArrowUpFromLine,
  Tag,
} from "lucide-react";

import { useState } from "react";
import { useBook } from "../context/BookContext";

function PegawaiDashboard() {
  const {
    books = [],
    borrowingHistory = [],
    returns = [],
  } = useBook();

  const [showAllActivities, setShowAllActivities] =
    useState(false);

  // =====================================================
  // STATISTIK
  // =====================================================

  const totalBuku = books.length;

  const totalPeminjaman = borrowingHistory.length;

  const totalPengembalian = returns.length;

  const totalGenre = new Set(
    books
      .map((book) => book.genre)
      .filter((genre) => genre && genre.trim() !== "")
  ).size;

  // =====================================================
  // HELPER - KONVERSI TANGGAL
  // =====================================================

  const getTimestamp = (tanggal) => {
    if (!tanggal) return 0;

    // Format: DD/MM/YYYY
    if (tanggal.includes("/")) {
      const parts = tanggal.split("/");

      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const year = Number(parts[2]);

        return new Date(
          year,
          month,
          day
        ).getTime();
      }
    }

    // Format: YYYY-MM-DD
    if (tanggal.includes("-")) {
      const date = new Date(tanggal);

      if (!isNaN(date.getTime())) {
        return date.getTime();
      }
    }

    // Format tanggal lainnya
    const date = new Date(tanggal);

    if (!isNaN(date.getTime())) {
      return date.getTime();
    }

    return 0;
  };

  // =====================================================
  // FORMAT TANGGAL
  // =====================================================

  const formatTanggal = (tanggal) => {
    if (!tanggal || tanggal === "-") {
      return "-";
    }

    // Kalau format sudah DD/MM/YYYY
    if (tanggal.includes("/")) {
      const parts = tanggal.split("/");

      if (parts.length === 3) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];

        // Kalau tahun ditulis 2 digit
        if (year.length === 2) {
          year = `20${year}`;
        }

        day = day.padStart(2, "0");
        month = month.padStart(2, "0");

        return `${day}/${month}/${year}`;
      }
    }

    // Kalau format YYYY-MM-DD
    if (tanggal.includes("-")) {
      const parts = tanggal.split("-");

      if (parts.length === 3) {
        const [year, month, day] = parts;

        return `${day.padStart(
          2,
          "0"
        )}/${month.padStart(
          2,
          "0"
        )}/${year}`;
      }
    }

    return tanggal;
  };

  // =====================================================
  // AKTIVITAS PEMINJAMAN
  // =====================================================

  const aktivitasPeminjaman =
    borrowingHistory.map((item, index) => {
      const tanggal =
        item.tanggalPinjam ||
        item.tanggal ||
        "-";

      return {
        id: `pinjam-${item.id ?? index}`,

        type: "Peminjaman",

        nama:
          item.namaPeminjam ||
          item.peminjam ||
          "Pengguna",

        buku:
          item.namaBuku ||
          item.bookTitle ||
          item.judulBuku ||
          "Buku",

        penulis:
          item.namaPenulis ||
          item.author ||
          item.penulis ||
          "-",

        tanggal: tanggal,

        timestamp: getTimestamp(tanggal),
      };
    });

  // =====================================================
  // AKTIVITAS PENGEMBALIAN
  // =====================================================

  const aktivitasPengembalian =
    returns.map((item, index) => {
      const tanggal =
        item.tanggalDikembalikan ||
        item.tanggalPengembalian ||
        item.tanggal ||
        "-";

      return {
        id: `kembali-${item.id ?? index}`,

        type: "Pengembalian",

        nama:
          item.namaPeminjam ||
          item.peminjam ||
          "Pengguna",

        buku:
          item.namaBuku ||
          item.bookTitle ||
          item.judulBuku ||
          "Buku",

        penulis:
          item.namaPenulis ||
          item.author ||
          item.penulis ||
          "-",

        tanggal: tanggal,

        timestamp: getTimestamp(tanggal),
      };
    });

  // =====================================================
  // GABUNGKAN SEMUA AKTIVITAS
  // =====================================================

  const semuaAktivitas = [
    ...aktivitasPeminjaman,
    ...aktivitasPengembalian,
  ].sort((a, b) => {
    return b.timestamp - a.timestamp;
  });

  // =====================================================
  // AKTIVITAS YANG DITAMPILKAN
  // DEFAULT = 5 TERBARU
  // =====================================================

  const aktivitasTampil = showAllActivities
    ? semuaAktivitas
    : semuaAktivitas.slice(0, 5);

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div>

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="page-header">

        <div>

          <div className="breadcrumb">
            Pages / Dashboard
          </div>

          <h1>
            Dashboard
          </h1>

          <p>
            Selamat datang di sistem
            perpustakaan.
          </p>

        </div>

        <div className="today">

          <span>
            Akses
          </span>

          <strong>
            Pegawai
          </strong>

        </div>

      </div>


      {/* =================================================
          WELCOME CARD
      ================================================= */}

      <div className="welcome-card">

        <h2>
          Selamat Datang, Pegawai 👋
        </h2>

        <p>
          Kelola kegiatan perpustakaan
          dengan mudah melalui sistem
          informasi perpustakaan.
        </p>

      </div>


      {/* =================================================
          STATISTIC
      ================================================= */}

      <div className="stat-grid">


        {/* TOTAL BUKU */}

        <div className="stat-card">

          <div className="stat-icon">
            <BookOpen size={18} />
          </div>

          <span>
            Total Buku
          </span>

          <strong>
            {totalBuku}
          </strong>

          <small>
            Buku tersedia
          </small>

        </div>


        {/* TOTAL GENRE */}

        <div className="stat-card">

          <div className="stat-icon">
            <Tag size={18} />
          </div>

          <span>
            Total Genre
          </span>

          <strong>
            {totalGenre}
          </strong>

          <small>
            Genre tersedia
          </small>

        </div>


        {/* PEMINJAMAN */}

        <div className="stat-card">

          <div className="stat-icon">
            <BookMarked size={18} />
          </div>

          <span>
            Peminjaman
          </span>

          <strong>
            {totalPeminjaman}
          </strong>

          <small>
            Total peminjaman
          </small>

        </div>


        {/* PENGEMBALIAN */}

        <div className="stat-card">

          <div className="stat-icon">
            <Undo2 size={18} />
          </div>

          <span>
            Pengembalian
          </span>

          <strong>
            {totalPengembalian}
          </strong>

          <small>
            Total pengembalian
          </small>

        </div>

      </div>


      {/* =================================================
          AKTIVITAS TERBARU
      ================================================= */}

      <div className="summary-card activity-card">


        {/* HEADER AKTIVITAS */}

        <div className="activity-header">

          <div className="stat-icon">
            <Clock size={18} />
          </div>

          <div>

            <h2>
              Aktivitas Terbaru
            </h2>

            <p>
              Daftar aktivitas peminjaman
              dan pengembalian terbaru.
            </p>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div className="activity-table">


          {/* TABLE HEADER */}

          <div className="activity-table-header">

            <div>
              No
            </div>

            <div>
              Jenis Aktivitas
            </div>

            <div>
              Buku
            </div>

            <div>
              Peminjam
            </div>

            <div>
              Tanggal
            </div>

          </div>


          {/* =================================================
              TABLE BODY
          ================================================= */}

          <div className="activity-list">

            {aktivitasTampil.length === 0 ? (

              <div className="activity-empty">
                Belum ada aktivitas.
              </div>

            ) : (

              aktivitasTampil.map(
                (activity, index) => (

                  <div
                    className="activity-row"
                    key={activity.id}
                  >


                    {/* NO */}

                    <div className="activity-number">
                      {index + 1}
                    </div>


                    {/* JENIS AKTIVITAS */}

                    <div className="activity-type">

                      <span
                        className={
                          activity.type ===
                          "Peminjaman"
                            ? "activity-badge borrowing"
                            : "activity-badge returning"
                        }
                      >

                        {activity.type ===
                        "Peminjaman" ? (

                          <ArrowDownToLine
                            size={14}
                          />

                        ) : (

                          <ArrowUpFromLine
                            size={14}
                          />

                        )}

                        <span>
                          {activity.type}
                        </span>

                      </span>

                    </div>


                    {/* BUKU */}

                    <div className="activity-book">

                      <strong>
                        {activity.buku}
                      </strong>

                      <small>
                        {activity.penulis}
                      </small>

                    </div>


                    {/* PEMINJAM */}

                    <div className="activity-borrower">

                      <strong>
                        {activity.nama}
                      </strong>

                    </div>


                    {/* TANGGAL */}

                    <div className="activity-date">

                      {formatTanggal(
                        activity.tanggal
                      )}

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        {/* =================================================
            LIHAT SEMUA AKTIVITAS
        ================================================= */}

        {semuaAktivitas.length > 5 && (

          <div className="activity-footer">

            <button
              type="button"
              className="activity-more-btn"
              onClick={() =>
                setShowAllActivities(
                  (current) => !current
                )
              }
            >

              <List size={16} />

              <span>
                {showAllActivities
                  ? "Tampilkan lebih sedikit"
                  : "Lihat semua aktivitas"}
              </span>

            </button>

          </div>

        )}

      </div>

    </div>
  );
}

export default PegawaiDashboard;