import React from "react"
import { useState } from "react"
import { useLocation } from 'react-router-dom'
import Navbar from "../Navbar"
import '../../styles/UserDashboard.css'

export default function UserDashboard() {
    const [clickedMyReviews, setClickedMyReviews] = useState(false)

    const location = useLocation()
    let username = location.state.username
    let usernameArray = username.split('')
    username = usernameArray[0].toUpperCase() + username.substring(1).toLowerCase()

    return (
        <div className="user-dashboard">
            <Navbar />
            <h1>Hi {username}</h1>
            <div className="content-div">
                <button>My Reviews</button>
            </div>
        </div>
    )
}