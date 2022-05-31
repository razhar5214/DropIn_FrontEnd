import React from "react"
import { useState } from "react"
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import Navbar from "../Navbar"
import "../../styles/Login.css"

export default function Login(props) {
	let navigate = useNavigate()

	const [redirect, setRedirect] = useState(false)
	const [loginData, setLoginData] = useState({
		username: "",
		password: ""
	})

	const google_logo = "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"

	function updateUserData(loginData) {
		props.updateUserData(loginData) //sending it up to App.js
	}

	const handleChange = (event) => {
		setLoginData(prevData => {
			return {
				...prevData,
				[event.target.name]: event.target.value
			}
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setRedirect(true)

		try {
			const res = await fetch(`https://dropin-backend.herokuapp.com/login`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData) //login data is currently a JS object. so you have to send it as JSON object
			})
			const resObject = await res.json()
			console.log('line 41 of login', resObject)
			if (resObject.status == 400) {
				throw resObject
			}
			// navigate('/user-dashboard', { state: { username: loginData.username } })
			navigate('/user-dashboard')
			localStorage.setItem('isLoggedIn', true)
			localStorage.setItem('username', loginData.username)
			updateUserData(resObject)
		} catch (err) {
			console.log('line 47 of register error', err)
			if (err.status == 400) {
				alert(err.message)
			}
		}
	}

	return (
		<div>
			<Navbar />
			<div className="login-box">

				<form onSubmit={handleSubmit} className="login-form">

					<h1 className='login-title'>DROP-IN</h1>

					<h1 className="login-msg">Login to your account</h1>

					<label>
						<input className="login-input"
							placeholder="Username"
							type="text"
							name="username"
							value={loginData.username}
							onChange={handleChange}
						/>
					</label>
					<label>
						<input className="login-input"
							placeholder="Password"
							type="password"
							name="password"
							value={loginData.password}
							onChange={handleChange}
						/>
					</label>
					<input type="submit" value="Login" className="login-btns login-submit-btn" />

					{/* <p className="login-OR"> or</p>
					<button className="login-btns login-google-btn">
						<img src={google_logo} className="google-logo" />
						<p className="google-text">Continue with Google</p>
					</button> */}

					<p className="sign-up-msg">
						Dont have an account? <Link to="/signup"> Sign Up </Link>
					</p>
					<hr className="login-footer-line" />
					<p className="login-footer-msg">
						By continuing in you agree to Drop-In's Terms of Service, Privacy Policy
					</p>
				</form>
			</div>
		</div>
	)
}