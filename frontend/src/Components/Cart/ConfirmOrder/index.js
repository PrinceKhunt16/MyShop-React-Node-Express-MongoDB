import React from 'react'
import "./style.css"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutStep from "../CheckoutStep"
import Metadata from '../../Layouts/MetaData';

const ConfirmOrder = ({ history }) => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subtotal > 1000 ? 0 : 200;

    const tax = subtotal * 0.18;

    const totalPrice = subtotal + tax + shippingCharges;

    const address = `${shippingInfo.address}`;

    const city = `${shippingInfo.city}, ${shippingInfo.state}`;

    const Pincode = `${shippingInfo.pincode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            tax,
            totalPrice,
        };

        sessionStorage.setItem("orderInfo", JSON.stringify(data));

        history.push("/process/payment");
    };

    return (
        <>
            <Metadata title="Confirm Your Order" />
            <CheckoutStep activeStep={1} />
            <div className="confirmContainer">
                <div className="confirmBox">
                    <h2>SHIPPING INFO</h2>
                    <div className="confirmshippingAreaBox">
                        <div>
                            <p>Name</p>
                            <span>{user.name}</span>
                        </div>
                        <div>
                            <p>Phone</p>
                            <span>{shippingInfo.phoneNo}</span>
                        </div>
                        <div>
                            <p>Address</p>
                            <span>{address}</span>
                        </div>
                        <div>
                            <p>City</p>
                            <span>{city}</span>
                        </div>
                        <div>
                            <p>Pincode</p>
                            <span>{Pincode}</span>
                        </div>
                    </div>
                    <div className="itemConfirmBox">
                        {cartItems &&
                            cartItems.map((item) => (
                                <div className="ItemBoxConfirm" key={item.product}>
                                    <img src={item.image} alt="productimage" />
                                    <div className='itemConfirmDetails'>
                                        <h4> Name <Link to={`/product/${item.product}`}> {item.name} </Link> </h4>
                                        <h4> Price <span> {`₹${item.price}`} </span> </h4>
                                        <h4>{item.quantity} X ₹{item.price} = <span>₹{item.price * item.quantity}</span></h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="totalGrossAreaBox">
                        <div>
                            <p>Subtotal</p>
                            <span>₹{subtotal}</span>
                        </div>
                        <div>
                            <p>Shipping Charges</p>
                            <span>₹{shippingCharges}</span>
                        </div>
                        <div>
                            <p>GST</p>
                            <span>₹{tax}</span>
                        </div>
                        <div>
                            <p>Total</p>
                            <span>₹{totalPrice}</span>
                        </div>
                    </div>
                    <button onClick={proceedToPayment} className='proceedToPaymentBtn'>PROCEED TO PAYMENT</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmOrder