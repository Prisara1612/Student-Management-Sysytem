import React, { useState } from 'react'
import './login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
const Login = () => {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate=useNavigate()
    const [error, setError] = useState(null)
   
    axios.defaults.withCredentials = true;
    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:3000/auth/adminlogin', values)
        .then(result => {
            if(result.data.loginStatus) {
                localStorage.setItem("valid", true)
                navigate('/dashboard')
            } else {
                setError(result.data.Error)
            }
        })
        .catch(err => console.log(err))
    }



  return (
    <div className='login_page'>
    <div className='login_box'>
    <div className='text-warning'>
                {error && error}
            </div>
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
<div className='email_input'>
    <label htmlFor='email'><strong>Email:</strong></label>
    <input onChange={(e)=>setValues({...values,email:e.target.value})}  type='email' placeholder='Enter Email'autoComplete="off"/>
</div>
        
<div className='pass_input'>
    <label htmlFor='password'><strong>Password:</strong></label>
    <input onChange={(e)=>setValues({...values,password:e.target.value})} type='password' placeholder='Enter Password'autoComplete="off"/>
</div>
<button className='btn'>Submit</button>
        </form>
     <div className='foot'>
        <input type='checkbox' id='tick'/>
        <label>You are Agree with terma & conditions</label>
        </div>   
    </div>
    </div>
  )
}

export default Login
