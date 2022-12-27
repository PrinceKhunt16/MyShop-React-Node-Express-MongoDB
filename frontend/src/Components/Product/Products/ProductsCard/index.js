import React from 'react'
import "./style.css"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <>
            <div className='bodyProductsCard'>
                <Link className='productsCard' to={`product/${product._id}`}>
                    <img src={product?.images[0]?.url} alt={product.name} />
                    <div className='productsDetails'>
                        <p>{product.name}</p>
                        <div className='priceStock'>
                            <h3>₹{product.price}</h3>
                        </div>
                        <div className='reviews'>
                            <div>
                                <h3>{product.ratings.toFixed(1)}</h3>
                            </div>
                            <h2>{product.numOfReviews} Reviews</h2>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ProductCard