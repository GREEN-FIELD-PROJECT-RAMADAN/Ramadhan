const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const QuranSchema = require('./schemas/QuranSchema');
const HadithSchema = require('./schemas/HadithSchema');
const FoodSchema = require('./schemas/FoodSchema');
const ZakatSchema = require('./schemas/ZakatSchema');

mongoose.connect('mongodb://127.0.0.1:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB!');
});

const app = express();
app.use(express.json())
app.use(express.urlencoded  
  ({ extended: true }));

app.get('/api/quran', async (req, res) => {
  try {
    const response = await axios.get('http://api.alquran.cloud/v1/surah')
    if (response && response.data && response.data.data && response.data.data.name && response.data.data.ayahs) {
      const quranData = {
        surahName: response.data.data.name,
        ayahs: response.data.data.ayahs
      };
      const quran = new QuranSchema(quranData);
      await quran.save();
      res.send(quran);
    } else {
      console.error(response);
      res.status(500).send('Error fetching Quran data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Quran data');
  }
});


app.get('/api/hadith', async (req, res) => {
  try {
    const response = await axios.get(`https://hadithapi.com/api/hadiths/?apiKey={$2y$10$1Mi1yA1VcEIQJ4GNEajUOCfnMeviMW2clCVh9zaXYLW4reTF2}`);
    const hadithData = {
      collection: response.data.data.collection,
      hadithNumber: response.data.data.hadith_number,
      narrator: response.data.data.narrator,
      body: response.data.data.body,
      reference: response.data.data.reference,
    };
    const hadith = new HadithSchema(hadithData);
    await hadith.save();
    res.send(hadith);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Hadith data');
  }
});

app.get('/api/food', async (req, res) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/random?apiKey=7273c8a186c640e7a5e110216e0e2b69');
    const foodData = {
      recipeTitle: response.data.recipes[0].title,
      imageUrl: response.data.recipes[0].image,
      ingredients: response.data.recipes[0].extendedIngredients,
      instructions: response.data.recipes[0].analyzedInstructions[0].steps
    };
    const food = new FoodSchema(foodData);
    await food.save();
    res.send(food);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Spoonacular data');
  }
});

app.get('/api/zakat', async (req, res) => {
  const { gold, silver, cash, liabilities } = req.query;
  try {
    const Zakat = mongoose.model('Zakat');
    const zakat = await Zakat.findOne().exec();
    const totalAssets = gold * zakat.gold_price + silver * zakat.silver_price + cash - liabilities;
    const nisab = zakat.nisab;
    const zakatAmount = totalAssets >= nisab ? totalAssets * 0.025 : 0;
    res.json({
      nisab,
      totalAssets,
      zakatAmount
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting Zakat');
  }
});
const PORT = 7050
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
