import React from 'react';
import "./loginpage.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = ({ setToken }) => {
    const { loginWithRedirect, isLoading } = useAuth0();

    const handleSubmit = (e) => {
        e.preventDefault();
        loginWithRedirect();
    }
    return (
        isLoading ? (
            <div className='loading-login'>
                <div className='loader'></div>
            </div>
        ) : (
            <div className='login-page-wrap'>
                <form onSubmit={handleSubmit} className="login-page-form">
                    <div className="login-page-details">
                        <div className="img-container">
                            <img src="https://i.ibb.co/8X7qWwR/logo-Transparent-Dark.png" alt="logo" className='videa-logo'></img>
                        </div>
                        <h4>
                            Permitted users only*
                        </h4>
                        <h2>
                            You need to login in order to use this website.
                        </h2>
                        {/*
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Username" name="uname" required></input>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" name="psw" required></input> */}

                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        )


    );
}

export default LoginPage;