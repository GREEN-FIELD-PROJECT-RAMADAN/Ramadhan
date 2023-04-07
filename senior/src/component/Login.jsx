import React from 'react'
import Swal from 'sweetalert2';
import { useState } from 'react'
import axios from 'axios';
const Login = ({setView}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
   
    
    
const handleSubmit =e=>{
    e.preventDefault()
console.log('hello');
const adminInfo = {
    email:email,
    password:password
}
// setInfo(adminInfo)
axios.defaults.withCredentials = true;

axios.post('http://localhost:3005/ramadan/loginAdmin', adminInfo, {
  headers: {
    'Content-Type': 'application/json'
  }
}).then(({data})=>{
    console.log(data);
if(data==='Token sent in cookie'){

    console.log(data);
    Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 2000,
      });
    setView('Admin')
}
else {
    
    Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
}

})
.catch((err)=>console.log(err))



}



      return (
       <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="card shadow-sm">
             
              <div className="card-body">
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email.."
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

      )
    }

export default Login
