import React, { useEffect, useState } from 'react'
import "./style.css"
import store from "../../../Redux/store"
import ToastContainerBox from "../../Layouts/ToastContainerBox"
import Search from "../../../Utils/search.png"
import SearchSmall from "../../../Utils/search-small.png"
import Close from "../../../Utils/cancel.png"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'
import { loadUser } from '../../../Redux/action/userAction'

const Header = () => {
    const [dis, setDis] = useState(false)
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    const handleDisplayOfSearch = () => {
        setDis(!dis)
    }

    const handleSearchDisplay = () => {
        if(window.innerWidth > 700){
            setDis(false) 
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleSearchDisplay);
    }, [])

    return (
        <>
            <ToastContainerBox />
            <div className='header'>
                <div className='contant'>
                    <div className='logoContant'>
                        <Link to="/">
                            <div className='logo'>My&nbsp;Shop</div>
                        </Link>
                    </div>
                    <div className='searchBox'>
                        {/* <form className='searchbox' onSubmit={searchSubmitHandler}> */}
                        <form className='bigScreenSearch'>
                            <input
                                type="text"
                                placeholder='Try your expensive choice'
                            // onChange={(e) => setSearch(e.target.value)}
                            />
                            <img src={Search} alt=""></img>
                        </form>
                    </div>
                    <div className='searchBoxSmall' style={{ display: dis ? 'block' : 'none' }}>
                        <form>
                            <input
                                type="text"
                                placeholder='Try your expensive choice'
                            // onChange={(e) => setSearch(e.target.value)}
                            />
                            <img id='searchIcon' src={Search} alt=""></img>
                            <img onClick={() => setDis(!dis)} id='closeIcon' src={Close} alt=""></img>
                        </form>
                    </div>
                    <div className='icons'>
                        <ul>
                            <li onClick={() => handleDisplayOfSearch()} id='searchIconDiv' className='iconsBody'>
                                <div>
                                    <img src={SearchSmall} alt=""></img>
                                </div>
                            </li>
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
                    <div className='item'><Link to="/products">View&nbsp;All</Link></div>
                    <div className='item'><Link to="/products/women-ethnic">Women&nbsp;Ethnic</Link></div>
                    <div className='item'><Link to="/products/women-western">Women&nbsp;Western</Link></div>
                    <div className='item'><Link to="/products/men">Men</Link></div>
                    <div className='item'><Link to="/products/kids">Kids</Link></div>
                    <div className='item'><Link to="/products/home-kitchen">Home&nbsp;&&nbsp;Kitchen</Link></div>
                    <div className='item'><Link to="/products/beauty">Beauty</Link></div>
                    <div className='item'><Link to="/products/jewellery-accessories">Jewellery&nbsp;&&nbsp;Accessories</Link></div>
                    <div className='item'><Link to="/products/bags-footwear">Bags&nbsp;&&nbsp;Footwear</Link></div>
                    <div className='item'><Link to="/products/electronics">Electronics</Link></div>
                </div>
            </div>
        </>
    )
}

export default Header