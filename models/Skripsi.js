const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SkripsiSchema = new Schema({
    judul_skripsi: String,
    mahasiswa: { type: Schema.Types.ObjectId, ref: 'Mahasiswa'},
    dosen: { type: Schema.Types.ObjectId, ref: 'Dosen'}
});

const Skripsi = mongoose.model('Skripsi', SkripsiSchema);
module.exports = Skripsi;
