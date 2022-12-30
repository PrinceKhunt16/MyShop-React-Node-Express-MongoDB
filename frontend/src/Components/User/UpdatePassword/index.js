import React, { useEffect, useState } from 'react'
import "./style.css"
import MetaData from "../../Layouts/MetaData";
import Loading from '../../Layouts/Loading';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from '../../../Redux/action/userAction';
import { UPDATE_PASSWORD_RESET } from '../../../Redux/constant/userConstant';
import Toast from "../../Layouts/Toast";
import ToastContainerBox from "../../Layouts/ToastContainerBox";

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    };

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            })

            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
    }, [dispatch, error, history, isUpdated]);

    return (
        <>
            <MetaData title={`Update Password`} />
            <ToastContainerBox />
            {loading ? (
                <Loading />
            ) : (
                <div className="passwordChangeContainer">
                    <div className="passwordChangeBox">
                        <form className='passwordbox' onSubmit={updatePasswordSubmit}>
                            <h2>UPDATE PASSWORD</h2>
                            <div className='updatePasswordInput'>
                                <input 
                                    type="password"
                                    placeholder="Old Password"
                                    required
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                            <div className='updatePasswordInput'>
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                            <div className='updatePasswordInput'>
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="updatePasswordBtn">
                                <input
                                    type="submit"
                                    value="CHANGE"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default UpdatePassword