import React from 'react'
import Sidebar from '../Sidebar'
import "./style.css"
import { Link } from 'react-router-dom'

const Deshboard = () => {
    let outOfStock = 0;
    let totalProducts = 0;
    let totalAmount = 0;
    let totalStock = 0;
    let users = 0;
    let orders = 0;

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