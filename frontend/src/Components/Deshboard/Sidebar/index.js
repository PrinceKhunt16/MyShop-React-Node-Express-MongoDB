import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <div className='sidebarItem'>
                    <Link to="/admin/deshboard">
                        <div>DASHBOARD</div>
                    </Link>
                    <Link to="/admin/products">
                        <div>ALL PRODUCTS</div>
                    </Link>
                    <Link to="/admin/product">
                        <div>CREATE PRODUCT</div>
                    </Link>
                    <Link to="/admin/orders">
                        <div>USERS ORDERS</div>
                    </Link>
                    <Link to="/admin/users">
                        <div>YOUR USERS</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar