import React,{useEffect,useState} from 'react'
import axios from 'axios'


const Recipe = () => {
  const [Food,setFood]=useState([])
  useEffect(()=>{
    axios.get('http://localhost:3000/api/halalfood').then(({food})=>{
      setFood(food)
    }).catch((err)=>console.log(err))
  })
  console.log(Food);
  return (
    <div>
      
    </div>
  )
}

export default Recipe
