import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
import AutoSearch from './AutoSearch';
import BackgroundImage from '../images/apartment-skyline.jpg'

export default function Navbar() {
    return (
        <div className="navbar">

            <img className='nav-img' src={BackgroundImage} alt='NYC Apartments'/>

            <div className='nav-buttons'>
                <div className="nav-home-btn"> <Link to="/">HOME </Link></div>
                <div className='nav-input'>
                </div>
                <div className="nav-login-btn"> LOGIN </div>
            </div>

        </div>
    )
}