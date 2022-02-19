// import logo from './logo.svg';
// import './App.css';
// import Landing from './components/Landing';

// function App() {
//   return (
//     <div className="App">
//       <Landing/>
//     </div>
//   );
// }

// export default App;

import './App.css';
import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import ApartmentView from './components/ApartmentView';

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
