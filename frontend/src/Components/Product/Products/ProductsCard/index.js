import React from 'react'
import "./style.css"
import ReactStars from "react-rating-stars-component"
import { Link } from "react-router-dom"

const ProductCard = ({ product }) => {
    return (
        <>
            <div className='bodyProductsCard'>
                <Link className='productsCard' to={`product/${product._id}`}>
                    <img src={product.images[0].url} alt="Image" />
                    <div className='productsDetails'>
                        <p>{product.name}</p>
                        <div className='ratingReviews'>
                            <ReactStars
                                edit={false}
                                isHalf={true}
                                color={"#878787"}
                                activeColor={"#323232"}
                                size={32}
                                count={5}
                                value={product.ratings}
                            />
                            <span> ( {product.numOfReviews} Reviews ) </span>
                        </div>
                        <div className='priceStock'>
                            <h3>₹{product.price}</h3>
                            <span>( {product.stock} Remain )</span>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default ProductCard