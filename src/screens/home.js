import React from 'react'
import {useProfile} from "../context/profile-context";
import SecureContent from "../components/secure-content";

const HomeScreen = () => {
    const {profile} = useProfile()
    return (
        <div>
            <div className="container">
                Content
            </div>
            <SecureContent>
                <div className="container">
                    Bookmarked Business Updates
                </div>
            </SecureContent>
        </div>
    )
}