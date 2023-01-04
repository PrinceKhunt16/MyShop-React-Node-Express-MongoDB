import React from 'react'
import BannerPhoto from "../../Utils/BannerPhoto.jpeg"
import "./style.css"
import MetaData from "../Layouts/MetaData"
import ToastContainerBox from '../Layouts/ToastContainerBox'
import { Link } from 'react-router-dom'
import Shirt from '../../Utils/shirt.webp'
import Beauty from '../../Utils/beauty.jpg'
import Footware from '../../Utils/footware.jpg'
import Jackat from '../../Utils/jackat.webp'
import Jawallry from '../../Utils/jawallry.jpg'
import Pant from '../../Utils/pant.jpg'
import Kids from '../../Utils/kids.jpg'
import Kurti from '../../Utils/kurti.webp'

const Homepage = () => {
  return (
    <div>
      <ToastContainerBox />
      <MetaData title={"My Shop Homepage"} />
      <div className='homepage'>
        <Link to="/products">
          <img src={BannerPhoto} alt='' />
        </Link>
      </div>
      <div className='productPhotoGrid'>
        <div className='productPhoto'>
          <Link to="/products?type=Men">
            <img src={Shirt} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Men">
            <img src={Jackat} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Footwear">
            <img src={Footware} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Men">
            <img src={Pant} alt='' />
          </Link>
        </div>
      </div>
      <div className='productPhotoGrid'>
        <div className='productPhoto'>
          <Link to="/products?type=Beauty">
            <img src={Beauty} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Jewellery">
            <img src={Jawallry} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Kids">
            <img src={Kids} alt='' />
          </Link>
        </div>
        <div className='productPhoto'>
          <Link to="/products?type=Women-Western">
            <img src={Kurti} alt='' />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Homepage