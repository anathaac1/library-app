import { useBook } from "../context/BookContext";




function Dashboard() {

  // =================================
  // AMBIL DATA DARI BOOK CONTEXT
  // =================================

  const {
    books,
    borrowings,
    returns,
  } = useBook();


  // =================================
  // TOTAL BUKU
  // =================================
  //
  // Menghitung jumlah stok semua buku
  //
  const totalBooks =
    books.reduce(
      (total, book) =>
        total + Number(book.stock || 0),
      0
    );


  // =================================
  // TOTAL GENRE
  // =================================
  //
  // Mengambil genre yang tidak kosong
  // lalu menghilangkan genre yang sama
  //

  const totalGenres =
    new Set(
      books
        .map((book) => book.genre)
        .filter((genre) => genre)
    ).size;


  // =================================
  // TOTAL PEMINJAMAN
  // =================================

  const totalBorrowings =
    borrowings.length;


  // =================================
  // TOTAL PENGEMBALIAN
  // =================================

  const totalReturns =
    returns.length;


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
            📚
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
            🏷️
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
            📖
          </div>


          <span>
            Peminjaman
          </span>


          <strong>
            {totalBorrowings}
          </strong>


          <small>
            Total peminjaman
          </small>

        </div>


        {/* =================================
            PENGEMBALIAN
        ================================= */}

        <div className="stat-card">

          <div className="stat-icon">
            ↩️
          </div>


          <span>
            Pengembalian
          </span>


          <strong>
            {totalReturns}
          </strong>


          <small>
            Total pengembalian
          </small>

        </div>


      </div>

    </div>

  );

}


export default Dashboard;