import {
  BookOpen,
  Tags,
  BookMarked,
  RotateCcw,
  ArrowUpRight,
  Undo2,
  Check,
} from "lucide-react";

import { useBook } from "../context/BookContext";

function Dashboard() {

  // ==========================================
  // DATA
  // ==========================================

  const {
    books = [],
    borrowings = [],
    returns = [],
  } = useBook();


  // ==========================================
  // TOTAL BUKU
  // ==========================================

  const totalBooks =
    books.reduce(
      (total, book) =>
        total + Number(book.stock || 0),
      0
    );


  // ==========================================
  // TOTAL GENRE
  // ==========================================

  const totalGenres =
    new Set(
      books
        .map((book) => book.genre)
        .filter(Boolean)
    ).size;


  // ==========================================
  // PEMINJAMAN AKTIF
  // ==========================================

  const totalBorrowings =
    borrowings.length;


  // ==========================================
  // TOTAL PENGEMBALIAN
  // ==========================================

  const totalReturns =
    returns.length;


  // ==========================================
  // PARSE TANGGAL
  // ==========================================

  const parseDate = (value) => {

    if (!value) {
      return null;
    }

    if (value instanceof Date) {
      return isNaN(value.getTime())
        ? null
        : value;
    }

    if (typeof value === "number") {
      const date = new Date(value);

      return isNaN(date.getTime())
        ? null
        : date;
    }

    if (typeof value !== "string") {
      return null;
    }

    const text = value.trim();

    if (!text) {
      return null;
    }


    // DD/MM/YYYY

    if (text.includes("/")) {

      const parts = text.split("/");

      if (parts.length === 3) {

        const day = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const year = Number(parts[2]);

        const date = new Date(
          year,
          month,
          day
        );

        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }


    // YYYY-MM-DD

    if (text.includes("-")) {

      const parts = text.split("-");

      if (parts.length === 3) {

        const year = Number(parts[0]);
        const month = Number(parts[1]) - 1;
        const day = Number(parts[2]);

        const date = new Date(
          year,
          month,
          day
        );

        if (!isNaN(date.getTime())) {
          return date;
        }
      }
    }


    const date = new Date(text);

    return isNaN(date.getTime())
      ? null
      : date;
  };


  // ==========================================
  // FORMAT TANGGAL
  // ==========================================

  const formatDate = (value) => {

    const date = parseDate(value);

    if (!date) {
      return "-";
    }

    return date.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  // ==========================================
  // HARI INI
  // ==========================================

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  const todayText =
    today.toLocaleDateString(
      "id-ID",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );


  // ==========================================
  // CEK PEMINJAMAN SUDAH DIKEMBALIKAN
  // ==========================================

  const isAlreadyReturned = (borrowing) => {

    if (!borrowing) {
      return false;
    }

    // Kalau ada status pengembalian
    if (
      borrowing.status === "dikembalikan" ||
      borrowing.status === "returned" ||
      borrowing.status === "selesai"
    ) {
      return true;
    }

    // Cek berdasarkan ID peminjaman
    const borrowingId =
      borrowing.id ??
      borrowing.peminjamanId;

    if (borrowingId != null) {

      const found = returns.some(
        (item) =>
          String(
            item.peminjamanId ??
            item.borrowingId ??
            item.idPeminjaman
          ) === String(borrowingId)
      );

      if (found) {
        return true;
      }
    }

    return false;
  };


  // ==========================================
  // BELUM DIKEMBALIKAN / TERLAMBAT
  // ==========================================

  const overdueBorrowings =
    borrowings
      .filter(
        (borrowing) =>
          !isAlreadyReturned(borrowing)
      )
      .map((borrowing) => {

        const dueDate =
          parseDate(
            borrowing.tanggalKembali
          );

        if (!dueDate) {
          return null;
        }

        const book =
          books.find(
            (item) =>
              String(item.id) ===
              String(
                borrowing.bukuId
              )
          );

        const difference =
          today.getTime() -
          dueDate.getTime();

        const daysLate =
          Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
          );

        return {
          ...borrowing,

          bookTitle:
            borrowing.namaBuku ||
            borrowing.judulBuku ||
            borrowing.bookTitle ||
            book?.title ||
            "Buku tidak ditemukan",

          daysLate,
          dueDate,
        };
      })
      .filter(
        (borrowing) =>
          borrowing &&
          borrowing.dueDate < today
      );


  // ==========================================
  // AKTIVITAS PEMINJAMAN
  // ==========================================

  const borrowingActivities =
    borrowings.map(
      (borrowing, index) => {

        const book =
          books.find(
            (item) =>
              String(item.id) ===
              String(
                borrowing.bukuId
              )
          );

        const tanggal =
          borrowing.tanggalPinjam ||
          borrowing.createdAt ||
          null;

        return {
          id:
            `borrow-${borrowing.id ?? index}`,

          type:
            "peminjaman",

          name:
            borrowing.namaPeminjam ||
            borrowing.peminjam ||
            "Pengguna",

          book:
            borrowing.namaBuku ||
            borrowing.judulBuku ||
            borrowing.bookTitle ||
            book?.title ||
            "Buku tidak ditemukan",

          date:
            parseDate(tanggal),

          dateText:
            formatDate(tanggal),
        };
      }
    );


  // ==========================================
  // AKTIVITAS PENGEMBALIAN
  // ==========================================

  const returnActivities =
    returns.map(
      (item, index) => {

        const tanggal =
          item.tanggalDikembalikan ||
          item.tanggalPengembalian ||
          item.createdAt ||
          null;

        return {
          id:
            `return-${item.id ?? index}`,

          type:
            "pengembalian",

          name:
            item.namaPeminjam ||
            item.peminjam ||
            "Pengguna",

          book:
            item.namaBuku ||
            item.judulBuku ||
            item.bookTitle ||
            "Buku tidak ditemukan",

          date:
            parseDate(tanggal),

          dateText:
            formatDate(tanggal),
        };
      }
    );


  // ==========================================
  // GABUNG AKTIVITAS
  // ==========================================

  const recentActivities =
    [
      ...borrowingActivities,
      ...returnActivities,
    ]
      .sort((a, b) => {

        if (!a.date) {
          return 1;
        }

        if (!b.date) {
          return -1;
        }

        return (
          b.date.getTime() -
          a.date.getTime()
        );
      })
      .slice(0, 5);


  // ==========================================
  // INITIAL
  // ==========================================

  const getInitial = (name) => {

    if (!name) {
      return "?";
    }

    return name
      .charAt(0)
      .toUpperCase();
  };


  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="dashboard">

      {/* HEADER */}

      <div className="page-header">

        <div>

          <span className="breadcrumb">
            Pages / Dashboard
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Selamat datang kembali di
            sistem perpustakaan.
          </p>

        </div>

        <div className="today">

          <span>
            Hari ini
          </span>

          <strong>
            {todayText}
          </strong>

        </div>

      </div>


      {/* STATISTIC */}

      <div className="stat-grid">

        <div className="stat-card">

          <div className="stat-icon">
            <BookOpen
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <span>
            Total Buku
          </span>

          <strong>
            {totalBooks}
          </strong>

          <small>
            Buku tersedia
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <Tags
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <span>
            Total Genre
          </span>

          <strong>
            {totalGenres}
          </strong>

          <small>
            Genre tersedia
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <BookMarked
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <span>
            Peminjaman Aktif
          </span>

          <strong>
            {totalBorrowings}
          </strong>

          <small>
            Buku sedang dipinjam
          </small>

        </div>


        <div className="stat-card">

          <div className="stat-icon">
            <RotateCcw
              size={21}
              strokeWidth={1.8}
            />
          </div>

          <span>
            Pengembalian
          </span>

          <strong>
            {totalReturns}
          </strong>

          <small>
            Total buku dikembalikan
          </small>

        </div>

      </div>


      {/* BOTTOM */}

      <div className="dashboard-bottom">

        {/* AKTIVITAS */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>
                Aktivitas Terbaru
              </h2>

              <p>
                Peminjaman dan pengembalian buku
              </p>

            </div>

          </div>


          <div className="activity-list">

            {recentActivities.length > 0 ? (

              recentActivities.map(
                (activity) => (

                  <div
                    className="activity-item"
                    key={activity.id}
                  >

                    <div
                      className={`activity-icon ${activity.type}`}
                    >

                      {activity.type ===
                      "peminjaman" ? (
                        <ArrowUpRight
                          size={17}
                          strokeWidth={2}
                        />
                      ) : (
                        <Undo2
                          size={17}
                          strokeWidth={2}
                        />
                      )}

                    </div>


                    <div className="activity-info">

                      <strong>

                        {activity.name}

                        <span className="activity-action">

                          {activity.type ===
                          "peminjaman"
                            ? " meminjam "
                            : " mengembalikan "}

                        </span>

                        <b>
                          {activity.book}
                        </b>

                      </strong>

                      <span>
                        {activity.type ===
                        "peminjaman"
                          ? "Peminjaman buku"
                          : "Pengembalian buku"}
                      </span>

                    </div>


                    <div className="activity-date">
                      {activity.dateText}
                    </div>

                  </div>
                )
              )

            ) : (

              <div className="activity-empty">
                Belum ada aktivitas.
              </div>

            )}

          </div>

        </div>


        {/* BELUM DIKEMBALIKAN */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>

              <h2>
                Belum Dikembalikan
              </h2>

              <p>
                Peminjaman yang melewati batas waktu
              </p>

            </div>

            <div className="overdue-count">
              {overdueBorrowings.length}
            </div>

          </div>


          {overdueBorrowings.length > 0 ? (

            <div className="overdue-list">

              {overdueBorrowings.map(
<<<<<<< HEAD
                (borrowing) => ( 
=======
                (borrowing, index) => (
>>>>>>> origin/dashboard-pegawai

                  <div
                    className="overdue-item"
                    key={
                      borrowing.id ??
                      `overdue-${index}`
                    }
                  >

                    <div className="overdue-avatar">

                      {getInitial(
                        borrowing.namaPeminjam ||
                        borrowing.peminjam
                      )}

                    </div>


                    <div className="overdue-info">

                      <strong>
                        {borrowing.namaPeminjam ||
                          borrowing.peminjam ||
                          "Pengguna"}
                      </strong>

                      <span>
                        {borrowing.bookTitle}
                      </span>

                    </div>


                    <div className="overdue-date">

                      <small>
                        Jatuh tempo
                      </small>

                      <strong>
                        {formatDate(
                          borrowing.tanggalKembali
                        )}
                      </strong>

                      <em>
                        {borrowing.daysLate} hari
                      </em>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="overdue-empty">

              <div className="overdue-check">

                <Check
                  size={19}
                  strokeWidth={2.3}
                />

              </div>

              <strong>
                Semua buku sudah dikembalikan
              </strong>

              <span>
                Tidak ada peminjaman yang terlambat.
              </span>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;