import React, { useEffect, useRef } from "react";
import "./style.css"
import CheckoutSteps from "../CheckoutStep";
import { useSelector, useDispatch } from "react-redux";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import axios from "axios";
import Metadata from "../../Layouts/MetaData";
import ToastContainerBox from "../../Layouts/ToastContainerBox";
import Toast from "../../Layouts/Toast";
import { createOrder, clearErrors } from "../../../Redux/action/orderAction";

const Payment = ({ history }) => {
    const payBtn = useRef(null);
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country,
                        },
                    }
                }
            });

            if (result.error) {
                payBtn.current.disabled = false;
            } else {
                if (result.paymentIntent.status === "succeeded") {

                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status   
                    }
                    
                    dispatch(createOrder(order));
                    
                    Toast({
                        msg: "Your order successfully booked"
                    })

                    history.push("/orders");
                }
            }

        } catch (error) {
            payBtn.current.disabled = false;
        }

    }

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            })

            dispatch(clearErrors());
        }

    }, [dispatch]);

    return (
        <>
            <Metadata title="Payment" />
            <ToastContainerBox />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <div className="paymentBox">
                    <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                        <h2>Payment</h2>
                        <div className="paymentAreaBox">
                            <span>Card Info</span>
                            <div>
                                <h2>Card Number</h2>
                                <CardNumberElement className="paymentInput" />
                            </div>
                            <div>
                                <h2>Card Expiry</h2>
                                <CardExpiryElement className="paymentInput" />
                            </div>
                            <div>
                                <h2>Card cvc</h2>
                                <CardCvcElement className="paymentInput" />
                            </div>
                        </div>
                        <div className="paymentBtnBox">
                            <input
                                type="submit"
                                value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                                ref={payBtn}
                                className="paymentFormBtn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Payment