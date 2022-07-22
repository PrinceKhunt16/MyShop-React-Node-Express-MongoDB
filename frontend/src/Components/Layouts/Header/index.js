import React from 'react'
import "./style.css"
import { IoIosSearch } from "react-icons/io"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"

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
                                <a to="/"> Home </a>
                            </li>
                            <li>
                                <a to="/products"> Products </a>
                            </li>
                            <li>
                                <a to="/contact"> Contact </a>
                            </li>
                            <li>
                                <a to="/aboutus"> About </a>
                            </li>
                        </ul>
                    </div>
                    <div className='icons'>
                        <ul>
                            <li className='searchProductInput'>
                                <input type="text" placeholder='Search Product' />
                            </li>
                            <li className='iconsBody'>
                                <a to="/login">
                                    <AiOutlineUser />
                                </a>
                            </li>
                            <li className='iconsBody'>
                                <a to="/cart">
                                    <BsFillCartCheckFill />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header