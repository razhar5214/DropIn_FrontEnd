import './styles/App.css';
import ApartmentView from './components/ApartmentView'
import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from "./components/login-signup/Login"
import SignUp from "./components/login-signup/SignUp"
import UserDashboard from "./components/user/UserDashboard"

export default function App() {
  const [address, setAddress] = useState('')
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  })
  const [loginData, setLoginData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    user_type: "",
    favorites: ""
  })
  const [loginStatus, setLoginStatus] = useState(false)

  function updateAddress(newAddress) {
    //console.log('getting child address data in app.js:', newAddress)
    setAddress(...address, address => newAddress)
  }

  function updateCoordinates(newCoord) {
    //console.log('getting child coordinates data in app.js:', newCoord)
    setCoordinates(coordinates => newCoord)
  }

  function updateUserData(newData) {
    console.log('getting child coordinates data in app.js:', newData)
    setLoginData(prevData => newData)
  }

  return (
    <div className="App">
      <Router>
        <Routes className='routes'>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/apartment-view/:placeID" element={<ApartmentView loginStatus={loginStatus}/>} />
          <Route exact path="/login" element={<Login setLoginStatus={setLoginStatus} updateUserData={updateUserData}/>} />
          <Route exact path="/signup" element={<SignUp updateUserData={updateUserData} />} />
          <Route exact path="/user-dashboard" element={<UserDashboard loginData={loginData} />} />
        </Routes>
      </Router>
    </div>
  );
}

// export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(App);