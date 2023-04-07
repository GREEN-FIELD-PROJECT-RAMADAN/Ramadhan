const express = require('express')
const mongoose = require ("mongoose")
const cors = require ('cors')
const {Prayer,Hadith,Recipes} = require('./model.js')
const { urlencoded } = require('express')
const app = express()
const axios = require('axios');
app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ramadhan').then(()=>console.log('CONNECTED TO DB'))
.catch(console.error)





// Prayer time API

app.post('/api/prayerTime', (req, res) => {
axios.get('https://api.aladhan.com/v1/hijriCalendarByAddress/1444/9?address=Tunisia')
  .then(response => {
    const apiData = response.data.data;
    for(let i=0;i<apiData.length;i++){
      const newPrayer = new Prayer({
      city: apiData[i].meta.timezone,
      date: apiData[i].date.readable,
      
      Fajr :apiData[i].timings.Fajr ,
      Sunrise :apiData[i].timings.Sunrise ,
      Dhuhr : apiData[i].timings.Dhuhr,
      Asr:apiData[i].timings.Asr ,
      Maghrib:apiData[i].timings.Maghrib ,
      Isha: apiData[i].timings.Isha ,
      Imsak: apiData[i].timings.Imsak
      
    
    });
  
    newPrayer.save() }
  res.status(200).json('done')})
  .catch(error => 
    console.error(error));
  })

  app.get('/api/prayerTime', async (req, res) => {
 
    try {
      const prayers = await Prayer.find()
      res.json(prayers)
    } catch (err) {
      res.status(500).send(err)
    }
  })


// Halal food API
app.get('/api/halalfood', async (req, res) => {

     axios.get('https://api.spoonacular.com/recipes/search', {
        params: {
          query: 'chicken',
          number: 10,
          apiKey: "7273c8a186c640e7a5e110216e0e2b69"
        }

      }).then(response=>res.json(response.data) ).catch(err=>console.log(err));
      res.status(200)
    })


// Hadith API

app.get('/api/azkarAdhan2', async (req, res) => {
  try {
     const Hadithes = await Hadith.find()
    console.log(res);
    res.json(Hadithes)
  } catch (err) {
    res.status(500).send(err)
  }})

app.get('/api/azkarAdhan', (req, res) => {
  
  const url = 'https://www.hadithapi.com/api/hadiths/?apiKey=$2y$10$9I7clzI9Pl2BUbIdWa2hOa1SpAdjYVmWVhMDm7rJPE8MRSyu68y';
  axios.get(url)
    .then(response => {
    

      for(let i=0 ;i<response.data.hadiths.data.length;i++){
        console.log(response.data.hadiths.data[i].hadithArabic)
        console.log(response.data.hadiths.data[i].englishNarrator)
        console.log(response.data.hadiths.data[i].book.bookName)
        ;}
        
      
      const hadithData = response.data.hadiths.data;
      
      // Create a new instance of the Hadith model for each item in the response data
      hadithData.forEach(data => {
        const hadith = new Hadith({
          hadith: data.hadithArabic,
          narrator:data.englishNarrator,
          book: data.book.bookName
        });
        
        // Save the instance to the database
        hadith.save()
          .then(() => console.log('Data saved to database'))
          .catch(error => console.log(error));
      });
      
      res.status(200).send('Data saved to database');

      
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error getting azkar and adhan');
    });
    
   
});





// Zakat calculator API
app.get('/api/zakatCalculator', (req, res) => {
  const url = 'https://api.aladhan.com/v1/calendarByCity?city=cairo&country=egypt&method=2';
  axios.get(url)
    .then(response => {
      const data = response.data.data;
      const today = data[0];
      const nisab = 595;
      const rate = today.timings.Isha / 60;
      const gold_price = 50;
      const silver_price = 1;
      const assets = {
        gold: 0,
        silver: 0,
        cash: 0
      };
      const liabilities = 0;
      const total_assets = assets.gold * gold_price + assets.silver * silver_price + assets.cash;
      const net_assets = total_assets - liabilities;
      const zakat = net_assets >= nisab ? net_assets * 0.025 : 0;
      res.json({
        nisab,
        rate,
        gold_price,
        silver_price,
        assets,
        liabilities,
        total_assets,
        net_assets,
        zakat
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error getting zakat calculator');
    });
});

// crud for the admin side


// CRUD for Prayer API

// Create
app.post('/api/admin/prayerTime', async (req, res) => {
  try {
    const newPrayer = new Prayer(req.body);
    await newPrayer.save();
    res.status(201).json(newPrayer);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/admin/prayerTime', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.status(200).json(prayers);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/admin/prayerTime/:id', async (req, res) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(prayer);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/admin/prayerTime/:id', async (req, res) => {
  try {
    await Prayer.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// CRUD for Hadith API

// Create
app.post('/api/admin/hadith', async (req, res) => {
  try {
    const newHadith = new Hadith(req.body);
    await newHadith.save();
    res.status(201).json(newHadith);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/admin/hadith', async (req, res) => {
  try {
    const hadiths = await Hadith.find();
    res.status(200).json(hadiths);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/admin/hadith/:id', async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(hadith);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/admin/hadith/:id', async (req, res) => {
  try {
    await Hadith.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});

// CRUD for Recipes API

// Create
app.post('/api/admin/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Read
app.get('/api/admin/recipes', async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update
app.put('/api/admin/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete
app.delete('/api/admin/recipes/:id', async (req, res) => {
  try {
    await Recipes.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});
//************* */



const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is
 running on port ${PORT}`);
});