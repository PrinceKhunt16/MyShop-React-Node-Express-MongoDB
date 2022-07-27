import React from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import CartItemCard from '../CartItemCard';
import { addItemsToCart, removeItemsFromCart } from '../../../Redux/action/cartAction';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

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
                        <p className='noNoItem'> No Items...</p>
                    ) : (
                        <div className='cartPage'>
                            <div className='cartHeader'>
                                <p id="productNames">Product</p>
                                <p id="productQuantity">Quantity</p>
                                <p id="productSubTotal">SubTotal</p>
                            </div>
                            {
                                cartItems && cartItems.map((item) => (
                                    <div className='cartContainer' key={item.product}>
                                        <div className='cartCardItem'>
                                            <CartItemCard item={item} deleteCartItem={removeCardItem} />
                                        </div>
                                        <div className='addRemoveButtons'>
                                            <button onClick={() => decreaseQuantity(item.product, item.quantity)}><AiOutlineMinus /></button>
                                            <h2>{item.quantity}</h2>
                                            <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}><AiOutlinePlus /></button>
                                        </div>
                                        <div className='cardItemTotal'>
                                            <p>₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className="cartGrossProfit">
                                <div className="cartGrossProfitBox">
                                    <p>Gross Total</p>
                                    <h3>₹{cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</h3>
                                </div>
                                <div className="checkOutBtn">
                                    <button onClick={checkoutHendler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    )
}


export default Cart