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

    const formatDate = (d) => {
        const date = new Date(d).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    
        return date
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
                                <p>{formatDate(user.createdAt)}</p>
                            </div>
                            <div className='profileOtherRoot'>
                                <Link to="/admin/deshboard">DASHBOARD</Link>
                                <Link to="/orders">ORDERS</Link>
                                <Link to="/me/update">EDIT PROFILE</Link>
                                <Link to="/password/update">CHANGE PASSWORD</Link>
                                <Link to="/" onClick={() => logoutUser()}>LOGOUT</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile