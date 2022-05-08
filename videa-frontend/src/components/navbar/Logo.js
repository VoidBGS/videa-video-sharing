import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <Link to="./" className='videa-link'>
            <div className='logo-box flex center'>
                <img src="https://i.ibb.co/mBwgXrg/logo.png" alt="logo" border="0" className='logo' />
            </div>
        </Link>
    );
}

export default Logo;