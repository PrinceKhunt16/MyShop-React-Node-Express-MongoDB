import React, { useEffect } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, getOrderDetails } from '../../../Redux/action/orderAction';
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';

const OrderDetails = ({ match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, error, match.params.id]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    {order &&  
                        <>
                            <Metadata title="Order Details" />
                            <div className="myordersContainer">
                                <div className="myordersBox">
                                    <h2>ORDER {order && order._id}</h2>
                                    <div className="myordersshippingAreaBox">
                                        <div>
                                            <p>Name</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone</p>
                                            <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                                        </div>
                                        <div>
                                            <p>Address</p>
                                            <span>{order.shippingInfo && order.shippingInfo.address}</span>
                                        </div>
                                        <div>
                                            <p>City</p>
                                            <span>{order.shippingInfo && order.shippingInfo.city}, {order.shippingInfo && order.shippingInfo.state}</span>
                                        </div>
                                        <div>
                                            <p>Pincode</p>
                                            <span>{order.shippingInfo && order.shippingInfo.pincode}, {order.shippingInfo && order.shippingInfo.country}</span>
                                        </div>
                                        <div>
                                            <p>Payment</p>
                                            <span>
                                                {order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "Paid"
                                                    : "Not Paid"
                                                }
                                            </span>
                                        </div>
                                        <div>
                                            <p>Amount</p>
                                            <span>₹{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>
                                    <div className="itemConfirmBox">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div className="itemBoxConfirm" style={{ margin: "5px auto" }} key={item.product}>
                                                    <img src={item.image} alt="productimage" />
                                                    <div className='itemConfirmDetails'>
                                                        <h4><Link to={`/product/${item.product}`}> {item.name}</Link></h4>
                                                        <h4><span>Price {`₹${item.price}`}</span></h4>
                                                        <h4>{item.quantity} X ₹{item.price} = <span>₹{item.price * item.quantity}</span></h4>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            )
            }
        </>
    )
}

export default OrderDetails