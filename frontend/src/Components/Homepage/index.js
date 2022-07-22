import React from 'react'
import BannerPhoto from "../../Utils/bannerPhoto.jpeg"
import "./style.css"
import ProductCard from './ProductCard'

const Homepage = () => {
  const product = {
    name: "Blue Tshirt",
    images: [
      {
        url: "https://i.ibb.co/DRST11n/1.webp"
      }
    ],
    price: "3000",
    _id: "blue-shirt",
    stock: 3,
    numOfReviews: 5,
    ratings: 4
  };

  return (
    <div>
      <div className='homepage'>
        <img src={BannerPhoto} />
      </div>
      <div className='productHeading'>
        <h2>Top Products</h2>
      </div>
      <div className='products'>
        <div className='bodyProducts'>
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
          <ProductCard product={product} />
        </div>
      </div>
    </div>
  )
}

export default Homepage