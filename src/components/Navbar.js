import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"
import AutoSearch from './AutoSearch';

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="nav-home-btn"> <Link to="/">HOME </Link></div>
            <AutoSearch/>
            <div className="nav-login-btn"> LOGIN </div>
        </div>
    )
}