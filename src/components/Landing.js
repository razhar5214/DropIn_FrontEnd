import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundImage from '../images/map-of-nyc.png'
import '../styles/Landing.css'
import ApartmentView from './ApartmentView'
import { Link } from 'react-router-dom'

export default function Landing() {
    const [input, setInput] = useState('')
    const [address, setAddress] = useState('')

    let navigate = useNavigate()

    const handleClick = (e) => {
        e.preventDefault()
        setAddress(input)
        console.log('handleclick', address)
        navigate('/apartment-view')
    }

    // const handleAddressInput = (e) => {
    //     setAddress(e.target.value)
    //     console.log('handleAddressInput', address)
    // }

    function handleChange(e) {
        setInput(e.target.value) 
        console.log(input)
    }

    return (
        <>
            {address ? <ApartmentView address={address} /> :

                <div className='landing-page'>

                    {/* <Link to={{
                pathname: '/apartment-view',
                state: { address: address }
            }}>
            </Link> */}

                    <div>
                        <img className='landing-background' src={BackgroundImage} />
                    </div>

                    <div className='landing-search'>
                        <h1 className='landing-title'>DROP-IN</h1>
                        <form onSubmit={(e) => handleClick(e)}>
                            <input placeholder='123 Main Street...' onChange={handleChange}></input>
                        </form>
                    </div>

                </div >

            }
        </>
    )
}