import React, { useRef, useState, useEffect } from "react";
import "./style.css"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";
import { login, register } from "../../../Redux/action/userAction";
import { clearErrors } from "../../../Redux/action/productAction";
import Loading from "../../Layouts/Loading"

const LoginSignup = ({ history, location }) => {
    const dispatch = useDispatch();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("https://img.freepik.com/free-photo/young-handsome-man-with-beard-isolated-keeping-arms-crossed-frontal-position_1368-132662.jpg?size=626&ext=jpg&ga=GA1.2.1407001320.1653475015");
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });

    const { username, email, password } = user;

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));

        Toast({
            msg: "Login Succesfully"
        });
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", username);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));

        Toast({
            msg: "Register Succesfully"
        });
    }

    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);

        } else {
            setUser({ ...user, [e.target.name]: e.target.value })
        }
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

    const redirect = location.search ? location.search.split("=")[1] : "/account";

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (isAuthenticated) {
            history.push(redirect);
        }

    }, [dispatch, error, isAuthenticated, history])

    return (
        <>
            <ToastContainerBox />
            {loading
                ? (
                    <Loading />
                )
                : (
                    <div className="LoginSignUpContainer">
                        <div className="LoginSignUpBox">
                            <div className="buttonsBox">
                                <div className="login_signUp_toggle">
                                    <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                    <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
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
                                    <input type="submit" value="LOGIN" className="loginBtn" />
                                </div>
                            </form>
                            <form className="signupForm" ref={registerTab} encType="multipart/form-data" onSubmit={(e) => { registerSubmit(e) }}>
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
                                        value="RAGISTER"
                                        className="signupBtn"
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default LoginSignup