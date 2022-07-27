import React from 'react'
import "./style.css"
import { Link } from 'react-router-dom'

const CartItemCard = ({ item, deleteCartItem }) => {
    return (
        <>
            <div className="CartItemCard">
                <img src={item.image} alt="productimage" />
                <div className='cartItemDetails'>
                    <span> Name <Link to={`/product/${item.product}`}> {item.name} </Link> </span>
                    <h4> Price <span> {`₹${item.price}`} </span> </h4>
                    <p onClick={() => deleteCartItem(item.product)}>Remove</p>
                </div>
            </div>
        </>
    )
}

export default CartItemCard