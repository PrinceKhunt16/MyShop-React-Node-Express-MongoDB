import React, { useEffect } from 'react'
import BannerPhoto from "../../Utils/BannerPhoto.jpeg"
import "./style.css"
import ProductCard from './ProductCard'
import MetaData from "../Layouts/MetaData"
import { getProducts } from '../../Redux/action/productAction'
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Layouts/Loading'

const Homepage = () => {
  const dispatch = useDispatch();

  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <MetaData title={"My Shop Homepage"} />
      <div className='homepage'>
        <img src={BannerPhoto} />
      </div>
      <div className='productHeading'>
        <h2>Top Products</h2>
      </div>
      <div className='products'>
        <div className='bodyProducts'>
          {loading ? (
            <Loading />
          ) : (
            <>
                {products &&
                  products.map((product) => <ProductCard product={product} />)}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Homepage