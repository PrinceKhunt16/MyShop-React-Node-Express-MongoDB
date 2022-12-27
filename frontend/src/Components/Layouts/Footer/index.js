import React from 'react'
import "./style.css"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <Link to="/">
          <div className='logo'>My&nbsp;Shop</div>
        </Link>
        <div className='rides'>© 2023 My Shop All rights reserved.</div>
      </div>
    </>
  )
}

export default Footer