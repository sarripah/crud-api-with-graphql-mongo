const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FasilitasSchema = new Schema({
    nama_fasilitas: String,
    status_fasilitas: String,
    kapasitas_fasilitas: String,
    deskripsi_fasilitas: String
});

const Fasilitas = mongoose.model('Fasilitas', FasilitasSchema);
module.exports = Fasilitas;
