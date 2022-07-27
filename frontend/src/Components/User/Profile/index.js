import React, { useEffect } from 'react'
import Metadata from '../../Layouts/MetaData'
import "./style.css"
import { useSelector } from "react-redux";
import Loading from '../../Layouts/Loading';
import { Link } from 'react-router-dom';

const Profile = ({ history }) => {
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);

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
                                <Link to="/me/update">Edit Profile</Link>
                                <Link to="/orders">My Orders</Link>
                                <Link to="/password/update">Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Profile