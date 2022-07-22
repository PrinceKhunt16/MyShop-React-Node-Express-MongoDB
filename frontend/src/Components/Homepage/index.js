import React from 'react'
import BannerPhoto from "../../Utils/bannerPhoto.jpeg"
import "./style.css"

const Homepage = () => {
  return (
    <div className='homepage'>
        <img src={BannerPhoto} />
    </div>
  )
}

export default Homepage