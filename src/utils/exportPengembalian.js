import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export function exportPengembalian(returns) {

  // =================================
  // BUAT PDF
  // =================================

  const doc =
    new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });


  // =================================
  // JUDUL
  // =================================

  doc.setFontSize(18);

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.text(
    "LAPORAN PENGEMBALIAN BUKU",
    148,
    18,
    {
      align: "center",
    }
  );


  // =================================
  // SUBTITLE
  // =================================

  doc.setFontSize(9);

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Laporan data pengembalian buku perpustakaan",
    148,
    25,
    {
      align: "center",
    }
  );


  // =================================
  // TANGGAL EXPORT
  // =================================

  const tanggalExport =
    new Date().toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );


  doc.setFontSize(9);

  doc.text(
    `Tanggal Export: ${tanggalExport}`,
    14,
    34
  );


  // =================================
  // DATA TABLE
  // =================================

  const tableData =
    returns.map(
      (item, index) => {

        const terlambat =
          isLate(item);


        return [

          index + 1,

          item.namaPeminjam ||
            "-",

          item.namaBuku ||
            "-",

          item.tanggalPinjam ||
            "-",

          item.tanggalJatuhTempo ||
            "-",

          item.tanggalDikembalikan ||
            "-",

          terlambat
            ? "Terlambat"
            : "Sudah Dikembalikan",

        ];

      }
    );


  // =================================
  // TABLE
  // =================================

  autoTable(
    doc,
    {
      startY: 40,

      head: [[

        "No",

        "Nama Peminjam",

        "Judul Buku",

        "Tanggal Pinjam",

        "Jatuh Tempo",

        "Tanggal Dikembalikan",

        "Status",

      ]],

      body: tableData,


      // =================================
      // STYLE
      // =================================

      theme: "grid",

      styles: {

        font: "helvetica",

        fontSize: 8,

        cellPadding: 4,

        valign: "middle",

        lineColor: [
          220,
          213,
          202,
        ],

        lineWidth: 0.2,

      },


      headStyles: {

        fillColor: [
          59,
          33,
          25,
        ],

        textColor: [
          255,
          255,
          255,
        ],

        fontStyle: "bold",

        halign: "center",

      },


      alternateRowStyles: {

        fillColor: [
          250,
          247,
          242,
        ],

      },


      columnStyles: {

        0: {
          halign: "center",
          cellWidth: 12,
        },

        1: {
          cellWidth: 35,
        },

        2: {
          cellWidth: 55,
        },

        3: {
          halign: "center",
          cellWidth: 30,
        },

        4: {
          halign: "center",
          cellWidth: 30,
        },

        5: {
          halign: "center",
          cellWidth: 35,
        },

        6: {
          halign: "center",
          cellWidth: 35,
        },

      },


      // =================================
      // WARNA STATUS TERLAMBAT
      // =================================

      didParseCell: (data) => {

        if (
          data.section === "body" &&
          data.column.index === 6
        ) {

          const value =
            data.cell.text[0];


          if (
            value === "Terlambat"
          ) {

            data.cell.styles.textColor =
              [
                192,
                57,
                43,
              ];

            data.cell.styles.fontStyle =
              "bold";

          }

        }

      },

    }
  );


  // =================================
  // FOOTER
  // =================================

  const totalData =
    returns.length;


  const halaman =
    doc.internal.pageSize
      .getHeight();


  doc.setFontSize(8);

  doc.setFont(
    "helvetica",
    "normal"
  );


  doc.text(
    `Total pengembalian: ${totalData} data`,
    14,
    halaman - 10
  );


  // =================================
  // DOWNLOAD
  // =================================

  doc.save(
    "laporan-pengembalian.pdf"
  );

}


// =================================
// CEK TERLAMBAT
// =================================

function isLate(item) {

  if (
    !item.tanggalJatuhTempo ||
    !item.tanggalDikembalikan
  ) {

    return false;

  }


  const jatuhTempo =
    item.tanggalJatuhTempo
      .split("/")
      .reverse()
      .join("-");


  const dikembalikan =
    item.tanggalDikembalikan
      .split("/")
      .reverse()
      .join("-");


  const tanggalTempo =
    new Date(jatuhTempo);


  const tanggalKembali =
    new Date(dikembalikan);


  return (
    tanggalKembali >
    tanggalTempo
  );

}