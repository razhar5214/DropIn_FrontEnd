import React from 'react'
import BackgroundImage from '../images/map-of-nyc2.png'
import '../styles/Landing.css'
import AutoSearch from './AutoSearch'

export default function Landing(props) {
    console.log('Landing Props: ',props);

    function updateAddress(addressFromAutoSearch){
        props.updateAddress(addressFromAutoSearch) //sending it up to App.js
    }
    function updateCoordinates(coordsFromAutoSearch){
        props.updateCoordinates(coordsFromAutoSearch) //sending it up to App.js
    }
    return (

        <div className='landing-page'>

            <div>
                <img className='landing-background' src={BackgroundImage} alt=''/>
            </div>

            <div className='landing-search'>
                <h1 className='landing-title'>DROP-IN</h1>

                <AutoSearch updateAddress={updateAddress} updateCoordinates={updateCoordinates}/>

            </div>

        </div >

    )
}