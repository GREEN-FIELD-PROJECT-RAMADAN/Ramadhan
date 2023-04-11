const mongoose = require("mongoose")
const Schema = mongoose.Schema;







const adminSchema  = new mongoose.Schema(
  {
    email:{type:String,require:true,unique:true},
    password: {type:String,require:true,unique:true}
},
{
  collection:'Admin'
}

)

const apiOneSchema = new mongoose.Schema({
  city: String,
  date: String,
  gregorian: String ,
  Fajr: String,
  Sunrise : String,
  Dhuhr: String,
  Asr: String,
  Maghrib: String,
  Isha: String,
  Imsak:String

  });
  

  const apiTwoSchema = new mongoose.Schema({
    hadith:String,
    narrator:String,
    book: String

  });


  

  const recipeSchema = new mongoose.Schema({
    label: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    yield: {
      type: Number,
      required: true
    },
    ingredientLines: {
      type: [String],
      required: true
    },
    cuisineType: {
      type: [String],
      required: true
    },
    totalTime: {
      type: Number,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    source: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Recipe = mongoose.model('Recipe', recipeSchema);
  
  
  

const Prayer = mongoose.model('ApiOne', apiOneSchema);
const Hadith = mongoose.model('ApiTwo', apiTwoSchema);

const Admin = mongoose.model('Admin',adminSchema)
module.exports={Prayer,Hadith,Recipe,Admin};