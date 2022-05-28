import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../images/landing-background2.png'
import Logo from '../images/logo2.png'
import '../styles/navbar.css'

export default function Navbar() {
    // useEffect(() => {
    //     checkLoginStatus()
        
    // },[])

    // const itemFromLocalStorage = localStorage.getItem('isLoggedIn')

    const logoutUser = () => {
        localStorage.setItem('isLoggedIn', false)
        window.location.href = "/"
    }

    function checkLoginStatus() {
        // if (itemFromLocalStorage == 'true') {
            if (JSON.stringify(localStorage.getItem("isLoggedIn")) == 'true') {
            return (
                <>
                    <div className='user-nav-login-btn'> <Link to='/user-dashboard'>PROFILE</Link></div>
                    <div className='nav-login-btn'> <Link to='/' onClick={logoutUser}>LOGOUT</Link></div>
                </>
            )
        }
        else {
            return (
                <>
                    <div className='nav-login-btn'><Link to='/login'>LOGIN </Link></div>
                </>
            )
        }
    }

    window.onstorage = () => {
        checkLoginStatus()
        alert(localStorage.getItem("isLoggedIn"))
    };

    return (
        <div className='navbar'>
            <img className='nav-img' src={BackgroundImage} alt='NYC Apartments' />
            <div className='nav-buttons'>
                <div className='nav-home-btn'> <Link to='/'>HOME </Link></div>
                <img className='nav-logo' src={Logo} alt='Building and map pin(https://www.flaticon.com/free-icon/houses_353354#)' />
                {checkLoginStatus()}
            </div>
        </div>
    )
}