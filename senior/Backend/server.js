const express = require('express')
const mongoose = require ("mongoose")
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');
const {LocalStorage} = require('node-localstorage');
const cors = require ('cors')
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs')
const {Prayer,Hadith,Recipes,Admin} = require('./model.js')
const { urlencoded } = require('express')
const app = express()
const axios = require('axios');
const session = require('express-session');
app.use(urlencoded({extended:true}))
app.use(express.json())

app.use(cors({ origin: true, credentials: true, maxAge: 3600 }));
app.use(cookieParser());

app.get('/getCookie', (req, res) => {
  // get the cookie named "myCookie"
  const myCookie = req.cookies.jwt;
  console.log(req.cookies); 
  res.send('Cookie received');
});
app.use(session({
  secret: 'secret123',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 } // 1 hour
}));


mongoose.connect('mongodb://127.0.0.1:27017/ramadhan').then(()=>console.log('CONNECTED TO DB'))
.catch(console.error)

// //Login admin 
// const localStorage = new LocalStorage('./scratch');


//Logout deletes the cookie
app.get('/logout', (req, res) => {
  
  res.clearCookie('jwt', { path: '/' });
  res.status(200).send('Logged out successfully');
});

//////////////

// REgistering an admin in the back 
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
  
//Logging in and setting the cookie 

  app.post('/ramadan/loginAdmin', async (req, res) => {
    const admin = await Admin.findOne({
      email: req.body.email,
    });
  
    if (admin) {
      const isPasswordvalid = await bcrypt.compare(req.body.password, admin.password);
      if (isPasswordvalid) {
        const token = jwt.sign({ email: admin.email }, 'secret123');
        res.cookie('jwt', token, { httpOnly: false, maxAge: 3600000 });
        // req.session.token = token;
        // localStorage.setItem('token',token);
        res.status(200).send('Token sent in cookie');
      } else {
        return res.json({ status: 'error, verify password', admin: false });
      }
    } else {
      console.log('Email not found ');
      return res.json({ status: 'error, verify email', admin: false });
    }
  });


//Saving my prayers in the database
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
////Prayer time api
app.get('/ramadhan/prayerTime', async (req, res) => {

  try {
    const prayers = await Prayer.find().sort({date:1})
    res.json(prayers)
  } catch (err) {
    res.status(500).send(err)
  }
})


// Halal food API
app.post('/ramadhan/halalfood', async (req, res) => {
  try {
    const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
      params: {
        cuisines: ['Tunisian', 'Egyptian', 'Syrian'],
        diet: 'halal',
        number: 90,
        apiKey: '7273c8a186c640e7a5e110216e0e2b69'
      }
    });
    
    const recipes = response.data.results.map(recipe => {
      return {
        title: recipe.title,
        image: recipe.image,
        sourceName: recipe.sourceName,
        sourceUrl: recipe.sourceUrl,
        servings: recipe.servings,
        readyInMinutes: recipe.readyInMinutes,
        summary: recipe.summary
      }
    });

    await Recipes.insertMany(recipes);
    res.status(200).json('Recipes saved successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error!');
  }
});
app.get('/ramadhan/halalfood', async (req, res) => {
  try {
    const prayers = await Recipes.find();
    res.status(200).json(prayers);
  } catch (err) {
    res.status(500).send(err);
  }
});


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