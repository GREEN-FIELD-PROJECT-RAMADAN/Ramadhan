import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Admin = () => {
  const [hadiths, setHadiths] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3005/ramadhan/admin/hadith')
      .then(res => setHadiths(res.data))
      .catch(err => console.log(err));

    axios.get('http://localhost:3005/ramadhan/admin/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err));
  }, []);



  const handleHadithSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    axios.post('http://localhost:3005/ramadhan/admin/hadith', {
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

    axios.post('http://localhost:3005/ramadhan/admin/recipes', {
      title: data.get('title'),
      image: data.get('image'),
      sourceName: data.get('sourceName'),
      sourceUrl: data.get('sourceUrl'),
      servings: data.get('servings'),
      readyInMinutes: data.get('readyInMinutes'),
      summary: data.get('summary')
    })
      .then(res => setRecipes([...recipes, res.data]))
      .catch(err => console.log(err));
  };



  const handleHadithDelete = (id) => {
    axios.delete(`http://localhost:3005/ramadhan/admin/hadith/${id}`)
      .then(() => setHadiths(hadiths.filter(hadith => hadith._id !== id)))
      .catch(err => console.log(err));
  };

  const handleRecipeDelete = (id) => {
    axios.delete(`http://localhost:3005/ramadhan/admin/recipes/${id}`)
      .then(() => setRecipes(recipes.filter(recipe => recipe._id !== id)))
      .catch(err => console.log(err));
  };

  return (
    <div>

      <ul>
      </ul>
      <h2>Hadiths</h2>
      <ul>
        <form className='container' onSubmit={handleHadithSubmit}>
          <label>Hadith:</label>
          <input name="hadith" />
          <label>Narrator:</label>
          <input name="narrator" />
          <label>Book:</label>
          <input name="book" />
          <button type="submit">Add Hadith</button>
        </form>
        {hadiths.map(hadith => (
          <div key={hadith._id} className='card justify-content-center align-items-center p-2 sm'>
            <div className="card-body" key={hadith._id}>
              <h5 className="card-title">{hadith.narrator}</h5>
              <h6 className="card-text mb-2 text-body-secondary">{hadith.hadith}</h6>
              <p className="card-text">{hadith.book}</p>
              <button type="button" className="btn btn-outline-danger" onClick={() => handleHadithDelete(hadith._id)}>Delete</button>
              <button type="button" className="btn btn-outline-warning">update</button>
            </div>
          </div>))}
      </ul>
      {/* <h2>Recipes</h2>
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
      </form> */}
    </div>
  )

}

export default Admin
