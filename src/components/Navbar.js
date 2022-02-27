import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css"

export default function Navbar(){
    return(
        <div className="navbar">
            <div className="nav-home-btn"> <Link to="/">HOME </Link></div>
            <div className="nav-login-btn"> LOGIN </div>
        </div>
    )
}