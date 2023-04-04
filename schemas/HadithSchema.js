const mongoose = require('mongoose');

const HadithSchema = new mongoose.Schema({
  hadith: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    required: true
  },
  grade: {
    type: String,
    required: true
  }
});

const Hadith = mongoose.model('Hadith', HadithSchema);

module.exports = Hadith;