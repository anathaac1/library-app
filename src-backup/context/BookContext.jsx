import {
  createContext,
  useContext,
  useState,
} from "react";

import { books as initialBooks } from "../data/dummyBuku";

import {
  borrowings as initialBorrowings,
} from "../data/dummyPeminjaman";


const BookContext = createContext();


export function BookProvider({ children }) {

  // =================================
  // DATA BUKU
  // =================================

  const [books, setBooks] = useState(initialBooks);


  // =================================
  // DATA GENRE
  // =================================

  const [genres, setGenres] = useState(() => {

    return [
      ...new Set(
        initialBooks
          .map((book) => book.genre)
          .filter((genre) => genre !== "")
      ),
    ];

  });


  // =================================
  // DATA PEMINJAMAN
  // =================================

  const [borrowings, setBorrowings] =
    useState(initialBorrowings);


  // =================================
  // DATA PENGEMBALIAN
  // =================================

  const [returns, setReturns] = useState([]);


  // =================================
  // TAMBAH BUKU
  // =================================

  const addBook = (newBook) => {

    const book = {
      ...newBook,
      id: Date.now(),
    };

    setBooks((currentBooks) => [
      ...currentBooks,
      book,
    ]);

  };


  // =================================
  // EDIT BUKU
  // =================================

  const updateBook = (
    bookId,
    updatedData
  ) => {

    setBooks((currentBooks) =>

      currentBooks.map((book) =>

        book.id === bookId
          ? {
              ...book,
              ...updatedData,
            }
          : book

      )

    );

  };


  // =================================
  // HAPUS BUKU
  // =================================

  const deleteBook = (bookId) => {

    setBooks((currentBooks) =>

      currentBooks.filter(
        (book) => book.id !== bookId
      )

    );

  };


  // =================================
  // TAMBAH GENRE
  // =================================

  const addGenre = (newGenre) => {

    const genre = newGenre.trim();

    if (!genre) {
      return false;
    }


    const alreadyExists = genres.some(
      (item) =>
        item.toLowerCase() === genre.toLowerCase()
    );


    if (alreadyExists) {
      return false;
    }


    setGenres((currentGenres) => [
      ...currentGenres,
      genre,
    ]);


    return true;
  };


  // =================================
  // EDIT GENRE
  // =================================

  const updateGenre = (
    oldGenre,
    newGenre
  ) => {

    const genre = newGenre.trim();


    if (!genre) {
      return false;
    }


    const alreadyExists = genres.some(
      (item) =>
        item !== oldGenre &&
        item.toLowerCase() === genre.toLowerCase()
    );


    if (alreadyExists) {
      return false;
    }


    setGenres((currentGenres) =>
      currentGenres.map((item) =>
        item === oldGenre
          ? genre
          : item
      )
    );


    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.genre === oldGenre
          ? {
              ...book,
              genre: genre,
            }
          : book
      )
    );


    return true;
  };


  // =================================
  // HAPUS GENRE
  // =================================

  const deleteGenre = (genre) => {

    setGenres((currentGenres) =>
      currentGenres.filter(
        (item) => item !== genre
      )
    );


    setBooks((currentBooks) =>
      currentBooks.map((book) =>
        book.genre === genre
          ? {
              ...book,
              genre: "",
            }
          : book
      )
    );

  };


  // =================================
  // TAMBAH PEMINJAMAN
  // =================================

  const addBorrowing = (newBorrowing) => {

    setBorrowings((currentBorrowings) => [

      ...currentBorrowings,

      {
        ...newBorrowing,
        id: Date.now(),
      },

    ]);


    setBooks((currentBooks) =>

      currentBooks.map((book) =>

        book.id === newBorrowing.bukuId
          ? {
              ...book,
              stock: Math.max(
                0,
                book.stock - 1
              ),
            }
          : book

      )

    );

  };


  // =================================
  // EDIT PEMINJAMAN
  // =================================

  const updateBorrowing = (
    borrowingId,
    updatedData
  ) => {

    setBorrowings((currentBorrowings) =>

      currentBorrowings.map((borrowing) =>

        borrowing.id === borrowingId
          ? {
              ...borrowing,
              ...updatedData,
            }
          : borrowing

      )

    );

  };


  // =================================
  // HAPUS PEMINJAMAN
  // =================================

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


    // Kembalikan stock buku
    setBooks((currentBooks) =>

      currentBooks.map((book) =>

        book.id === borrowing.bukuId
          ? {
              ...book,
              stock: book.stock + 1,
            }
          : book

      )

    );


    // Hapus peminjaman
    setBorrowings(
      (currentBorrowings) =>

        currentBorrowings.filter(
          (item) =>
            item.id !== borrowingId
        )

    );

  };


  // =================================
  // KEMBALIKAN BUKU
  // =================================

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
          item.id === borrowing.bukuId
      );


    const tanggalDikembalikan =
      new Date().toLocaleDateString(
        "id-ID"
      );


    const returnData = {

      id: Date.now(),

      borrowingId:
        borrowing.id,

      namaPeminjam:
        borrowing.namaPeminjam,

      bukuId:
        borrowing.bukuId,

      namaBuku:
        book
          ? book.title
          : "Buku",

      namaPenulis:
        book
          ? book.author
          : "-",

      tanggalPinjam:
        borrowing.tanggalPinjam,

      tanggalJatuhTempo:
        borrowing.tanggalKembali,

      tanggalDikembalikan:
        tanggalDikembalikan,

      status:
        "Sudah Dikembalikan",

    };


    // Masukkan ke pengembalian
    setReturns((currentReturns) => [

      ...currentReturns,

      returnData,

    ]);


    // Tambah stock
    setBooks((currentBooks) =>

      currentBooks.map((book) =>

        book.id === borrowing.bukuId
          ? {
              ...book,
              stock: book.stock + 1,
            }
          : book

      )

    );


    // Hapus dari peminjaman
    setBorrowings(
      (currentBorrowings) =>

        currentBorrowings.filter(
          (item) =>
            item.id !== borrowingId
        )

    );

  };


  // =================================
  // HAPUS DATA PENGEMBALIAN
  // =================================

  const deleteReturn = (
    returnId
  ) => {

    setReturns(
      (currentReturns) =>

        currentReturns.filter(
          (item) =>
            item.id !== returnId
        )

    );

  };


  // =================================
  // VALUE
  // =================================

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


        // PEMINJAMAN
        borrowings,
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


// =================================
// CUSTOM HOOK
// =================================

export function useBook() {

  return useContext(
    BookContext
  );

}