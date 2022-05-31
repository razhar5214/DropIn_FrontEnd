import React, { useEffect } from "react"
import { useState } from "react"
import Navbar from "../Navbar"
import UserReviews from "./UserReviews"
import '../../styles/UserDashboard.css'

export default function UserDashboard(props) {

    const [clickedMyReviews, setClickedMyReviews] = useState(false)
    const usernameLocalStorage = localStorage.getItem('username')
    const [loginData, setLoginData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        user_type: "",
        favorites: ""
    });

    useEffect(() => {
        console.log(loginData)
        setLoginData(loginData => props.loginData)
    }, [props])

    // let username = location.state.username
    // let usernameArray = username.split('')
    // username = usernameArray[0].toUpperCase() + username.substring(1).toLowerCase()

    return (
        <div className="user-dashboard">
            <Navbar />
            {/* <h1>Hi, {props.loginData.username}</h1> */}
            <h1>Hi, {usernameLocalStorage}</h1>
            <div className="content-div">
                <button onClick={() => setClickedMyReviews(true)}>My Reviews</button>
            </div>

            {
                clickedMyReviews ? <UserReviews/> : <></>
            }
            
            <div>
                <h3>My account details</h3>
                <p>{loginData.firstname}</p>
                <p>{loginData.lastname}</p>
                <p>{loginData.username}</p>
            </div>
        </div>
    )
}