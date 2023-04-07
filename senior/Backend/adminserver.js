const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Prayer, Hadith, Recipes } = require('./model.js');
const { urlencoded } = require('express');
const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ramadhan')
  .then(() => console.log('CONNECTED TO DB'))
  .catch(console.error);

// CRUD for Prayer API

// Create
app.post('/api/prayerTime', async (req, res) => {
  try {
    const newPrayer = new Prayer(req.body);
    await newPrayer.save();
    res.status(201).json(newPrayer);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/prayerTime', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.status(200).json(prayers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/prayerTime/:id', async (req, res) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(prayer);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/prayerTime/:id', async (req, res) => {
  try {
    await Prayer.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// CRUD for Hadith API

// Create
app.post('/api/hadith', async (req, res) => {
  try {
    const newHadith = new Hadith(req.body);
    await newHadith.save();
    res.status(201).json(newHadith);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/hadith', async (req, res) => {
  try {
    const hadiths = await Hadith.find();
    res.status(200).json(hadiths);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/hadith/:id', async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(hadith);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/hadith/:id', async (req, res) => {
  try {
    await Hadith.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// CRUD for Recipes API

// Create
app.post('/api/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/recipes', async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/recipes/:id', async (req, res) => {
  try {
    await Recipes.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});