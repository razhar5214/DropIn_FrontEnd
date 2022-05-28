import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BackgroundImage from '../images/landing-background2.png'
import Logo from '../images/logo2.png'
import '../styles/navbar.css'

export default function Navbar(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const itemFromLocalStorage = localStorage.getItem('isLoggedIn')

    useEffect(() => {
        if (localStorage.getItem('isLoggedIn') === 'true') {
            console.log('itemFromLocalStorage is true')
            setIsLoggedIn(true)
        }
    }, [isLoggedIn])

    const logoutUser = () => {
        localStorage.removeItem('isLoggedIn')
        window.location.href = "/"
    }

    return (
        <div className='navbar'>
            <img className='nav-img' src={BackgroundImage} alt='NYC Apartments' />
            <div className='nav-buttons'>
                <div className='nav-home-btn'> <Link to='/'>HOME </Link></div>
                <img className='nav-logo' src={Logo} alt='Building and map pin(https://www.flaticon.com/free-icon/houses_353354#)' />

                {isLoggedIn ? <>
                    <div className='user-nav-login-btn'> <Link to='/user-dashboard'>PROFILE</Link></div>
                    <div className='nav-login-btn'> <Link to='/' onClick={logoutUser}>LOGOUT</Link></div>
                </> : <div className='nav-login-btn'><Link to='/login'>LOGIN </Link></div>
                }

            </div>
        </div>
    )
}