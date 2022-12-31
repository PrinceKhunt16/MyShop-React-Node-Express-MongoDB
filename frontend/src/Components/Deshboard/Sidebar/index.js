import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <div className='sidebarItem'>
                    <Link to="/admin/deshboard">
                        <div className='dashboardBorderBottom'>Deshboard</div>
                    </Link>
                    <Link to="/admin/products">
                        <div className='dashboardBorderBottom'>All Products</div>
                    </Link>
                    <Link to="/admin/product">
                        <div className='dashboardBorderBottom'>Create Product</div>
                    </Link>
                    <Link to="/admin/orders">
                        <div className='dashboardBorderBottom'>Users Orders</div>
                    </Link>
                    <Link to="/admin/users">
                        <div>Your Users</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Sidebar