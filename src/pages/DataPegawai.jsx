import "../css/DataPegawai.css";

function DataPegawai() {
  const dataPegawai = [
    {
      id: 1,
      nama: "Admin Perpustakaan",
      email: "admin@perpustakaan.com",
      jabatan: "Administrator",
      divisi: "Perpustakaan",
      status: "Aktif",
    },
    {
      id: 2,
      nama: "Budi Santoso",
      email: "budi@perpustakaan.com",
      jabatan: "Pegawai",
      divisi: "Pelayanan",
      status: "Aktif",
    },
    {
      id: 3,
      nama: "Siti Aminah",
      email: "siti@perpustakaan.com",
      jabatan: "Pegawai",
      divisi: "Administrasi",
      status: "Aktif",
    },
  ];

  return (
    <div className="data-pegawai-page">

      <div className="page-header">
        <div>
          <div className="breadcrumb">
            Pegawai / Data Pegawai
          </div>

          <h1>Data Pegawai</h1>

          <p>
            Kelola data pegawai perpustakaan.
          </p>
        </div>
      </div>

      <div className="data-pegawai-card">

        <div className="data-pegawai-card-header">
          <div>
            <h2>Daftar Pegawai</h2>

            <p>
              Data pegawai yang terdaftar dalam sistem.
            </p>
          </div>

          <button
            type="button"
            className="btn-tambah"
          >
            + Tambah Pegawai
          </button>
        </div>

        <div className="table-wrapper">

          <table>

            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Jabatan</th>
                <th>Divisi</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

              {dataPegawai.map((pegawai, index) => (
                <tr key={pegawai.id}>

                  <td>{index + 1}</td>

                  <td>
                    <strong>{pegawai.nama}</strong>
                  </td>

                  <td>
                    {pegawai.email}
                  </td>

                  <td>
                    {pegawai.jabatan}
                  </td>

                  <td>
                    {pegawai.divisi}
                  </td>

                  <td>
                    <span className="status-aktif">
                      {pegawai.status}
                    </span>
                  </td>

                  <td>
                    <div className="aksi-buttons">

                      <button
                        type="button"
                        className="btn-edit"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn-hapus"
                      >
                        Hapus
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default DataPegawai;