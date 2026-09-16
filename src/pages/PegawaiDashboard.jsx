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
    genres = [],
    borrowings = [],
    borrowingHistory = [],
    returns = [],
  } = useBook();

  const [showAllActivities, setShowAllActivities] =
    useState(false);

  // =====================================================
  // STATISTIK
  // =====================================================

  const totalBuku = books.length;

const totalGenre = genres.length;

const totalPeminjaman = borrowings.length;

const totalPengembalian = returns.length;

  // =====================================================
  // HELPER TANGGAL
  // =====================================================

  const getTimestamp = (tanggal) => {
    if (!tanggal || tanggal === "-") {
      return 0;
    }

    const value = String(tanggal).trim();

    // DD/MM/YYYY
    if (value.includes("/")) {
      const parts = value.split("/");

      if (parts.length === 3) {
        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;

        const year =
          String(parts[2]).length === 2
            ? Number(`20${parts[2]}`)
            : Number(parts[2]);

        const date = new Date(
          year,
          month,
          day
        );

        if (!isNaN(date.getTime())) {
          return date.getTime();
        }
      }
    }

    // YYYY-MM-DD
    if (value.includes("-")) {
      const parts = value.split("-");

      if (parts.length === 3) {
        const [year, month, day] = parts;

        const date = new Date(
          Number(year),
          Number(month) - 1,
          Number(day)
        );

        if (!isNaN(date.getTime())) {
          return date.getTime();
        }
      }
    }

    const date = new Date(value);

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

    const value = String(tanggal).trim();

    // DD/MM/YYYY
    if (value.includes("/")) {
      const parts = value.split("/");

      if (parts.length === 3) {
        let day = parts[0];
        let month = parts[1];
        let year = parts[2];

        if (year.length === 2) {
          year = `20${year}`;
        }

        return `${day.padStart(
          2,
          "0"
        )}/${month.padStart(
          2,
          "0"
        )}/${year}`;
      }
    }

    // YYYY-MM-DD
    if (value.includes("-")) {
      const parts = value.split("-");

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

    return value;
  };

  // =====================================================
  // AKTIVITAS PEMINJAMAN
  // =====================================================

  const aktivitasPeminjaman =
    borrowingHistory.map((item, index) => {
      const tanggal =
        item.tanggalPinjam ||
        item.tanggal ||
        item.createdAt ||
        "-";

      return {
        id: `pinjam-${item.id ?? index}`,

        type: "Peminjaman",

        nama:
          item.namaPeminjam ||
          item.peminjam ||
          item.nama ||
          item.userName ||
          "Pengguna",

        buku:
          item.namaBuku ||
          item.bookTitle ||
          item.judulBuku ||
          item.title ||
          "Buku",

        penulis:
          item.namaPenulis ||
          item.author ||
          item.penulis ||
          "-",

        tanggal,

        timestamp:
          getTimestamp(tanggal),
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
        item.tanggalKembali ||
        item.tanggal ||
        item.createdAt ||
        "-";

      return {
        id: `kembali-${item.id ?? index}`,

        type: "Pengembalian",

        nama:
          item.namaPeminjam ||
          item.peminjam ||
          item.nama ||
          item.userName ||
          "Pengguna",

        buku:
          item.namaBuku ||
          item.bookTitle ||
          item.judulBuku ||
          item.title ||
          "Buku",

        penulis:
          item.namaPenulis ||
          item.author ||
          item.penulis ||
          "-",

        tanggal,

        timestamp:
          getTimestamp(tanggal),
      };
    });

  // =====================================================
  // GABUNGKAN AKTIVITAS
  // =====================================================

  const semuaAktivitas = [
    ...aktivitasPeminjaman,
    ...aktivitasPengembalian,
  ].sort(
    (a, b) =>
      b.timestamp - a.timestamp
  );

  // =====================================================
  // AKTIVITAS YANG DITAMPILKAN
  // =====================================================

  const aktivitasTampil =
    showAllActivities
      ? semuaAktivitas
      : semuaAktivitas.slice(0, 5);

  // =====================================================
  // STYLE
  // =====================================================

  const styles = {
    page: {
      width: "100%",
      minHeight: "100%",
      color: "var(--text-main, #2f211c)",
    },

    header: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "20px",
      marginBottom: "25px",
    },

    breadcrumb: {
      display: "block",
      marginBottom: "5px",
      fontSize: "11px",
      color: "var(--text-muted, #9b8378)",
    },

    title: {
      margin: "0",
      fontSize: "27px",
      fontWeight: "700",
      color: "var(--text-main, #2f211c)",
    },

    subtitle: {
      margin: "6px 0 0",
      fontSize: "12px",
      color: "var(--text-muted, #907a70)",
    },

    access: {
      minWidth: "100px",
      padding: "10px 14px",
      borderRadius: "9px",
      background: "var(--card-bg, #ffffff)",
      border:
        "1px solid var(--border, #e6ddd4)",
      textAlign: "right",
    },

    accessLabel: {
      display: "block",
      fontSize: "9px",
      color: "var(--text-muted, #9b8378)",
      marginBottom: "3px",
    },

    accessValue: {
      display: "block",
      fontSize: "12px",
      color: "var(--text-main, #3b2119)",
    },

    welcome: {
      padding: "24px 26px",
      marginBottom: "20px",
      borderRadius: "12px",
      background:
        "var(--primary-dark, #3b2119)",
      color: "#ffffff",
      boxShadow:
        "0 4px 15px rgba(59,33,25,0.10)",
    },

    welcomeTitle: {
      margin: "0 0 7px",
      fontSize: "19px",
    },

    welcomeText: {
      margin: "0",
      maxWidth: "600px",
      fontSize: "11px",
      lineHeight: "1.7",
      color: "#eadbd5",
    },

    statGrid: {
      display: "grid",
      gridTemplateColumns:
        "repeat(4, minmax(0, 1fr))",
      gap: "15px",
      marginBottom: "20px",
    },

    statCard: {
      minHeight: "145px",
      padding: "18px",
      borderRadius: "12px",
      background:
        "var(--card-bg, #ffffff)",
      border:
        "1px solid var(--border, #e6ddd4)",
      boxShadow:
        "0 2px 10px rgba(59,33,25,0.05)",
    },

    statIcon: {
      width: "34px",
      height: "34px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "15px",
      borderRadius: "8px",
      background:
        "var(--soft-bg, #f1eadc)",
      color:
        "var(--primary-dark, #3b2119)",
    },

    statLabel: {
      display: "block",
      marginBottom: "5px",
      fontSize: "11px",
      color:
        "var(--text-muted-dark, #6e5b53)",
    },

    statNumber: {
      display: "block",
      marginBottom: "4px",
      fontSize: "23px",
      fontWeight: "700",
      color:
        "var(--text-main, #2f211c)",
    },

    statDescription: {
      fontSize: "9px",
      color:
        "var(--text-muted, #a18c83)",
    },

    activityCard: {
      width: "100%",
      overflow: "hidden",
      borderRadius: "12px",
      background:
        "var(--card-bg, #ffffff)",
      border:
        "1px solid var(--border, #e6ddd4)",
      boxShadow:
        "0 2px 10px rgba(59,33,25,0.05)",
    },

    activityHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "20px 22px",
      borderBottom:
        "1px solid var(--border, #e6ddd4)",
    },

    activityIcon: {
      width: "35px",
      height: "35px",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      background:
        "var(--soft-bg, #f1eadc)",
      color:
        "var(--primary-dark, #3b2119)",
    },

    activityTitle: {
      margin: "0 0 3px",
      fontSize: "16px",
      color:
        "var(--text-main, #2f211c)",
    },

    activityDescription: {
      margin: "0",
      fontSize: "10px",
      color:
        "var(--text-muted, #8c756b)",
    },

    // =====================================================
    // INI YANG DIUBAH
    // BODY AKTIVITAS SEKARANG PUNYA SCROLL
    // =====================================================

    tableWrapper: {
      width: "100%",
      overflowX: "auto",
      overflowY: showAllActivities
        ? "auto"
        : "hidden",

      // tinggi maksimal ketika "Lihat semua"
      maxHeight: showAllActivities
        ? "420px"
        : "none",

      // scrollbar tetap rapi
      scrollbarWidth: "thin",
    },

    tableHeader: {
      display: "grid",
      gridTemplateColumns:
        "55px 160px minmax(220px, 1fr) minmax(150px, 0.8fr) 110px",
      minWidth: "760px",
      padding: "12px 20px",
      background:
        "var(--table-head, #f8f5ef)",
      borderBottom:
        "1px solid var(--border, #e6ddd4)",

      // header tetap di atas saat scroll
      position: "sticky",
      top: 0,
      zIndex: 2,
    },

    tableHeaderItem: {
      fontSize: "9px",
      fontWeight: "700",
      color:
        "var(--text-muted-dark, #6e5b53)",
      textTransform: "uppercase",
    },

    row: {
      display: "grid",
      gridTemplateColumns:
        "55px 160px minmax(220px, 1fr) minmax(150px, 0.8fr) 110px",
      minWidth: "760px",
      minHeight: "65px",
      alignItems: "center",
      padding: "10px 20px",
      borderBottom:
        "1px solid var(--border, #eee6df)",
      background:
        "var(--card-bg, #ffffff)",
    },

    number: {
      fontSize: "10px",
      color:
        "var(--text-muted, #9b8378)",
    },

    badge: {
      display: "inline-flex",
      width: "fit-content",
      alignItems: "center",
      gap: "6px",
      padding: "6px 9px",
      borderRadius: "6px",
      fontSize: "9px",
      fontWeight: "600",
    },

    borrowingBadge: {
      background: "#f1eadc",
      color: "#3b2119",
    },

    returningBadge: {
      background: "#e9eee8",
      color: "#415542",
    },

    book: {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
      paddingRight: "15px",
    },

    bookTitle: {
      fontSize: "11px",
      fontWeight: "600",
      color:
        "var(--text-main, #2f211c)",
    },

    bookAuthor: {
      fontSize: "9px",
      color:
        "var(--text-muted, #927d73)",
    },

    borrower: {
      fontSize: "11px",
      fontWeight: "600",
      color:
        "var(--text-main, #2f211c)",
    },

    date: {
      fontSize: "10px",
      color:
        "var(--text-muted-dark, #6e5b53)",
    },

    empty: {
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "11px",
      color:
        "var(--text-muted, #9b8378)",
    },

    footer: {
      display: "flex",
      justifyContent: "center",
      padding: "14px 20px",
      borderTop:
        "1px solid var(--border, #e6ddd4)",
    },

    moreButton: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      border: "none",
      background: "transparent",
      color:
        "var(--primary-dark, #3b2119)",
      fontSize: "10px",
      fontWeight: "600",
      cursor: "pointer",
      padding: "6px 10px",
      borderRadius: "6px",
    },
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div style={styles.page}>

      {/* =================================================
          HEADER
      ================================================= */}

      <div style={styles.header}>

        <div>

          <span style={styles.breadcrumb}>
            Pages / Dashboard
          </span>

          <h1 style={styles.title}>
            Dashboard
          </h1>

          <p style={styles.subtitle}>
            Selamat datang di sistem
            perpustakaan.
          </p>

        </div>

        <div className="today">

          <span>
            Tanggal hari ini
          </span>

          <strong>
            {new Date().toLocaleDateString(
              "id-ID",
              {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }
            )}
          </strong>

        </div>

      </div>


      {/* =================================================
          WELCOME
      ================================================= */}

      <div style={styles.welcome}>

        <h2 style={styles.welcomeTitle}>
          Selamat Datang, Pegawai 👋
        </h2>

        <p style={styles.welcomeText}>
          Kelola kegiatan perpustakaan
          dengan mudah melalui sistem
          informasi perpustakaan.
        </p>

      </div>


      {/* =================================================
          STATISTIK
      ================================================= */}

      <div style={styles.statGrid}>

        {/* TOTAL BUKU */}

        <div style={styles.statCard}>

          <div style={styles.statIcon}>
            <BookOpen size={18} />
          </div>

          <span style={styles.statLabel}>
            Total Buku
          </span>

          <strong style={styles.statNumber}>
            {totalBuku}
          </strong>

          <small style={styles.statDescription}>
            Buku tersedia
          </small>

        </div>


        {/* TOTAL GENRE */}

        <div style={styles.statCard}>

          <div style={styles.statIcon}>
            <Tag size={18} />
          </div>

          <span style={styles.statLabel}>
            Total Genre
          </span>

          <strong style={styles.statNumber}>
            {totalGenre}
          </strong>

          <small style={styles.statDescription}>
            Genre tersedia
          </small>

        </div>


        {/* PEMINJAMAN */}

        <div style={styles.statCard}>

          <div style={styles.statIcon}>
            <BookMarked size={18} />
          </div>

          <span style={styles.statLabel}>
            Peminjaman
          </span>

          <strong style={styles.statNumber}>
            {totalPeminjaman}
          </strong>

          <small style={styles.statDescription}>
            Total peminjaman
          </small>

        </div>


        {/* PENGEMBALIAN */}

        <div style={styles.statCard}>

          <div style={styles.statIcon}>
            <Undo2 size={18} />
          </div>

          <span style={styles.statLabel}>
            Pengembalian
          </span>

          <strong style={styles.statNumber}>
            {totalPengembalian}
          </strong>

          <small style={styles.statDescription}>
            Total pengembalian
          </small>

        </div>

      </div>


      {/* =================================================
          AKTIVITAS
      ================================================= */}

      <div style={styles.activityCard}>

        {/* HEADER */}

        <div style={styles.activityHeader}>

          <div style={styles.activityIcon}>
            <Clock size={18} />
          </div>

          <div>

            <h2 style={styles.activityTitle}>
              Aktivitas Terbaru
            </h2>

            <p style={styles.activityDescription}>
              Daftar aktivitas peminjaman
              dan pengembalian terbaru.
            </p>

          </div>

        </div>


        {/* =================================================
            TABLE
        ================================================= */}

        <div style={styles.tableWrapper}>

          {/* HEADER TABLE */}

          <div style={styles.tableHeader}>

            <div style={styles.tableHeaderItem}>
              No
            </div>

            <div style={styles.tableHeaderItem}>
              Jenis Aktivitas
            </div>

            <div style={styles.tableHeaderItem}>
              Buku
            </div>

            <div style={styles.tableHeaderItem}>
              Peminjam
            </div>

            <div style={styles.tableHeaderItem}>
              Tanggal
            </div>

          </div>


          {/* BODY */}

          {aktivitasTampil.length === 0 ? (

            <div style={styles.empty}>
              Belum ada aktivitas.
            </div>

          ) : (

            aktivitasTampil.map(
              (activity, index) => (

                <div
                  key={activity.id}
                  style={styles.row}
                >

                  {/* NO */}

                  <div style={styles.number}>
                    {index + 1}
                  </div>


                  {/* JENIS */}

                  <div>

                    <span
                      style={{
                        ...styles.badge,

                        ...(activity.type ===
                        "Peminjaman"
                          ? styles.borrowingBadge
                          : styles.returningBadge),
                      }}
                    >

                      {activity.type ===
                      "Peminjaman" ? (

                        <ArrowDownToLine
                          size={13}
                        />

                      ) : (

                        <ArrowUpFromLine
                          size={13}
                        />

                      )}

                      <span>
                        {activity.type}
                      </span>

                    </span>

                  </div>


                  {/* BUKU */}

                  <div style={styles.book}>

                    <strong
                      style={styles.bookTitle}
                    >
                      {activity.buku}
                    </strong>

                    <small
                      style={styles.bookAuthor}
                    >
                      {activity.penulis}
                    </small>

                  </div>


                  {/* PEMINJAM */}

                  <div
                    style={styles.borrower}
                  >
                    {activity.nama}
                  </div>


                  {/* TANGGAL */}

                  <div style={styles.date}>
                    {formatTanggal(
                      activity.tanggal
                    )}
                  </div>

                </div>

              )
            )

          )}

        </div>


        {/* =================================================
            FOOTER
        ================================================= */}

        {semuaAktivitas.length > 5 && (

          <div style={styles.footer}>

            <button
              type="button"
              style={styles.moreButton}
              onClick={() =>
                setShowAllActivities(
                  (current) =>
                    !current
                )
              }
            >

              <List size={15} />

              <span>
                {showAllActivities
                  ? "Tampilkan lebih sedikit"
                  : "Lihat semua aktivitas"}
              </span>

            </button>

          </div>

        )}

      </div>


      {/* =================================================
          RESPONSIVE
      ================================================= */}

      <style>
        {`
          @media (max-width: 1000px) {
            .pegawai-stat-responsive {
              grid-template-columns: repeat(2, minmax(0, 1fr));
            }
          }

          @media (max-width: 650px) {
            .pegawai-stat-responsive {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

    </div>
  );
}

export default PegawaiDashboard;