const { gql } = require('apollo-server');

const typeDefs = gql`
  type Mahasiswa {
    _id: ID!,
    nim: String!,
    nama_mahasiswa: String!,
    fakultas: String!,
    jurusan: String!,
    angkatan: String!,
    email: String!
  }

  type Dosen {
    _id: ID!,
    nidn: String!,
    nama_dosen: String!,
    fakultas: String!,
    email: String!
  }

  type Fasilitas {
    _id: ID!,
    nama_fasilitas: String!,
    status_fasilitas: String!,
    kapasitas_fasilitas: String!,
    deskripsi_fasilitas: String!
  }
  
  type PeminjamanFasilitas {
    _id: ID!
    fasilitas: Fasilitas!
    status_peminjaman: String!,
    tanggal_peminjaman: String!,
    tanggal_pengembalian: String,
    mahasiswa: Mahasiswa
  }

  type Skripsi {
    _id: ID!
    judul_skripsi: String!
    mahasiswa: Mahasiswa!
    dosen: Dosen!
  }

  type PengajuanSkripsi {
    _id: ID!
    skripsi: Skripsi!
    status_pengajuan: String
  }

  type Query {
    getAllMahasiswa: [Mahasiswa]!,
    getMahasiswa(_id: String!): Mahasiswa

    getAllDosen: [Dosen]!,
    getDosen(_id: String!): Dosen

    getAllFasilitas: [Fasilitas]!,
    getFasilitas(_id: String!): Fasilitas

    getAllPeminjamanFasilitas: [PeminjamanFasilitas]!,
    getPeminjamanFasilitas(_id: String!): PeminjamanFasilitas

    getAllSkripsi: [Skripsi]!,
    getSkripsi(_id: String!): Skripsi
    
    getAllPengajuanSkripsi: [PengajuanSkripsi]!,
    getPengajuanSkripsi(_id: String!): PengajuanSkripsi
  }


  type Mutation {
    createMahasiswa(
        nim: String!,
        nama_mahasiswa: String!,
        fakultas: String!,
        jurusan: String!,
        angkatan: String!,
        email: String!
    ): Mahasiswa!,

    createDosen(
        nidn: String!,
        nama_dosen: String!,
        fakultas: String!,
        email: String!
    ): Dosen!,

    createFasilitas(
      nama_fasilitas: String!,
      status_fasilitas: String!,
      kapasitas_fasilitas: String!,
      deskripsi_fasilitas: String!
  ): Fasilitas!,

  createPeminjamanFasilitas(
    fasilitasId: ID!,
    status_peminjaman: String!,
    tanggal_peminjaman: String!,
    tanggal_pengembalian: String,
    mahasiswaId: ID!
  ): PeminjamanFasilitas!,

  createSkripsi(
    judul_skripsi: String!,
    mahasiswaId: ID!,
    dosenId: ID!
  ): Skripsi!,

  createPengajuanSkripsi(
    skripsiId: ID!,
    status_pengajuan: String
  ): PengajuanSkripsi!,

    updateMahasiswa(
        _id: ID!
        nim: String,
        nama_mahasiswa: String,
        fakultas: String,
        jurusan: String,
        angkatan: String,
        email: String
    ): Mahasiswa!,
   
    updateDosen(
        _id: ID!
        nidn: String,
        nama_dosen: String,
        fakultas: String,
        email: String
    ): Dosen!,

    updateFasilitas(
      _id: ID!
      nama_fasilitas: String,
      status_fasilitas: String,
      kapasitas_fasilitas: String,
      deskripsi_fasilitas: String
  ): Fasilitas!,

  updatePeminjamanFasilitas(
    _id: ID!
    status_peminjaman: String
    tanggal_peminjaman: String
    tanggal_pengembalian: String
  ): PeminjamanFasilitas!,

  updateSkripsi(
    _id: ID!,
    judul_skripsi: String
  ): Skripsi!,

  updatePengajuanSkripsi(
    _id: ID!
    status_pengajuan: String
  ): PengajuanSkripsi!,

    deleteMahasiswa(_id: String!): Boolean!
    deleteDosen(_id: String!): Boolean!
    deleteFasilitas(_id: String!): Boolean!
    deletePeminjamanFasilitas(_id: ID!): Boolean!
    deleteSkripsi(_id: ID!): Boolean!
    deletePengajuanSkripsi(_id: ID!): Boolean!
  }
`;

module.exports = typeDefs;