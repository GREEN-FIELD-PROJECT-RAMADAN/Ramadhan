import React from 'react';
import { Routes,Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Praylist from './component/Praylist';
import Zaket from './component/Zaket';
import Recipe from './component/Recipe';
import Hadith from './component/Hadith';
import Login from './component/Login';
import { useState } from 'react';
import Admin from './component/Admin';


function App() {

  const [isAuthenticated, setAuthenticated] = useState(false);
  const [view,setView]=useState('login')

    return (
      <Routes>
        <Route
          path="/"
          element={
            <React.Fragment>
              <Navbar/>
              <div className="container mt-3 d-flex justify-content-center">
              <Praylist />
              </div>
            </React.Fragment>
          }
        />
        <Route
          path="/Zaket"
          element={
            <React.Fragment>
              <Navbar />
              <Zaket />
            </React.Fragment>
          }
        />
       <Route
          path="/hadith"
          element={
            <React.Fragment>
              <Navbar />
              <Hadith/>
            </React.Fragment>
          }
        />
        <Route
          path="/recipe"
          element={
            <React.Fragment>
              <Navbar />
              <Recipe />
            </React.Fragment>
          }
        />
          <Route
          path="/Login"
          element={
            <React.Fragment>
              <Navbar />
              {view==="login"&& <Login setView={setView}/>}
              {view==="Admin" && <Admin />}
            </React.Fragment>
          }
        />
      </Routes>
    );
  }
  
  export default App