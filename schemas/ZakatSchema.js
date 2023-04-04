const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ZakatSchema = new Schema({
  nisab: {
    type: Number,
    required: true
  },
  rate: {
    type: Number,
    required: true
  },
  gold_price: {
    type: Number,
    required: true
  },
  silver_price: {
    type: Number,
    required: true
  },
  assets: {
    gold: {
      type: Number,
      required: true
    },
    silver: {
      type: Number,
      required: true
    },
    cash: {
      type: Number,
      required: true
    }
  },
  liabilities: {
    type: Number,
    required: true
  },
  total_assets: {
    type: Number,
    required: true
  },
  net_assets: {
    type: Number,
    required: true
  },
  zakat: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Zakat', ZakatSchema);
