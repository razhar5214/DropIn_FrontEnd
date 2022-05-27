import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../images/landing-background2.png'
import Logo from '../images/logo2.png'
import '../styles/navbar.css'

export default function Navbar() {
    return (
        <div className='navbar'>

            <img className='nav-img' src={BackgroundImage} alt='NYC Apartments' />

            <div className='nav-buttons'>
                <div className='nav-home-btn'> <Link to='/'>HOME </Link></div>
                <img className='nav-logo' src={Logo} alt='Building and map pin(https://www.flaticon.com/free-icon/houses_353354#)' />
                <div className='nav-login-btn'><Link to='/login'>LOGIN </Link></div>
            </div>

        </div>
    )
}