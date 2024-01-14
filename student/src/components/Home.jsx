import React from 'react'
import './home.css'

const Home = () => {
  return (
    <div className='container'>
        <div className='box' id='b1'>
            <div className='inside_box'>
        <i class="fa-solid fa-graduation-cap"></i>
       
        <h2>Total Students </h2>
        </div>   
        </div>
        <div className='box' id='b2'>
        <div className='inside_box'>
        <i class="fa-solid fa-triangle-exclamation"></i>
        <h2>Failed students</h2>
        </div>

        </div>
        <div className='box' id='b3'>
        <div className='inside_box'>
        <i class="fa-regular fa-calendar-check"></i>
        <h2>Passed students </h2>
        </div>
        </div>
  
    </div>
  )
}

export default Home
