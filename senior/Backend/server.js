const express = require('express')
const mongoose = require ("mongoose")
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

const cors = require ('cors')
const bcrypt = require('bcryptjs')
const {Prayer,Hadith,Recipes,Admin} = require('./model.js')
const { urlencoded } = require('express')
const app = express()
const axios = require('axios');

app.use(urlencoded({extended:true}))
app.use(express.json())
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/ramadhan').then(()=>console.log('CONNECTED TO DB'))
.catch(console.error)

//Login admin 


app.post('/ramadan/registerAdmin', async (req, res) => {

  try{
    const newPassword = await bcrypt.hash(req.body.password,10)
     await Admin.create({
   email : req.body.email,
   password : newPassword
    })
    res.json({status:'ok'})
  }
  catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
  })
  
  app.post('/ramadan/loginAdmin',async (req,res)=>{
  
  const admin =  await Admin.findOne({
      email:req.body.email,
    })
   
   if(admin){
    const isPasswordvalid = await bcrypt.compare(req.body.password, admin.password)
    if (isPasswordvalid){
      const token = jwt.sign(
        {
        email:admin.email
      },'secret123'
      )
      return res.json({status:'ok',admin : token})
     }
     else {
      return res.json({status:'error, verify password',admin:false})
     }
    }
    else {
      res.status(500).json('Verify email')
    }
  
  })



app.post('/ramadhan/prayerTime', (req, res) => {
  axios.get('https://api.aladhan.com/v1/hijriCalendarByAddress/1444/9?address=Tunisia')
    .then(response => {
      const apiData = response.data.data;
      for (let i = 0; i < apiData.length; i++) {
        const newPrayer = new Prayer({
          city: apiData[i].meta.timezone,
          date: apiData[i].date.readable,

          Fajr: apiData[i].timings.Fajr,
          Sunrise: apiData[i].timings.Sunrise,
          Dhuhr: apiData[i].timings.Dhuhr,
          Asr: apiData[i].timings.Asr,
          Maghrib: apiData[i].timings.Maghrib,
          Isha: apiData[i].timings.Isha,
          Imsak: apiData[i].timings.Imsak


        });

        newPrayer.save()
      }
      res.status(200).json('done')
    })
    .catch(error =>
      console.error(error));
})

app.get('/ramadhan/prayerTime', async (req, res) => {

  try {
    const prayers = await Prayer.find().sort({date:1})
    res.json(prayers)
  } catch (err) {
    res.status(500).send(err)
  }
})


// Halal food API
app.get('/ramadhan/halalfood', async (req, res) => {

  axios.get('https://api.spoonacular.com/recipes/search', {
    params: {
      query: 'chicken',
      number: 10,
      apiKey: "7273c8a186c640e7a5e110216e0e2b69"
    }

  }).then(response => res.json(response.data)).catch(err => console.log(err));
  res.status(200)
})


// Hadith API after save
app.get('/ramadhan/Hadith', async (req, res) => {
  try {
    const Hadithes = await Hadith.find()
    res.json(Hadithes)
  } catch (err) {
    res.status(500).send(err)
  }
})


app.get('/ramadhan/azkarAdhan', (req, res) => {

  const url = 'https://www.hadithapi.com/api/hadiths/?apiKey=$2y$10$9I7clzI9Pl2BUbIdWa2hOa1SpAdjYVmWVhMDm7rJPE8MRSyu68y';
  axios.get(url)
    .then(response => {
      for (let i = 0; i < response.data.hadiths.data.length; i++) {
        console.log(response.data.hadiths.data[i].hadithArabic)
        console.log(response.data.hadiths.data[i].englishNarrator)
        console.log(response.data.hadiths.data[i].book.bookName)
          ;
      }
      const hadithData = response.data.hadiths.data;

      // Create a new instance of the Hadith model for each item in the response data
      hadithData.forEach(data => {
        const hadith = new Hadith({
          hadith: data.hadithArabic,
          narrator: data.englishNarrator,
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

app.post('/ramadhan/admin/prayerTime', async (req, res) => {
  try {
    const newPrayer = new Prayer(req.body);
    await newPrayer.save();
    res.status(201).json(newPrayer);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Read
app.get('/ramadhan/admin/prayerTime', async (req, res) => {
  try {
    const prayers = await Prayer.find();
    res.status(200).json(prayers);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update
app.put('/ramadhan/admin/prayerTime/:id', async (req, res) => {
  try {
    const prayer = await Prayer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(prayer);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Delete
app.delete('/ramadhan/admin/prayerTime/:id', async (req, res) => {
  try {
    await Prayer.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});
// CRUD for Hadith API
// Create
app.post('/ramadhan/admin/hadith', async (req, res) => {
  try {
    const newHadith = new Hadith(req.body);
    await newHadith.save();
    res.status(201).json(newHadith);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Read
app.get('/ramadhan/admin/hadith', async (req, res) => {
  try {
    const hadiths = await Hadith.find();
    res.status(200).json(hadiths);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update
app.put('/ramadhan/admin/hadith/:id', async (req, res) => {
  try {
    const hadith = await Hadith.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(hadith);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Delete
app.delete('/ramadhan/admin/hadith/:id', async (req, res) => {
  try {
    await Hadith.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});
// CRUD for Recipes API
// Create
app.post('/ramadhan/admin/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipes(req.body);
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Read
app.get('/ramadhan/admin/recipes', async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Update
app.put('/ramadhan/admin/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipes.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).send(err);
  }
});
// Delete
app.delete('/ramadhan/admin/recipes/:id', async (req, res) => {
  try {
    await Recipes.findByIdAndDelete(req.params.id);
    res.status(204).send('Deleted');
  } catch (err) {
    res.status(500).send(err);
  }
});
//************* */
 

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`Server is
 running on port ${PORT}`);
});