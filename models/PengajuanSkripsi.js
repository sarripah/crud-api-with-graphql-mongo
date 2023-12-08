const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PengajuanSkripsiSchema = new Schema({
    skripsi: { type: Schema.Types.ObjectId, ref: 'Skripsi' },
    status_pengajuan: String
});

const PengajuanSkripsi = mongoose.model('PengajuanSkripsi', PengajuanSkripsiSchema);
module.exports = PengajuanSkripsi;
