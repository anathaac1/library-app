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

  // =================================
  // DATA DARI BOOK CONTEXT
  // =================================

  const {
    books,
    borrowings,
    returns,
  } = useBook();


  // =================================
  // TOTAL BUKU
  // =================================

  const totalBooks =
    books.reduce(
      (total, book) =>
        total + Number(book.stock || 0),
      0
    );


  // =================================
  // TOTAL GENRE
  // =================================

  const totalGenres =
    new Set(
      books
        .map((book) => book.genre)
        .filter((genre) => genre)
    ).size;


  // =================================
  // PEMINJAMAN AKTIF
  // =================================

  const totalBorrowings =
    borrowings.length;


  // =================================
  // TOTAL PENGEMBALIAN
  // =================================

  const totalReturns =
    returns.length;


  // =================================
  // FORMAT TANGGAL
  // =================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const parts = date.split("/");

    if (parts.length !== 3) {
      return date;
    }

    const day = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const year = Number(parts[2]);

    const parsedDate =
      new Date(
        year,
        month,
        day
      );

    return parsedDate.toLocaleDateString(
      "id-ID",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =================================
  // PARSE TANGGAL
  // =================================

  const parseDate = (date) => {

    if (!date) {
      return null;
    }

    const parts = date.split("/");

    if (parts.length !== 3) {
      return null;
    }

    return new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0])
    );
  };


  // =================================
  // HARI INI
  // =================================

  const today = new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );


  // =================================
  // FORMAT HARI INI
  // =================================

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


  // =================================
  // PEMINJAMAN TERLAMBAT
  // =================================

  const overdueBorrowings =
    borrowings
      .filter((borrowing) => {

        const dueDate =
          parseDate(
            borrowing.tanggalKembali
          );

        return (
          dueDate &&
          dueDate < today
        );

      })
      .map((borrowing) => {

        const dueDate =
          parseDate(
            borrowing.tanggalKembali
          );

        const difference =
          today.getTime() -
          dueDate.getTime();

        const daysLate =
          Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
          );

        const book =
          books.find(
            (item) =>
              item.id === borrowing.bukuId
          );

        return {
          ...borrowing,

          bookTitle:
            book?.title ||
            "Buku tidak ditemukan",

          daysLate,
        };

      });


  // =================================
  // AKTIVITAS TERBARU
  // =================================

  const borrowingActivities =
    borrowings.map((borrowing) => {

      const book =
        books.find(
          (item) =>
            item.id === borrowing.bukuId
        );

      return {
        id:
          `borrow-${borrowing.id}`,

        type:
          "peminjaman",

        name:
          borrowing.namaPeminjam,

        book:
          book?.title ||
          "Buku tidak ditemukan",

        date:
          parseDate(
            borrowing.tanggalPinjam
          ),

        dateText:
          formatDate(
            borrowing.tanggalPinjam
          ),
      };

    });


  const returnActivities =
    returns.map((item) => {

      return {
        id:
          `return-${item.id}`,

        type:
          "pengembalian",

        name:
          item.namaPeminjam,

        book:
          item.namaBuku,

        date:
          parseDate(
            item.tanggalDikembalikan
          ),

        dateText:
          formatDate(
            item.tanggalDikembalikan
          ),
      };

    });


  const recentActivities =
    [
      ...borrowingActivities,
      ...returnActivities,
    ]
      .sort((a, b) => {

        if (!a.date) return 1;
        if (!b.date) return -1;

        return (
          b.date.getTime() -
          a.date.getTime()
        );

      })
      .slice(0, 5);


  // =================================
  // INISIAL NAMA
  // =================================

  const getInitial =
    (name) => {

      if (!name) {
        return "?";
      }

      return name
        .charAt(0)
        .toUpperCase();

    };


  return (

    <div className="dashboard">


      {/* =================================
          HEADER
      ================================= */}

      <div className="page-header">

        <div>

          <span className="breadcrumb">
            Pages / Dashboard
          </span>

          <h1>
            Dashboard
          </h1>

          <p>
            Selamat datang kembali di sistem perpustakaan.
          </p>

        </div>


        {/* TANGGAL */}

        <div className="today">

          <span>
            Hari ini
          </span>

          <strong>
            {todayText}
          </strong>

        </div>

      </div>


      {/* =================================
          STAT CARD
      ================================= */}

      <div className="stat-grid">


        {/* =================================
            TOTAL BUKU
        ================================= */}

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


        {/* =================================
            TOTAL GENRE
        ================================= */}

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


        {/* =================================
            PEMINJAMAN
        ================================= */}

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


        {/* =================================
            PENGEMBALIAN
        ================================= */}

     
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


      {/* =================================
          DASHBOARD BOTTOM
      ================================= */}

      <div className="dashboard-bottom">


        {/* =================================
            AKTIVITAS TERBARU
        ================================= */}

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

                    {/* ICON */}

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


                    {/* INFO */}

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


                    {/* TANGGAL */}

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


        {/* =================================
            BUKU BELUM DIKEMBALIKAN
        ================================= */}

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


            {/* JUMLAH */}

            <div className="overdue-count">

              {overdueBorrowings.length}

            </div>

          </div>


          {overdueBorrowings.length > 0 ? (

            <div className="overdue-list">

              {overdueBorrowings.map(
                (borrowing) => (

                  <div
                    className="overdue-item"
                    key={borrowing.id}
                  >

                    {/* AVATAR */}

                    <div className="overdue-avatar">

                      {getInitial(
                        borrowing.namaPeminjam
                      )}

                    </div>


                    {/* INFO */}

                    <div className="overdue-info">

                      <strong>
                        {borrowing.namaPeminjam}
                      </strong>

                      <span>
                        {borrowing.bookTitle}
                      </span>

                    </div>


                    {/* TANGGAL */}

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