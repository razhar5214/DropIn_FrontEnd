import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../images/map-of-nyc.png'
import '../styles/Landing.css'
import ApartmentView from './ApartmentView'
import { Link } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import AutoSearch from './AutoSearch'

export default function Landing(props) {
    console.log(props)
    const [address, setAddress] = useState('')

    let navigate = useNavigate()

    // const handleSubmit = () => {
    //     e.preventDefault()
    //     props.updateAddress(address)
    //     localStorage.setItem("address", address)
    //     console.log('in landing.js', address)
    //     navigate('/apartment-view')
    // }

    // function updateAddress(addressFromAutoSearch){
    //     props.updateAddress(addressFromAutoSearch) 
    // }

    return (

        <div className='landing-page'>

            <div>
                <img className='landing-background' src={BackgroundImage} />
            </div>

            <div className='landing-search'>
                <h1 className='landing-title'>DROP-IN</h1>

                {/* {<form onSubmit={(e) => handleSubmit}>
                    {<input placeholder='123 Main Street...' onChange={(e) => setAddress(e.target.value)}></input>}
                </form> */}
                <AutoSearch updateAddress={props.updateAddress} />

            </div>

        </div >
    )
}