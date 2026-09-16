import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { books as initialBooks } from "../data/dummyBuku";
import { borrowings as initialBorrowings } from "../data/dummyPeminjaman";

const BookContext = createContext(null);

// =====================================================
// LOCAL STORAGE HELPER
// =====================================================

const getStorageData = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key);

    if (saved !== null) {
      return JSON.parse(saved);
    }

    return defaultValue;
  } catch (error) {
    console.error(`Gagal membaca ${key}:`, error);
    return defaultValue;
  }
};


// =====================================================
// PROVIDER
// =====================================================

export function BookProvider({ children }) {

  // ===================================================
  // DATA BUKU
  // ===================================================

  const [books, setBooks] = useState(() =>
    getStorageData(
      "libraryBooks",
      initialBooks
    )
  );


  // ===================================================
  // DATA GENRE
  // ===================================================

  const [genres, setGenres] = useState(() =>
    getStorageData(
      "libraryGenres",
      [
        ...new Set(
          initialBooks
            .map((book) => book.genre)
            .filter(Boolean)
        ),
      ]
    )
  );


  // ===================================================
  // PEMINJAMAN AKTIF
  //
  // Isinya hanya buku yang BELUM dikembalikan.
  // ===================================================

  const [borrowings, setBorrowings] = useState(() =>
    getStorageData(
      "libraryBorrowings",
      initialBorrowings
    )
  );


  // ===================================================
  // RIWAYAT SEMUA PEMINJAMAN
  //
  // DATA INI TIDAK DIHAPUS ketika buku dikembalikan.
  //
  // Dashboard menggunakan data ini.
  // ===================================================

  const [borrowingHistory, setBorrowingHistory] =
    useState(() =>
      getStorageData(
        "libraryBorrowingHistory",
        initialBorrowings
      )
    );


  // ===================================================
  // DATA PENGEMBALIAN
  // ===================================================

  const [returns, setReturns] = useState(() =>
    getStorageData(
      "libraryReturns",
      []
    )
  );


  // ===================================================
  // SIMPAN BUKU
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      "libraryBooks",
      JSON.stringify(books)
    );
  }, [books]);


  // ===================================================
  // SIMPAN GENRE
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      "libraryGenres",
      JSON.stringify(genres)
    );
  }, [genres]);


  // ===================================================
  // SIMPAN PEMINJAMAN AKTIF
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      "libraryBorrowings",
      JSON.stringify(borrowings)
    );
  }, [borrowings]);


  // ===================================================
  // SIMPAN RIWAYAT PEMINJAMAN
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      "libraryBorrowingHistory",
      JSON.stringify(borrowingHistory)
    );
  }, [borrowingHistory]);


  // ===================================================
  // SIMPAN PENGEMBALIAN
  // ===================================================

  useEffect(() => {
    localStorage.setItem(
      "libraryReturns",
      JSON.stringify(returns)
    );
  }, [returns]);


  // ===================================================
  // TAMBAH BUKU
  // ===================================================

  const addBook = (newBook) => {

    const book = {
      id: Date.now(),

      title:
        newBook.title?.trim() || "",

      author:
        newBook.author?.trim() || "",

      publisher:
        newBook.publisher?.trim() || "",

      genre:
        newBook.genre?.trim() || "",

      stock:
        Number(newBook.stock) || 0,

      cover:
        newBook.cover?.trim() || "",
    };


    setBooks((currentBooks) => [
      ...currentBooks,
      book,
    ]);


    // Tambahkan genre kalau belum ada

    if (book.genre) {

      setGenres((currentGenres) => {

        const exists =
          currentGenres.some(
            (item) =>
              item.toLowerCase() ===
              book.genre.toLowerCase()
          );

        if (exists) {
          return currentGenres;
        }

        return [
          ...currentGenres,
          book.genre,
        ];
      });
    }
  };


  // ===================================================
  // UPDATE BUKU
  // ===================================================

  const updateBook = (
    bookId,
    updatedData
  ) => {

    const updatedBook = {
      title:
        updatedData.title?.trim() || "",

      author:
        updatedData.author?.trim() || "",

      publisher:
        updatedData.publisher?.trim() || "",

      genre:
        updatedData.genre?.trim() || "",

      stock:
        Number(updatedData.stock) || 0,

      cover:
        updatedData.cover?.trim() || "",
    };


    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.id === bookId
          ? {
              ...book,
              ...updatedBook,
            }
          : book
      )
    );


    // Tambahkan genre baru

    if (updatedBook.genre) {

      setGenres((currentGenres) => {

        const exists =
          currentGenres.some(
            (item) =>
              item.toLowerCase() ===
              updatedBook.genre.toLowerCase()
          );

        if (exists) {
          return currentGenres;
        }

        return [
          ...currentGenres,
          updatedBook.genre,
        ];
      });
    }
  };


  // ===================================================
  // HAPUS BUKU
  // ===================================================

  const deleteBook = (bookId) => {

    setBooks((currentBooks) =>
      currentBooks.filter(
        (book) =>
          book.id !== bookId
      )
    );
  };


  // ===================================================
  // TAMBAH GENRE
  // ===================================================

  const addGenre = (newGenre) => {

    const genre =
      newGenre.trim();

    if (!genre) {
      return false;
    }


    const exists =
      genres.some(
        (item) =>
          item.toLowerCase() ===
          genre.toLowerCase()
      );


    if (exists) {
      return false;
    }


    setGenres((currentGenres) => [
      ...currentGenres,
      genre,
    ]);


    return true;
  };


  // ===================================================
  // UPDATE GENRE
  // ===================================================

  const updateGenre = (
    oldGenre,
    newGenre
  ) => {

    const genre =
      newGenre.trim();

    if (!genre) {
      return false;
    }


    const exists =
      genres.some(
        (item) =>
          item !== oldGenre &&
          item.toLowerCase() ===
          genre.toLowerCase()
      );


    if (exists) {
      return false;
    }


    // Update daftar genre

    setGenres((currentGenres) =>
      currentGenres.map(
        (item) =>
          item === oldGenre
            ? genre
            : item
      )
    );


    // Update genre pada buku

    setBooks((currentBooks) =>
      currentBooks.map(
        (book) =>
          book.genre === oldGenre
            ? {
                ...book,
                genre,
              }
            : book
      )
    );


    return true;
  };


  // ===================================================
  // HAPUS GENRE
  // ===================================================

  const deleteGenre = (genre) => {

    setGenres((currentGenres) =>
      currentGenres.filter(
        (item) =>
          item !== genre
      )
    );


    // Buku yang memakai genre
    // dibuat tanpa genre

    setBooks((currentBooks) =>
      currentBooks.map(
        (book) =>
          book.genre === genre
            ? {
                ...book,
                genre: "",
              }
            : book
      )
    );
  };


  // ===================================================
  // TAMBAH PEMINJAMAN
  // ===================================================

  const addBorrowing = (newBorrowing) => {

    const book =
      books.find(
        (item) =>
          item.id ===
          newBorrowing.bukuId
      );


    // Buku tidak ditemukan

    if (!book) {

      return {
        success: false,
        message:
          "Buku tidak ditemukan.",
      };
    }


    // Stok habis

    if (book.stock <= 0) {

      return {
        success: false,
        message:
          "Stok buku sedang habis.",
      };
    }


    // =================================================
    // DATA PEMINJAMAN
    // =================================================

    const now = Date.now();

    const borrowingData = {

      ...newBorrowing,

      id: now,

      createdAt: now,

      namaBuku:
        newBorrowing.namaBuku ||
        book.title,

      namaPenulis:
        newBorrowing.namaPenulis ||
        book.author,

      status:
        "Sedang Dipinjam",
    };


    // =================================================
    // PEMINJAMAN AKTIF
    // =================================================

    setBorrowings(
      (currentBorrowings) => [
        ...currentBorrowings,
        borrowingData,
      ]
    );


    // =================================================
    // RIWAYAT PEMINJAMAN
    //
    // TIDAK AKAN DIHAPUS SAAT DIKEMBALIKAN
    // =================================================

    setBorrowingHistory(
      (currentHistory) => [
        ...currentHistory,
        borrowingData,
      ]
    );


    // =================================================
    // KURANGI STOCK
    // =================================================

    setBooks((currentBooks) =>
      currentBooks.map(
        (item) =>
          item.id ===
          newBorrowing.bukuId
            ? {
                ...item,

                stock:
                  Math.max(
                    0,
                    item.stock - 1
                  ),
              }
            : item
      )
    );


    return {
      success: true,

      message:
        "Buku berhasil dipinjam.",

      data:
        borrowingData,
    };
  };


  // ===================================================
  // UPDATE PEMINJAMAN
  // ===================================================

  const updateBorrowing = (
    borrowingId,
    updatedData
  ) => {

    // Update aktif

    setBorrowings(
      (currentBorrowings) =>
        currentBorrowings.map(
          (borrowing) =>
            borrowing.id ===
            borrowingId
              ? {
                  ...borrowing,
                  ...updatedData,
                }
              : borrowing
        )
    );


    // Update history juga

    setBorrowingHistory(
      (currentHistory) =>
        currentHistory.map(
          (borrowing) =>
            borrowing.id ===
            borrowingId
              ? {
                  ...borrowing,
                  ...updatedData,
                }
              : borrowing
        )
    );
  };


  // ===================================================
  // HAPUS PEMINJAMAN
  // ===================================================

  const deleteBorrowing = (
    borrowingId
  ) => {

    const borrowing =
      borrowings.find(
        (item) =>
          item.id === borrowingId
      );


    if (!borrowing) {
      return;
    }


    // Kembalikan stock

    setBooks((currentBooks) =>
      currentBooks.map(
        (book) =>
          book.id ===
          borrowing.bukuId
            ? {
                ...book,

                stock:
                  book.stock + 1,
              }
            : book
      )
    );


    // Hapus dari peminjaman aktif

    setBorrowings(
      (currentBorrowings) =>
        currentBorrowings.filter(
          (item) =>
            item.id !==
            borrowingId
        )
    );


    // Hapus dari history juga
    //
    // Karena user benar-benar memilih
    // menghapus data peminjaman.

    setBorrowingHistory(
      (currentHistory) =>
        currentHistory.filter(
          (item) =>
            item.id !==
            borrowingId
        )
    );
  };


  // ===================================================
  // KEMBALIKAN BUKU
  // ===================================================

  const returnBook = (
    borrowingId
  ) => {

    const borrowing =
      borrowings.find(
        (item) =>
          item.id === borrowingId
      );


    if (!borrowing) {
      return;
    }


    const book =
      books.find(
        (item) =>
          item.id ===
          borrowing.bukuId
      );


    const now = new Date();


    // =================================================
    // TANGGAL PENGEMBALIAN
    // =================================================

    const tanggalDikembalikan =
      now.toLocaleDateString(
        "id-ID"
      );


    const waktuDikembalikan =
      now.toLocaleTimeString(
        "id-ID",
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }
      );


    // =================================================
    // DATA PENGEMBALIAN
    // =================================================

    const returnData = {

      id: Date.now(),

      createdAt:
        Date.now(),

      borrowingId:
        borrowing.id,

      namaPeminjam:
        borrowing.namaPeminjam,

      bukuId:
        borrowing.bukuId,

      namaBuku:
        book?.title ||
        borrowing.namaBuku ||
        "Buku",

      namaPenulis:
        book?.author ||
        borrowing.namaPenulis ||
        "-",

      tanggalPinjam:
        borrowing.tanggalPinjam,

      tanggalJatuhTempo:
        borrowing.tanggalKembali,

      tanggalDikembalikan,

      waktuDikembalikan,

      status:
        "Sudah Dikembalikan",
    };


    // =================================================
    // SIMPAN KE RIWAYAT PENGEMBALIAN
    // =================================================

    setReturns(
      (currentReturns) => [
        ...currentReturns,
        returnData,
      ]
    );


    // =================================================
    // TAMBAH STOCK
    // =================================================

    setBooks((currentBooks) =>
      currentBooks.map(
        (book) =>
          book.id ===
          borrowing.bukuId
            ? {
                ...book,

                stock:
                  book.stock + 1,
              }
            : book
      )
    );


    // =================================================
    // HAPUS DARI PEMINJAMAN AKTIF
    // =================================================

    setBorrowings(
      (currentBorrowings) =>
        currentBorrowings.filter(
          (item) =>
            item.id !==
            borrowingId
        )
    );


    // =================================================
    // JANGAN HAPUS borrowingHistory
    //
    // Ini penting!
    //
    // Jadi:
    //
    // Peminjaman:
    // borrowingHistory = tetap ada
    //
    // Pengembalian:
    // returns = bertambah
    //
    // Peminjaman aktif:
    // borrowings = berkurang
    // =================================================
  };


  // ===================================================
  // HAPUS DATA PENGEMBALIAN
  // ===================================================

  const deleteReturn = (
    returnId
  ) => {

    setReturns(
      (currentReturns) =>
        currentReturns.filter(
          (item) =>
            item.id !==
            returnId
        )
    );
  };


  // ===================================================
  // CONTEXT VALUE
  // ===================================================

  return (
    <BookContext.Provider
      value={{

        // BUKU
        books,
        addBook,
        updateBook,
        deleteBook,

        // GENRE
        genres,
        addGenre,
        updateGenre,
        deleteGenre,

        // PEMINJAMAN AKTIF
        borrowings,

        // RIWAYAT PEMINJAMAN
        borrowingHistory,

        addBorrowing,
        updateBorrowing,
        deleteBorrowing,

        // PENGEMBALIAN
        returns,
        returnBook,
        deleteReturn,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}


// =====================================================
// CUSTOM HOOK
// =====================================================

export function useBook() {

  const context =
    useContext(BookContext);


  if (!context) {

    throw new Error(
      "useBook harus digunakan di dalam BookProvider."
    );
  }


  return context;
}