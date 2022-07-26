import React, { useRef, useState, useEffect } from "react";
import "./style.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";

const LoginSignup = ({ history, location }) => {
    const dispatch = useDispatch();
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("https://img.freepik.com/free-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?size=626&ext=jpg&ga=GA1.2.1407001320.1653475015");
    const [user, setUser] = useState({
		username: "",
		email: "",
		password: ""
	});
	
    const { username, email, password } = user;

    const loginSubmit = () => {

    }

    const registerSubmit = () => {

    }

    const registerDataChange = () => {

    }

    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <>
            <ToastContainerBox />
            <div className="LoginSignUpContainer">
                <div className="LoginSignUpBox">
                    <div className="buttonsBox">
                        <div className="login_signUp_toggle">
                            <p onClick={(e) => switchTabs(e, "login")}>Login</p>
                            <p onClick={(e) => switchTabs(e, "register")}>Register</p>
                        </div>
                        <button ref={switcherTab}></button>
                    </div>
                    <form className="loginForm" ref={loginTab} onSubmit={(e) => { loginSubmit(e) }}>
                        <div className="loginEmail">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                required
                                value={loginEmail}
                                onChange={(e) => setLoginEmail(e.target.value)}
                            />
                        </div>
                        <div className="loginPassword">
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                required
                                value={loginPassword}
                                onChange={(e) => setLoginPassword(e.target.value)}
                            />
                        </div>
                        <div className="loginSubmitBtn">
                            <Link to="/password/forgot">Forgot Password ?</Link>
                            <input type="submit" value="Login" className="loginBtn" />
                        </div>
                    </form>
                    <form className="signupForm" ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                        <div className="signupName">
                            <input
                                type="text"
                                placeholder="Enter Your Name"
                                required
                                name="username"
                                value={username}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signupEmail">
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                required
                                value={email}
                                name="email"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signupPassword">
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                required
                                name="password"
                                value={password}
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="registerImage">
                            <img src={avatarPreview} width={"40"} alt="Avatar Preview" />
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={registerDataChange}
                            />
                        </div>
                        <div className="signupSubmitBtn">
                            <input
                                type="submit"
                                value="Ragister"
                                className="signupBtn"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginSignup