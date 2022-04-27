import React from 'react';
import * as service from "../services/auth-service"
import {useNavigate} from "react-router-dom";
import {useProfile} from "../context/profile-context";


const Profile = () => {
    const {profile} = useProfile()
    const navigate = useNavigate()

    const logout = async () => {
        await service.logout()
        navigate('/signin')
    }

    return (
        <div>
            <h1>Profile</h1>
            <button className="btn btn-danger"
                    onClick={logout}>Logout</button>
            <hr/>
            {profile && profile.email}
        </div>
    );
};

export default Profile;