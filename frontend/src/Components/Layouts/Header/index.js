import React, { useEffect, useState } from 'react'
import "./style.css"
import store from "../../../Redux/store"
import ToastContainerBox from "../../Layouts/ToastContainerBox"
import Search from "../../../Utils/search.png"
import SearchSmall from "../../../Utils/search-small.png"
import Close from "../../../Utils/cancel.png"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link, useHistory } from "react-router-dom"
import { useSelector } from 'react-redux'
import { loadUser } from '../../../Redux/action/userAction'

const Header = () => {
    let history = useHistory()	
    const [keyword, setKeyword] = useState("")
    const [dis, setDis] = useState(false)
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    const handleDisplayOfSearch = () => {
        setDis(!dis)
    }

    const handleSearchDisplay = () => {
        if (window.innerWidth > 700) {
            setDis(false)
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault()

        if(keyword.trim()) {
            history.push(`/products?search=${keyword}`)
        } 
        else {
            history.push("/products");
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
                        <form className='bigScreenSearch' onSubmit={searchSubmitHandler}>
                            <input 
                                type="text"
                                placeholder='Try your expensive choice'
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <img src={Search} alt=""></img>
                        </form>
                    </div>
                    <div className='searchBoxSmall' style={{ display: dis ? 'block' : 'none' }}>
                        <form>
                            <input
                                type="text"
                                placeholder='Try your expensive choice'
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
                    <div className='item'><Link to="/products?type=Women-Ethnic">Women&nbsp;Ethnic</Link></div>
                    <div className='item'><Link to="/products?type=Women-Western">Women&nbsp;Western</Link></div>
                    <div className='item'><Link to="/products?type=Men">Men</Link></div>
                    <div className='item'><Link to="/products?type=Kids">Kids</Link></div>
                    <div className='item'><Link to="/products?type=Home">Home</Link></div>
                    <div className='item'><Link to="/products?type=Kitchen">Kitchen</Link></div>
                    <div className='item'><Link to="/products?type=Beauty">Beauty</Link></div>
                    <div className='item'><Link to="/products?type=Jewellery">Jewellery</Link></div>
                    <div className='item'><Link to="/products?type=Accessories">Accessories</Link></div>
                    <div className='item'><Link to="/products?type=Bags">Bags</Link></div>
                    <div className='item'><Link to="/products?type=Footwear">Footwear</Link></div>
                    <div className='item'><Link to="/products?type=Electronics">Electronics</Link></div>
                </div>
            </div>
        </>
    )
}

export default Header