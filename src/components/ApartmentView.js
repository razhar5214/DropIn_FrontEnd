import React from 'react'
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import Navbar from './Navbar'
import Map from './Map'
import ApartmentPic from './ApartmentPic'
import Reviews from './review/Reviews'
import '../styles/ApartmentView.css'

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ApartmentView(props) {

    return (
        <>
            {/* RENDER NAVBAR */}
            <Navbar />

            <div className='apt-view-div'>

                <div className='apt-address'>
                    <h1>{localStorage.getItem('address')}</h1>
                    {/* <h1>address: {props.address}</h1> */}
                </div>

                {/* RENDER STREETVIEW OF ADDRESS */}
                <div className='apt-visuals'>
                    <div className='apt-pic'>
                        <div className='streetview'>
                            <ApartmentPic />
                        </div>
                    </div>

                    {/* RENDER MAP OF ADDRESS */}
                    <div className='apt-map'>
                        <WrappedMap
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&
                            libraries=geometry.drawing.places&key=${process.env.REACT_APP_GOOGLE_MAP_API
                                }`}
                            loadingElement={<div style={{ height: '100%' }} />}
                            containerElement={<div style={{ height: '100%' }} />}
                            mapElement={<div style={{ height: '100%' }} />}
                        />
                    </div>
                </div>

                {/* SHOW RATING OF ADDRESS */}
                <div className='star-rating'>
                    {/* Rating: (insert star pic here) */}
                </div>

                {/* SHOW REVIEWS OF ADDRESS */}
                <Reviews />
            </div>
        </>
    )
}