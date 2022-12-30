import React, { useState, useEffect } from 'react'
import "./style.css"
import MetaData from "../../Layouts/MetaData";
import Loading from '../../Layouts/Loading';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../../Redux/action/userAction";
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const { error, message, loading } = useSelector(
        (state) => state.forgotPassword
    );

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("email", email);

        dispatch(forgotPassword(myForm));
        
        Toast({
            msg: "Email Send by MyShop.com"
        });
    }

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

    }, [dispatch, error, message]);

    return (
        <>
            <MetaData title={`Forgot Password`} />
            <ToastContainerBox />
            {loading ? (
                <Loading />
            ) : (
                <div className="forgotPasswordContainer">
                    <div className="forgotPasswordChangeBox">
                        <form className='forgotPassword' onSubmit={forgotPasswordSubmit}>
                            <h2>FORGOT PASSWORD</h2>
                            <div className='forgotPasswordInput'>
                                <input
                                    type="email"
                                    placeholder="Enter your E-Mail"
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='submitForgotPassword'>
                                <input
                                    type="submit"
                                    value="SEND MAIL"
                                    className="forgotPasswordBtn"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default ForgotPassword