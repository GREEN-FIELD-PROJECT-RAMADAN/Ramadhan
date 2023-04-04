import React, { useEffect, useState } from 'react'
import Prayer from "./Components/Prayer";
import axios from 'axios';
const  App = ()=> {

  const [prayer,setPrayer] = useState([]) 


  useEffect(()=>{axios.get('http://localhost:3000/api/prayerTime')
  .then(({data})=>
  setPrayer(data))
  .catch((err)=>console.log(err))},[])

  return (
    <div className="App">
     
    <Prayer  prays={prayer} />

    </div>
  );
}

export default App;
