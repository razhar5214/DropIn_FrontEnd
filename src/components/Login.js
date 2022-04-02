import React from "react"
import {useState} from "react"
import Navbar from "./Navbar"
import "../styles/Login.css"

export default function Login(){
    const [loginData, setLoginData] = useState({
        username : "",
        password : ""
    });
    const [redirect, setRedirect] = useState(false)

    const google_logo = "https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg"
    
    console.log(loginData);
    function handleChange(event){
        setLoginData(prevData =>{
            return{
                ...prevData,
                [event.target.name ]: event.target.value
            }
        })
    }
    async function handleSubmit(e){
        e.preventDefault()
    //  send loginData to backEnd
    //  await axios.post(`INSERT LINK HERE`, {loginData.username, loginData.password})
        setRedirect(true)
    }
    return(
<div>
			<Navbar/>
			<div className="login-box">
				
				{/* <img src={logo} className="logo"/> */}

				<h1 className="login-msg">Login to your account</h1>
			<form onSubmit={handleSubmit} className="login-form">
				<label className="login-username">
					<input className="login-input"
					placeholder="Username"
                    type="text"
                    name="username"
					value={loginData.username}
					onChange={handleChange}
					/>
				</label>
				<label className="login-password">
					<input className="login-input"
					placeholder="Password"
                    type="text" 
                    name="password"
					value={loginData.password}
					onChange={handleChange}
					/>
				</label>
				<input type="submit" value="Login" className="login-btns login-submit-btn"/>
				{/* <p className="login-OR"> or</p>

				<button className="login-btns login-google-btn">
					<img src={google_logo} className="google-logo"/> 
					<p className="google-text">Continue with Google</p>
				</button> */}
			</form>
			<p className="sign-up-msg"> 
					Dont have an account? <a href="/signUp">Sign Up</a>
			</p>
			<hr className="login-footer-line"/>
			<p className="login-footer-msg"> 
			By continuing in you agree to Drop-In's Terms of Service, Privacy Policy
			</p>
			
			</div>
		</div>
    )
}