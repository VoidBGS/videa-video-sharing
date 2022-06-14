import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
    const { user, isAuthenticated, logout } = useAuth0();
    const [isProfileClick, setIsProfileClick] = useState(false);

    const handleClick = (e) => {
        e.preventDefault();
        setIsProfileClick(!isProfileClick);
    }

    return (
        isAuthenticated ? (
            <div className='searchbar-image-box flex center'>
                <img src={user.picture} alt={user.name} className='searchbar-image user-profile-image' onClick={handleClick}></img>
                {isProfileClick && (
                    <div className='searchbar-profile-menu flex-col v-center h-center'>
                        <div onClick={logout}>Logout</div>
                    </div>
                )}
            </div>
        ) :
            <div className='searchbar-image-box flex center'>
                <img src="https://i.ibb.co/Rbxm3sb/user-Icon-MINE.png" alt="User icon" className='searchbar-image'></img>
            </div>
    );
}

export default UserProfile;