const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MahasiswaSchema = new Schema({
    nim: String,
    nama_mahasiswa: String,
    fakultas: String,
    jurusan: String,
    angkatan: String,
    email: String
});

const Mahasiswa = mongoose.model('Mahasiswa', MahasiswaSchema);
module.exports = Mahasiswa;
