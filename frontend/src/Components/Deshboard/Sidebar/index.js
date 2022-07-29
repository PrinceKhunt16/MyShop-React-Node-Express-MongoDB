import React from 'react'
import "./style.css"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <>
            <div className='sidebar'>
                <div className='sidebarItem'>
                    <div>
                        <Link to="/admin/deshboard">
                            <div>Deshboard</div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/admin/products">
                            <div>All Products</div>
                        </Link>
                    </div>
                    <div>
                        <Link to="/admin/product">
                            <div>Create Product</div>
                        </Link>
                    </div>
                    <div>      
                        <Link to="/admin/orders">
                            <div>Users Orders</div>
                        </Link>
                    </div>
                    <div> 
                        <Link to="/admin/users">
                            <div>Your Users</div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar