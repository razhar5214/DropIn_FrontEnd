import './styles/App.css';
import Navbar from './components/Navbar'
import ApartmentView from './components/ApartmentView'
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';

function App() {
  const [address, setAddress] = useState('')

  function updateAddress(newAddress) {
    console.log('getting child data in app.js:', newAddress)
    // setAddress(...address, address => newAddress)
    setAddress(address => newAddress)
  }

  // useEffect(() => {
  //   localStorage.setItem("address", JSON.stringify(address));
  //   console.log('storage', address)
  // }, [address])

  return (
    <div className="App">
      <Router>
        <Routes className='routes'>
          <Route exact path="/" element={<Landing updateAddress={updateAddress} />} />
          <Route exact path="/apartment-view" element={<ApartmentView address={address} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
