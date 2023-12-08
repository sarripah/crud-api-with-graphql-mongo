const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PeminjamanFasilitasSchema = new Schema({
    fasilitas: { type: Schema.Types.ObjectId, ref: 'Fasilitas'},
    status_peminjaman: String,
    tanggal_peminjaman: Date,
    tanggal_pengembalian: Date,
    mahasiswa: { type: Schema.Types.ObjectId, ref: 'Mahasiswa'}

});

const PeminjamanFasilitas = mongoose.model('PeminjamanFasilitas', PeminjamanFasilitasSchema);
module.exports = PeminjamanFasilitas;
