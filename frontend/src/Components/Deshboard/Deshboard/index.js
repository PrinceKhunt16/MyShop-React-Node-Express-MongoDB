import React, { useEffect } from 'react'
import Sidebar from '../Sidebar'
import "./style.css"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProducts } from '../../../Redux/action/productAction';
import { getAllOrders } from '../../../Redux/action/orderAction';
import { getAllUsers } from '../../../Redux/action/userAction';

const Deshboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);

    const { orders } = useSelector((state) => state.allOrders);

    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;
    let totalProducts = 0;
    let totalAmount = 0;
    let totalStock = 0;

    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }

            totalStock += item.stock;

            totalProducts += 1;

        });

    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    useEffect(() => {
        dispatch(getAdminProducts());

        dispatch(getAllOrders());

        dispatch(getAllUsers());

    }, [dispatch]);

    return (
        <div className='deshboardContent'>
            <div className='deshboard'>
                <Sidebar />
            </div>
            <div className='deshboardContainer'>
                <h2>Deshboard</h2>
                <div className='deshboardSummary'>
                    <div className='deshboardSummaryOne'>
                        <p>Total Amount {totalAmount} Rupees</p>
                    </div>
                    <div className='deshboardSummaryTwo'>
                        <div className='linkWithDetails'>
                            <Link to="/admin/products">
                                <p>Products</p>
                                <p>{totalProducts}</p>
                            </Link>
                        </div>
                        <div className='linkWithDetails'>
                            <Link to="/admin/orders">
                                <p>Orders</p>
                                <p>{orders && orders.length}</p>
                            </Link>
                        </div>
                        <div className='linkWithDetails'>
                            <Link to="/admin/users">
                                <p>Users</p>
                                <p>{users && users.length}</p>
                            </Link>
                        </div>
                        <div className='linkWithDetails'>
                            <Link to="#">
                                <p>OutStock</p>
                                <p>{outOfStock}</p>
                            </Link>
                        </div>
                        <div className='linkWithDetails'>
                            <Link to="#">
                                <p>InStock</p>
                                <p>{totalProducts - outOfStock}</p>
                            </Link>
                        </div>
                        <div className='linkWithDetails'>
                            <Link to="#">
                                <p>TotalStock</p>
                                <p>{totalStock}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Deshboard