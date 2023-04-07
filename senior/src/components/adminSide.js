
import React, { useState, useEffect } from 'react'; 
import axios from 'axios';

const AdminComponent = () => { 
  const [prayers, setPrayers] = useState([]); 
  const [hadiths, setHadiths] = useState([]); 
  const [recipes, setRecipes] = useState([]); 
  
  useEffect(() => { 
    axios.get('http://localhost:3001/api/admin/prayerTime') 
      .then(res => setPrayers(res.data)) 
      .catch(err => console.log(err)); 
  
    axios.get('http://localhost:3001/api/admin/hadith')  
      .then(res => setHadiths(res.data))  
      .catch(err => console.log(err));  
    
    axios.get('http://localhost:3001/admin/recipes')  
      .then(res => setRecipes(res.data))  
      .catch(err => console.log(err)); 
  }, []); 
  
  const handlePrayerSubmit = (event) => { 
    event.preventDefault(); 
    const data = new FormData(event.target); 
    
    axios.post('http://localhost:3001/api/admin/prayerTime', { 
      city: data.get('city'),  
      date: data.get('date'),  
      Fajr: data.get('Fajr'),  
      Sunrise : data.get('Sunrise'),  
      Dhuhr: data.get('Dhuhr'),  
      Asr: data.get('Asr'),  
      Maghrib: data.get('Maghrib'),  
      Isha: data.get('Isha'),  
      Imsak:data.get('Imsak') 
    })  
      .then(res => setPrayers([...prayers, res.data]))  
      .catch(err => console.log(err));   
  }; 
  
  const handleHadithSubmit = (event) => { 
    event.preventDefault(); 
    const data = new FormData(event.target); 
    
    axios.post('http://localhost:3001/api/admin/hadith', {  
      hadith: data.get('hadith'),  
      narrator: data.get('narrator'),  
      book: data.get('book') 
    })  
      .then(res => setHadiths([...hadiths, res.data]))  
      .catch(err => console.log(err));   
  }; 
  
  const handleRecipeSubmit = (event) => { 
    event.preventDefault(); 
    const data = new FormData(event.target); 
    
    axios.post('http://localhost:3001/api/admin/recipes', {  
      title: data.get('title'),  
      image: data.get('image'),  
      sourceName: data.get('sourceName'),  
      sourceUrl: data.get('sourceUrl'),  
      servings: data.get('servings'),  
      readyInMinutes: data.get('readyInMinutes'),  
      summary : data.get('summary') 
    })  
      .then(res => setRecipes([...recipes, res.data]))  
      .catch(err => console.log(err));   
  }; 
  
  const handlePrayerDelete = (id) => { 
    axios.delete(`http://localhost:3001/api/admin/prayerTime/${id}`) 
      .then(() => setPrayers(prayers.filter(prayer => prayer._id !== id))) 
      .catch(err => console.log(err)); 
  }; 
  
  const handleHadithDelete = (id) => { 
    axios.delete(`http://localhost:3001/api/admin/hadith/${id}`) 
      .then(() => setHadiths(hadiths.filter(hadith => hadith._id !== id))) 
      .catch(err => console.log(err)); 
  }; 
  
  const handleRecipeDelete = (id) => { 
    axios.delete(`http://localhost:3001/api/admin/recipes/${id}`) 
      .then(() => setRecipes(recipes.filter(recipe => recipe._id !== id))) 
      .catch(err => console.log(err)); 
  }; 
  
  return ( 
    <div> 
      <h2>Prayer Times</h2> 
      <ul> 
        {prayers.map(prayer => ( 
          <li key={prayer._id}> 
            {prayer.city} - {prayer.date} - {prayer.Fajr} {prayer.Sunrise} {prayer.Dhuhr} {prayer.Asr} {prayer.Maghrib} {prayer.Isha} {prayer.Imsak} 
            <button onClick={() => handlePrayerDelete(prayer._id)}>Delete</button> 
          </li> 
        ))} 
      </ul> 
      <form onSubmit={handlePrayerSubmit}> 
        <label>City:</label> 
        <input name="city" /> 
        <label>Date:</label> 
        <input name="date" /> 
        <label>Fajr:</label> 
        <input name="Fajr" /> 
        <label>Sunrise:</label> 
        <input name="Sunrise" /> 
        <label>Dhuhr:</label> 
        <input name="Dhuhr" /> 
        <label>Asr:</label> 
        <input name="Asr" /> 
        <label>Maghrib:</label> 
        <input name="Maghrib" /> 
        <label>Isha:</label> 
        <input name="Isha" /> 
        <label>Imsak:</label> 
        <input name="Imsak" /> 
        <button type="submit">Add Prayer Time</button> 
      </form> 
  
      <h2>Hadiths</h2>  
      <ul> 
        {hadiths.map(hadith => (  
          <li key={hadith._id}>  
            {hadith.hadith} - {hadith.narrator} - {hadith.book}  
            <button onClick={() => handleHadithDelete(hadith._id)}>Delete</button>  
          </li> 
        ))}  
      </ul>  
      <form onSubmit={handleHadithSubmit}> 
        <label>Hadith:</label>  
        <input name="hadith" /> 
        <label>Narrator:</label>  
        <input name="narrator" /> 
        <label>Book:</label>  
        <input name="book" /> 
        <button type="submit">Add Hadith</button>  
      </form>  
  
      <h2>Recipes</h2>  
      <ul> 
        {recipes.map(recipe => (  
          <li key={recipe._id}>  
            {recipe.title} - {recipe.image} - {recipe.sourceName} - {recipe.sourceUrl} - {recipe.servings} - {recipe.readyInMinutes} - {recipe.summary} 
            <button onClick={() => handleRecipeDelete(recipe._id)}>Delete</button>  
          </li> 
        ))}  
      </ul>  
      <form onSubmit={handleRecipeSubmit}> 
        <label>Title:</label>  
        <input name="title" /> 
        <label>Image:</label>  
        <input name="image" /> 
        <label>Source Name:</label>  
        <input name="sourceName" /> 
        <label>Source URL:</label>  
        <input name="sourceUrl" /> 
        <label>Servings:</label>  
        <input name="servings" /> 
        <label>Ready in Minutes:</label>  
        <input name="readyInMinutes" /> 
        <label>Summary:</label>  
        <input name="summary" /> 
        <button type="submit">Add Recipe</button>  
      </form> 
    </div> 
  ) 
} 

export default AdminComponent