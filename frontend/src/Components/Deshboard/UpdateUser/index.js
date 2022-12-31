import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../Sidebar";
import { clearErrors, getUserDetails, updateUser } from '../../../Redux/action/userAction';
import { UPDATE_USER_RESET } from '../../../Redux/constant/userConstant';
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';

const UpdateUser = ({ history, match }) => {
    const dispatch = useDispatch();

    const { loading, error, user } = useSelector((state) => state.userDetails);

    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);
 
    const [name, setName] = useState("");
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else { 
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
 
        if (error) {
            dispatch(clearErrors());
        }

        if (updateError) {
            dispatch(clearErrors());
        }
 
        if (isUpdated) { 
            history.push("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }

    }, [dispatch, error, history, isUpdated, updateError, user, userId]);
 
    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <>
            <Metadata title={`Create Product Admin`} />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                {loading ? (
                    <Loading />
                ) : (
                    <div className='updateUserContainer'>
                        <div className='updateUserContent'>
                            <form
                                className="updateUserForm"
                                onSubmit={(e) => { updateUserSubmitHandler(e) }}
                            >
                                <h2>UPDATE USER</h2>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className='updateUserBtns'>
                                    <div style={{background: `${role === 'admin' ? '#dd509720' : '#dd509715'}`}} onClick={() => setRole('admin')}>
                                        Admin
                                    </div>
                                    <div style={{background: `${role === 'user' ? '#dd509720' : '#dd509715'}`}} onClick={() => setRole('user')}>
                                        User
                                    </div>
                                </div>
                                <div className='submitBtn'>
                                    <button
                                        className='submitUpdateUser'
                                        type="submit"
                                        disabled={
                                            updateLoading ? true : false || role === "" ? true : false
                                        }
                                    >
                                        UPDATE
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )

}

export default UpdateUser