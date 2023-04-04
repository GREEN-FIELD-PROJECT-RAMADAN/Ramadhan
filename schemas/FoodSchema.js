const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: {
    type: String
    
  },
  image: {
    type: String
   
  },
  ingredients: {
    type: Array,
    required: true
  },
  instructions: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Food', FoodSchema);
