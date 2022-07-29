import React, { useEffect, useState } from 'react'
import "./style.css"
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar"
import { useSelector, useDispatch } from "react-redux";
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';
import { clearErrors, getOrderDetails, updateOrder } from '../../../Redux/action/orderAction';
import { UPDATE_ORDER_RESET } from '../../../Redux/constant/orderConstant';
import ToastContainerBox from '../../Layouts/ToastContainerBox';
import Toast from '../../Layouts/Toast';

const ProcessOrder = ({ history, match }) => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const [status, setStatus] = useState("");

    const dispatch = useDispatch();

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("status", status);

        dispatch(updateOrder(match.params.id, myForm));
    };

    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }

        if (updateError) {
            dispatch(clearErrors());
        }
 
        if (isUpdated) {
            Toast({
                msg: "Update Order succesfully"
            });

            dispatch({ type: UPDATE_ORDER_RESET });
        }

        dispatch(getOrderDetails(match.params.id));

    }, [dispatch, error, match.params.id, isUpdated, updateError]);

    return (
        <>
            <Metadata title="Update Order" />
            <ToastContainerBox />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="orderDetailContainer">
                        <div className="confirmBox">
                            <h2>Order</h2>
                            <div className="confirmshippingAreaBox">
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
                                    <span>{order.shippingInfo && order.shippingInfo.city} {order.shippingInfo && order.shippingInfo.state}</span>
                                </div>
                                <div>
                                    <p>Pincode</p>
                                    <span>{order.shippingInfo && order.shippingInfo.pinCode} {order.shippingInfo && order.shippingInfo.country}</span>
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
                                    <span>{order.totalPrice && order.totalPrice}</span>
                                </div>
                                <div>
                                    <p>Order</p>
                                    <span
                                        className={
                                            order.orderStatus && order.orderStatus === "Delivered"
                                                ? "greenColor"
                                                : "redColor"
                                        }
                                    >
                                        {order.orderStatus && order.orderStatus}
                                    </span>
                                </div>
                            </div>
                            <div className="itemConfirmBox">
                                {order.orderItems &&
                                    order.orderItems.map((item) => (
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
                            <div
                                className="processOrderBox"
                                style={{
                                    display: order.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={(e) => updateOrderSubmitHandler(e)}
                                >
                                    <div>
                                        <p>Process Order</p>
                                        <div className='selectBox'>
                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                <option value="">Order Status</option>
                                                {order.orderStatus === "Processing" && (
                                                    <option value="Shipped">Shipped</option>
                                                )}
                                                {order.orderStatus === "Shipped" && (
                                                    <option value="Delivered">Delivered</option>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading ? true : false || status === "" ? true : false}
                                        className='proceedToPaymentBtn'
                                    >
                                        Process
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProcessOrder