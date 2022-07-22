import React from 'react'
import "./style.css"
import { IoIosSearch } from "react-icons/io"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link } from "react-router-dom"

const Header = () => {
     return (
        <>
            <div className='header'>
                <div className='contant'>
                    <a to="/">
                        <div className='logo'>My Shop</div>
                    </a>
                    <div className='otherRoutes'>
                        <ul>
                            <li>
                                <Link to="/"> Home </Link>
                            </li>
                            <li>
                                <Link to="/products"> Products </Link>
                            </li>
                            <li>
                                <Link to="/contact"> Contact </Link>
                            </li>
                            <li>
                                <Link to="/aboutus"> About </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='icons'>
                        <ul>
                            <li className='searchProductInput'>
                                <input type="text" placeholder='Search Product' />
                            </li>
                            <li className='iconsBody'>
                                <Link to="/login">
                                    <AiOutlineUser />
                                </Link>
                            </li>
                            <li className='iconsBody'>
                                <Link to="/cart">
                                    <BsFillCartCheckFill />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header