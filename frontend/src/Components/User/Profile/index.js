import React, { useEffect } from 'react'
import Metadata from '../../Layouts/MetaData'
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import Loading from '../../Layouts/Loading';
import { Link } from 'react-router-dom';
import { logout } from '../../../Redux/action/userAction';

const Profile = ({ history }) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (isAuthenticated === false) {
            history.push("/login");
        }
        
    }, [history, isAuthenticated]);

    return (
        <>
            <Metadata title={`${user.name}'s Profile`} />
            {loading ? (
                <Loading />
            ) : (
                <div className='profileContainer'>
                    <div className="profileContent">
                        <div className='profilePicture'>
                            <img src={user.avatar.url} alt={user.name} />
                        </div>
                        <div className='profileDetails'>
                            <div>
                                <h4>Full Name</h4>
                                <p>{user.name}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h4>Joined On</h4>
                                <p>{String(user.createdAt).substr(0, 10)}</p>
                            </div>
                            <div className='profileOtherRoot'>
                                <Link to="/admin/deshboard">Dashboard</Link>
                                <Link to="/orders">Orders</Link>
                                <Link to="/me/update">Edit Profile</Link>
                                <Link to="/password/update">Change Password</Link>
                                <Link to="/" onClick={() => logoutUser()}>Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile