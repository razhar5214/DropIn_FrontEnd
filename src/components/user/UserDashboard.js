import React from "react"
import { useState } from "react"
import { useLocation } from 'react-router-dom';
import UserNavbar from "./UserNavbar"
import '../../styles/UserDashboard.css'

export default function UserDashboard() {
    const [clickedMyProfile, setClickedMyProfile] = useState(false)
    const [clickedMyReviews, setClickedMyReviews] = useState(false)
    const [clickedSettings, setClickedSettings] = useState(false)

    const location = useLocation()
    let username = location.state.username
    let usernameArray = username.split('')
    username = usernameArray[0].toUpperCase() + username.substring(1).toLowerCase()

    return (
        <div className="user-dashboard">
            <UserNavbar />
            <h1>Hi {username}</h1>
            <div className="content-div">
                <button>My Profile</button>
                <button>My Reviews</button>
                <button>Settings</button>
            </div>
        </div>
    )
}