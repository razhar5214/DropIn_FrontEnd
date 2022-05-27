import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import BackgroundImage from '../../images/landing-background2.png'
import Logo from '../../images/logo2.png'
import '../../styles/UserNavbar.css'

export default function UserNavbar() {

    const logoutUser = () => {
        localStorage.removeItem('isLoggedIn')
        window.location.href = "/"
    }

    return (
        <div className='navbar'>
            <img className='nav-img' src={BackgroundImage} alt='NYC Apartments' />

            <div className='nav-buttons'>
                <div className='nav-home-btn'> <Link to='/'>HOME</Link></div>
                <img className='nav-logo' src={Logo} alt='Building and map pin(https://www.flaticon.com/free-icon/houses_353354#)' />
                <div className='nav-login-btn'> <Link to='/user-dashboard'>PROFILE</Link></div>
                <div className='nav-login-btn'> <Link to='/' onClick={logoutUser}>LOGOUT</Link></div>
                {/* insert search bar here */}
                {/* insert drop down menu for profile settings here */}
            </div>
        </div>
    )
}