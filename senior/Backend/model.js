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


  const ApiThreeSchema = new mongoose.Schema({
    title: String,
    image: String,
    sourceName: String,
    sourceUrl: String,
    servings: Number,
    readyInMinutes: Number,
    summary : String


  });

const Prayer = mongoose.model('ApiOne', apiOneSchema);
const Hadith = mongoose.model('ApiTwo', apiTwoSchema);
const Recipes = mongoose.model('ApiThree', ApiThreeSchema);
const Admin = mongoose.model('Admin',adminSchema)
module.exports={Prayer,Hadith,Recipes,Admin};