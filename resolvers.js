const MahasiswaModel = require('./models/Mahasiswa');
const DosenModel = require('./models/Dosen');
const FasilitasModel = require('./models/Fasilitas');
const PeminjamanFasilitasModel = require('./models/PeminjamanFasilitas');
const SkripsiModel = require('./models/Skripsi');
const PengajuanSkripsiModel = require('./models/PengajuanSkripsi');

module.exports = {
  Query: {
      getAllMahasiswa: async (_, args) => await MahasiswaModel.find({}),
      getMahasiswa: async (_, args) => await MahasiswaModel.findById(args._id),

      getAllDosen: async (_, args) => await DosenModel.find({}),
      getDosen: async (_, args) => await DosenModel.findById(args._id),

      getAllFasilitas: async (_, args) => await FasilitasModel.find({}),
      getFasilitas: async (_, args) => await FasilitasModel.findById(args._id),

      getAllPeminjamanFasilitas: async (_, args) => await PeminjamanFasilitasModel.find({}),
      getPeminjamanFasilitas: async (_, args) => await PeminjamanFasilitasModel.findById(args._id),

      getAllSkripsi: async (_, args) => await SkripsiModel.find({}),
      getSkripsi: async (_, args) => await SkripsiModel.findById(args._id),

      getAllPengajuanSkripsi: async (_, args) => await PengajuanSkripsiModel.find({}),
      getPengajuanSkripsi: async (_, args) => await PengajuanSkripsiModel.findById(args._id)


  },

  Mutation: {
    createMahasiswa: async (_, args) => {
      const mahasiswa = new MahasiswaModel(args);
      await mahasiswa.save();
      return mahasiswa;
    },

    createDosen: async (_, args) => {
        const dosen = new DosenModel(args);
        await dosen.save();
        return dosen;
    },

    createFasilitas: async (_, args) => {
      const fasilitas = new FasilitasModel(args);
      await fasilitas.save();
      return fasilitas;
  },

  createPeminjamanFasilitas: async (_, args) => {
    const { fasilitasId, status_peminjaman, tanggal_peminjaman, tanggal_pengembalian, mahasiswaId } = args;
  
    try {
      // Periksa apakah fasilitasId dan mahasiswaId valid sebelum membuat peminjaman
      const fasilitas = await FasilitasModel.findById(fasilitasId);
      const mahasiswa = await MahasiswaModel.findById(mahasiswaId);
  
      if (!fasilitas || !mahasiswa) {
        throw new Error('Fasilitas atau mahasiswa tidak valid');
      }
  
      const peminjamanFasilitas = new PeminjamanFasilitasModel({
        fasilitas: fasilitas,
        status_peminjaman,
        tanggal_peminjaman,
        tanggal_pengembalian,
        mahasiswa: mahasiswa,
      });
  
      await peminjamanFasilitas.save();
      return peminjamanFasilitas;
    } catch (error) {
      console.error('Error creating PeminjamanFasilitas:', error.message);
      return null; // Atau kembalikan objek kosong jika diperlukan
    }
  },

  createSkripsi: async (_, args) => {
    const { judul_skripsi, mahasiswaId, dosenId } = args;

    try {
      // Periksa apakah mahasiswaId dan dosenId valid sebelum membuat skripsi
      const mahasiswa = await MahasiswaModel.findById(mahasiswaId);
      const dosen = await DosenModel.findById(dosenId);

      if (!mahasiswa || !dosen) {
        throw new Error('Mahasiswa atau dosen tidak valid');
      }

      const skripsi = new SkripsiModel({
        judul_skripsi,
        mahasiswa: mahasiswa,
        dosen: dosen,
      });

      await skripsi.save();
      return skripsi;
    } catch (error) {
      console.error('Error creating Skripsi:', error.message);
      return null; // Atau kembalikan objek kosong jika diperlukan
    }
  },

  createPengajuanSkripsi: async (_, args) => {
    const { skripsiId, status_pengajuan } = args;
  
    try {
      // Periksa apakah skripsiId valid sebelum membuat pengajuan skripsi
      const skripsi = await SkripsiModel.findById(skripsiId);
  
      if (!skripsi) {
        throw new Error('Skripsi tidak valid');
      }
  
      // Buat pengajuanSkripsi tanpa memeriksa data mahasiswa pada skripsi
      const pengajuanSkripsi = new PengajuanSkripsiModel({
        skripsi: skripsi,
        status_pengajuan,
      });
  
      await pengajuanSkripsi.save();
  
      // Dapatkan data lengkap skripsi untuk dikembalikan
      const createdPengajuanSkripsi = await PengajuanSkripsiModel
        .findById(pengajuanSkripsi._id)
        .populate('skripsi');
  
      // Kembalikan objek pengajuanSkripsi yang telah dibuat
      return createdPengajuanSkripsi;
    } catch (error) {
      console.error('Error creating PengajuanSkripsi:', error.message);
      return null;
    }
  },
  
  

    updateMahasiswa: async (_, args) => {
      const mahasiswa = await MahasiswaModel.findByIdAndUpdate(args._id, args, { new: true });
      return mahasiswa;
    },

    updateDosen: async (_, args) => {
        const dosen = await DosenModel.findByIdAndUpdate(args._id, args, { new: true });
        return dosen;
    },

    updateFasilitas: async (_, args) => {
      const fasilitas = await FasilitasModel.findByIdAndUpdate(args._id, args, { new: true });
      return fasilitas;
    },

    updatePeminjamanFasilitas: async (_, args) => {
      const { _id, status_peminjaman, tanggal_peminjaman, tanggal_pengembalian } = args;
    
      try {
        // Periksa apakah peminjamanFasilitasId valid sebelum melakukan pembaruan
        const peminjamanFasilitas = await PeminjamanFasilitasModel.findById(_id);
    
        if (!peminjamanFasilitas) {
          throw new Error('Peminjaman fasilitas tidak valid');
        }
    
        // Lakukan pembaruan pada peminjamanFasilitas
        peminjamanFasilitas.status_peminjaman = status_peminjaman;
        peminjamanFasilitas.tanggal_peminjaman = tanggal_peminjaman;
        peminjamanFasilitas.tanggal_pengembalian = tanggal_pengembalian;
    
        // Simpan pembaruan
        await peminjamanFasilitas.save();
    
        // Dapatkan data lengkap fasilitas untuk dikembalikan
        const updatedPeminjamanFasilitas = await PeminjamanFasilitasModel
          .findById(_id)
          .populate('fasilitas')
          .populate('mahasiswa');
    
        // Kembalikan objek peminjamanFasilitas yang telah diperbarui
        return updatedPeminjamanFasilitas;
      } catch (error) {
        console.error('Error updating PeminjamanFasilitas:', error.message);
        return null; // Atau kembalikan objek kosong jika diperlukan
      }
    },

    updateSkripsi: async (_, args) => {
      const { _id, judul_skripsi } = args;

      try {
        // Periksa apakah skripsiId valid sebelum melakukan pembaruan
        const skripsi = await SkripsiModel.findById(_id);

        if (!skripsi) {
          throw new Error('Skripsi tidak valid');
        }

        // Lakukan pembaruan pada skripsi
        skripsi.judul_skripsi = judul_skripsi;

        // Simpan pembaruan
        await skripsi.save();

        // Dapatkan data lengkap mahasiswa dan dosen untuk dikembalikan
        const updatedSkripsi = await SkripsiModel
          .findById(_id)
          .populate('mahasiswa')
          .populate('dosen');

        // Kembalikan objek skripsi yang telah diperbarui
        return updatedSkripsi;
      } catch (error) {
        console.error('Error updating Skripsi:', error.message);
        return null; // Atau kembalikan objek kosong jika diperlukan
      }
    },

    updatePengajuanSkripsi: async (_, args) => {
      const { _id, status_pengajuan } = args;
  
      try {
        // Periksa apakah pengajuanSkripsiId valid sebelum melakukan pembaruan
        const pengajuanSkripsi = await PengajuanSkripsiModel.findById(_id);
  
        if (!pengajuanSkripsi) {
          throw new Error('Pengajuan skripsi tidak valid');
        }
  
        // Lakukan pembaruan pada pengajuanSkripsi
        pengajuanSkripsi.status_pengajuan = status_pengajuan;
  
        // Simpan pembaruan
        await pengajuanSkripsi.save();
  
        // Dapatkan data lengkap skripsi dan mahasiswa untuk dikembalikan
        const updatedPengajuanSkripsi = await PengajuanSkripsiModel
          .findById(_id)
          .populate('skripsi');
       
  
        // Kembalikan objek pengajuanSkripsi yang telah diperbarui
        return updatedPengajuanSkripsi;
      } catch (error) {
        console.error('Error updating PengajuanSkripsi:', error.message);
        return null; // Atau kembalikan objek kosong jika diperlukan
      }
    },


    
    deleteMahasiswa: async (_, args) => {
      const mahasiswa = await MahasiswaModel.findByIdAndDelete(args._id);
      if (mahasiswa) return true;
      return false;
    },

    deleteDosen: async (_, args) => {
        const dosen = await DosenModel.findByIdAndDelete(args._id);
        if (dosen) return true;
        return false;
    },

    deleteFasilitas: async (_, args) => {
      const fasilitas = await FasilitasModel.findByIdAndDelete(args._id);
      if (fasilitas) return true;
      return false;
    },

    deletePeminjamanFasilitas: async (_, args) => {
      const { _id } = args;
      const deleted = await PeminjamanFasilitasModel.findByIdAndDelete(_id);
      return deleted ? true : false;
    },

    deleteSkripsi: async (_, args) => {
      const { _id } = args;
      const deleted = await SkripsiModel.findByIdAndDelete(_id);
      return deleted ? true : false;
    },

    deletePengajuanSkripsi: async (_, args) => {
      const { _id } = args;
      const deleted = await PengajuanSkripsiModel.findByIdAndDelete(_id);
      return deleted ? true : false;
    }

  }
}