const mongoose = require('mongoose');

const QuranSchema = new mongoose.Schema({
  surah: {
    type: String,
    required: true
  },
  ayah: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  translation: {
    type: String,
    required: true
  }
});

const Quran = mongoose.model('Quran', QuranSchema);

module.exports = Quran;

