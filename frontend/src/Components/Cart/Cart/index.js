import React from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import CloseImage from '../../../Utils/cancel.png'
import Plus from '../../../Utils/plus.png'
import Minus from '../../../Utils/minus.png'
import { addItemsToCart, removeItemsFromCart } from '../../../Redux/action/cartAction';
import { Link } from 'react-router-dom';

const Cart = ({ history }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;

        if (stock <= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;

        if (1 >= quantity) {
            return;
        }

        dispatch(addItemsToCart(id, newQty));
    };

    const removeCardItem = (id) => {
        dispatch(removeItemsFromCart(id));
    }

    const checkoutHendler = () => {
        history.push("/login?redirect=shipping")
    }

    return (
        <>
            {
                cartItems.length === 0
                    ? (
                        <div className='noItemCardWrapper'>
                        <p className='noItem'>Nothing to show you</p>
                        </div>
                    ) : (
                        <div className='cart'>
                            <div className='heading'>
                                <h1>Shopping Cart</h1>
                            </div>
                            <div className='cartBody'>
                                {
                                    cartItems && cartItems.map((item, idx) => (
                                        <div className='cartItem' key={idx}>
                                            <div className='cartCardImage'>
                                                <img src={item.image} alt="" />
                                            </div>
                                            <div className='cartCardName'><Link to={`/product/${item.product}`}> {item.name} </Link></div>
                                            <div className='addRemoveButtonsCart'>
                                                <div className='addRemoveButtonbody'>
                                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}><img src={Minus} alt="" /></button>
                                                    <h2>{item.quantity}</h2>
                                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}><img src={Plus} alt="" /></button>
                                                </div>
                                            </div>
                                            <div className='cardItemTotal'>
                                                <h4>₹{item.price * item.quantity}</h4>
                                            </div>
                                            <div className='cartItemCancle'>
                                                <p onClick={() => removeCardItem(item.product)}><img src={CloseImage} alt="" /></p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className="cartGrossProfit">
                                <div className='totalPayment'>
                                    <div>
                                        <h3>TOTAL</h3>
                                        <h4>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h4>
                                    </div>
                                </div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHendler}>BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}


export default Cart