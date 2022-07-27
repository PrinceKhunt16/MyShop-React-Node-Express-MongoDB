import React, { useEffect, useState } from 'react'
import "./style.css"
import { AiOutlineUser } from "react-icons/ai"
import { BsFillCartCheckFill } from "react-icons/bs"
import { Link } from "react-router-dom"
import store from "../../../Redux/store"
import { SpeedDial } from "@mui/material"
import { SpeedDialAction } from '@mui/material';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ReorderIcon from '@mui/icons-material/Reorder';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";
import { loadUser, logout } from '../../../Redux/action/userAction'
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox"

const Header = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    const [open, setOpen] = useState(false);

    const history = useHistory();

    const options = [
        { icon: <AccountCircleIcon />, name: "Account", func: account },
        { icon: <ReorderIcon />, name: "Orders", func: orders },
        { icon: <LogoutIcon />, name: "Logout", func: logoutUser },
    ];

    const aboutUser = Object.assign({}, user);

    if (aboutUser.role === "admin") {
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard,
        });
    }

    function dashboard() {
        history.push("/admin/deshboard");
    }

    function orders() {
        history.push("/orders");
    }

    function account() {
        history.push("/account");
    }

    function logoutUser() {
        Toast({
            msg: "Logout Succesfully"
        })

        dispatch(logout());
    }

    return (
        <>
            <ToastContainerBox />
            <div className='header'>
                <div className='contant'>
                    <Link to="/">
                        <div className='logo'>My Shop</div>
                    </Link>
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
                            {isAuthenticated &&
                                <li>
                                    <div className='speedDialBody'>
                                        <SpeedDial
                                            ariaLabel="SpeedDial tooltip example"
                                            onClose={() => setOpen(false)}
                                            onOpen={() => setOpen(true)}
                                            open={open}
                                            direction="down"
                                            className="speedDial"
                                            icon={
                                                <img
                                                    className="speedDialIcon"
                                                    src={user.avatar.url}
                                                    alt=""
                                                />
                                            }
                                        >
                                            {options.map((item) => (
                                                <SpeedDialAction
                                                    key={item.name}
                                                    icon={item.icon}
                                                    tooltipTitle={item.name}
                                                    onClick={item.func}
                                                    tooltipOpen={window.innerWidth <= 600 ? true : false}
                                                />
                                            ))}
                                        </SpeedDial>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header