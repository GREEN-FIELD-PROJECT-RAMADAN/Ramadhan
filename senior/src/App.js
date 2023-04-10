import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Praylist from './component/Praylist';
import Zaket from './component/Zaket';
import Recipe from './component/Recipe';
import Hadith from './component/Hadith';
import Login from './component/Login';
import Admin from './component/Admin';
import QiblaDirection from './component/QiblaDirection';




function App() {
  // const [view, setView] = useState('login')
  // const ProtectedAdminRoute = withAuth(Admin);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/Praylist' element={
          <Praylist/>
        }/> 
        <Route
          path="/Zaket"
          element={
            <Zaket />
          }
        />
        <Route
          path="/hadith"
          element={

            <Hadith />
}
        />
        <Route
          path="/recipe"
          element={

            <Recipe />

          }
        />
        <Route path='login' element={
          <Login/>
        } />
        <Route path='admin' element={
          <Admin />
        } />






      
        <Route path='/QiblaDirection' element={
          <React.Fragment>
            <Navbar />
            <QiblaDirection />
          </React.Fragment>
        } /></Routes>
    </div>
  );
}

export default App