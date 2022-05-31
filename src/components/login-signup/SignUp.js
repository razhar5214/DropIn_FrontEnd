import React from "react"
import { useState } from "react"
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar"
import "../../styles/Login.css"

export default function SignUp(props) {
	let navigate = useNavigate()
	const [loginData, setLoginData] = useState({
		firstname: "",
		lastname: "",
		username: "",
		password: "",
		user_type: "",
		favorites: ""
	});
	const [redirect, setRedirect] = useState(false)

	const google_logo = "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"

	console.log(loginData);

	// function updateUserData(loginData) {
	// 	props.updateUserData(loginData) //sending it up to App.js
	// }

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
		try {
			const res = await fetch(`https://dropin-backend.herokuapp.com/register`, {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(loginData)
			})
			const resObject = await res.json()
			console.log('line 43 of registerUser', resObject)
			if (resObject.status == 400) {
				throw resObject
			}
			alert('Account created')
			navigate('/login')

		} catch (err) {
			console.log('line 49 of register error', err)
			if (err.status == 400) {
				alert(err.message)
			}
		}
		setRedirect(true)
		// updateUserData(loginData)
	}

	return (
		<div>
			<Navbar />
			<div className="login-box">

				{/* <img src={logo} className="logo"/> */}

				<form onSubmit={handleSubmit} className="login-form">
					<h1 className='login-title'>DROP-IN</h1>

					<h1 className="login-msg">Create an account</h1>
					<label>
						<input className="login-input"
							placeholder="First Name"
							type="text"
							name="firstname"
							value={loginData.firstname}
							onChange={handleChange}
						/>
					</label>
					<label>
						<input className="login-input"
							placeholder="Last Name"
							type="text"
							name="lastname"
							value={loginData.lastname}
							onChange={handleChange}
						/>
					</label>
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
							type="text"
							name="password"
							value={loginData.password}
							onChange={handleChange}
						/>
					</label>

					<h3>I am a</h3>
					<div className="login-input-radios">
						<label className="login-input-radio-tenant">
							Tenant
							<input
								type="radio"
								name="user_type"
								value="tenant"
								onChange={handleChange}
							/>
						</label>
						<label className="login-input-radio-landlord">
							Landlord
							<input
								type="radio"
								name="user_type"
								value="landlord"
								onChange={handleChange}
							/>
						</label>
					</div>
					<input type="submit" value="Sign Up" className="login-btns login-submit-btn" />

					{/* <p className="login-OR"> or</p>
					<button className="login-btns login-google-btn">
						<img src={google_logo} className="google-logo" />
						<p className="google-text">Continue with Google</p>
					</button> */}

					<p className="sign-up-msg">
						Already a member? <Link to="/login">Login</Link>
					</p>
					<hr className="login-footer-line" />
					<p className="login-footer-msg">
						By continuing in you agree to Drop-In's Terms of Service and Privacy Policy
					</p>
				</form>
			</div>
		</div>
	)
}