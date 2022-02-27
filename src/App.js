import './styles/App.css';
import Navbar from './components/Navbar'
import ApartmentView from './components/ApartmentView'
import Map from './components/AutoSearch'
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import AutoSearch from './components/AutoSearch';

function App() {

  const [address, setAddress] = useState('')

  function updateAddress(newAddress) {
    console.log('getting child data in app.js:', newAddress)
    setAddress(...address, address => newAddress)
  }
    return (
      <div className="App">
        <Router>
          <Routes className='routes'>
            <Route exact path="/" element={<Landing updateAddress = {updateAddress} />} />
            <Route exact path="/apartment-view" element={<ApartmentView address = {address} />} />
            {/* <Route exact path="/" element={<AutoSearch />}/> */}
          </Routes>
        </Router>
      </div>
    );


}

// export default scriptLoader([`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAP_API}&libraries=places`])(App);
export default App