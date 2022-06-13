import React from 'react';
import "./loginpage.css";

const LoginPage = ({ setToken }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = "token has been set";
        setToken(token);
        sessionStorage.setItem('videa-token', token);
    }
    return (
        <div className='login-page-wrap'>
            <form onSubmit={handleSubmit} className="login-page-form">
                <div className="login-page-details">
                    <div className="imgContainer">
                        <img src="https://i.ibb.co/8X7qWwR/logo-Transparent-Dark.png" alt="logo" className='videa-logo'></img>
                    </div>
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Username" name="uname" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" name="psw" required></input>

                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}

export default LoginPage;