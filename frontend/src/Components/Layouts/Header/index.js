import React, { useEffect } from 'react'
import "./style.css"
import store from "../../../Redux/store"
import ToastContainerBox from "../../Layouts/ToastContainerBox"
import Search from "../../../Utils/search.png"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { loadUser } from '../../../Redux/action/userAction'

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <>
            <ToastContainerBox />
            <div className='header'>
                <div className='contant'>
                    <div className='logoSearchbar'>
                        <Link to="/">
                            <div className='logo'>My Shop</div>
                        </Link>
                    </div>
                    <div className='searchBox'>
                        {/* <form className='searchbox' onSubmit={searchSubmitHandler}> */}
                        <form className='searchbox'>
                            <input
                                type="text"
                                placeholder='Try your expensive choise by us'
                            // onChange={(e) => setSearch(e.target.value)}
                            />
                            <img src={Search} alt=""></img>
                        </form>
                    </div>
                    <div className='icons'>
                        <ul>
                            <li className='iconsBody'>
                                <Link to="/cart">
                                    <BsFillCartCheckFill />
                                </Link>
                            </li>
                            {!isAuthenticated &&
                                <li className='iconsBody'>
                                    <Link to="/login">
                                        <AiOutlineUser />
                                    </Link>
                                </li>
                            }
                            {isAuthenticated &&
                                <>
                                    <li className='iconsBody'>
                                        <Link to="/account">
                                            <img
                                                className="userIcon"
                                                src={user.avatar.url}
                                                alt=""
                                            />
                                        </Link>
                                    </li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='categoryHeader'>
                <div className='contant'>
                    <div className='item'><Link to="/products">View All</Link></div>
                    <div className='item'><Link to="/products/women-ethnic">Women Ethnic</Link></div>
                    <div className='item'><Link to="/products/women-western">Women Western</Link></div>
                    <div className='item'><Link to="/products/men">Men</Link></div>
                    <div className='item'><Link to="/products/kids">Kids</Link></div>
                    <div className='item'><Link to="/products/home-kitchen">Home & Kitchen</Link></div>
                    <div className='item'><Link to="/products/beauty">Beauty</Link></div>
                    <div className='item'><Link to="/products/jewellery-accessories">Jewellery & Accessories</Link></div>
                    <div className='item'><Link to="/products/bags-footwear">Bags & Footwear</Link></div>
                    <div className='item'><Link to="/products/electronics">Electronics</Link></div>
                </div>
            </div>
        </>
    )
}

export default Header