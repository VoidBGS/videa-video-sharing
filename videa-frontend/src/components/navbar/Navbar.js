import React from 'react';
import './navbar.css';
import ConvertButton from './ConvertButton';
import Logo from './Logo';
import Searchbar from './Searchbar';
import UserProfile from './UserProfile';
import ButtonGroup from './ButtonGroup';
import UploadVideoButton from './UploadVideoButton';

const Navbar = () => {
    return (
        <div className='videa-navbar'>
            <div className="videa-navbar-box flex between v-center">
                <div className='flex center'>
                    <Logo />
                </div>
                <div className='flex center w-full'>
                    <Searchbar />
                    <ButtonGroup>
                        <UploadVideoButton />
                        <ConvertButton />
                        <UserProfile />
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
}

export default Navbar;