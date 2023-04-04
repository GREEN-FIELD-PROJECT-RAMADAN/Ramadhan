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
             query: 'pasta',
             number: 10,
             apiKey: "7273c8a186c640e7a5e110216e0e2b69"
           }
   
         }).then(response => {
       const recipes = response.data.results
       recipes.forEach(data => {
         const  recipe= new Recipes({
           title: data.title,
           image: data.image,
           sourceName: data.sourceName,
           sourceUrl: data.sourceUrl,
           servings: data.servings,
           readyInMinutes: data.readyInMinutes,
           summary : data.summary
         })
         recipe.save()
         .then(() => console.log('Data saved to database'))
         .catch(error => console.log(error));
     });
     
     res.status(200).send('Data saved to database');
   
       })
     })


// Hadith API



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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is
 running on port ${PORT}`);
});