import React from 'react'
import { useState } from 'react'
import BackgroundImage from '../images/map-of-nyc.png'
import '../styles/Landing.css'

export default function Landing() {
    const [address, setAddress] = useState('')

    const handleClick = (e) => {
        e.preventDefault()
        console.log(address)
    }

    const handleAddressInput = (e) => {
        setAddress(e.target.value)
        console.log(address)
    }

    return (
        <div className='landing-page'>

            <div>
                <img className='landing-background' src={BackgroundImage} />
            </div>

            <div className='landing-search'>
                <h1 className='landing-title'>DROP-IN</h1>
                <form onSubmit={(e) => handleClick(e)}>
                    <input placeholder='123 Main Street...' onChange={handleAddressInput}></input>
                </form>
            </div>
            
        </div>
    )
}