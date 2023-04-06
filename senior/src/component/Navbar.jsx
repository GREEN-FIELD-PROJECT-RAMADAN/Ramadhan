import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'

const Navbar = () => {


  return (
    <div> 
      <nav className="navbar navbar-expand-xxl navbar-light fixed-top bg-Secondary shadow-lg p-3 mb-5 .bg-transparent rounded">
        <div className="container-xxl">
          <Link className="btn btn-outline-dark" to="/">Ramadhan</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                {/* linkedd to recipe food root  */}
                <Link className="btn btn-outline-secondary" to="/recipe">Recipe</Link>
              </li>
              <li className="nav-item">
                {/* linkedd to Zaket calucl root  */}
                <Link className="btn btn-outline-secondary" to="/zaket">Zaket</Link>
              </li>
              {/* linkedd to Hadith root  */}
              <li className="nav-item">
                <Link className="btn btn-outline-secondary" to="/Hadith">Hadith</Link>
              </li>
            </ul>
            {/* search input we may use */}
           
              <Link className="btn btn-outline-success" to="/Login">Login as Admin</Link>
            
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
