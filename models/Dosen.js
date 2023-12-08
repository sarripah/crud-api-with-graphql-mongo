const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DosenSchema = new Schema({
    nidn: String,
    nama_dosen: String,
    fakultas: String,
    email: String
});

const Dosen = mongoose.model('Dosen', DosenSchema);
module.exports = Dosen;
