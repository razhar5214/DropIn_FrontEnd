import React from 'react'
import { useState } from 'react'
import '../styles/ApartmentView.css'
import Navbar from './Navbar';
import Map from './Map'
import ApartmentPic from './ApartmentPic';
import { withScriptjs, withGoogleMap } from 'react-google-maps'

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ApartmentView(props) {
    console.log('in apartment view', props)
    const [userReview, setUserReview] = useState('');

    function handleOnChange(event) {
        event.preventDefault();
        setUserReview(event.target.value)
        console.log(userReview);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(userReview);
    }

    return (
        <>
            {/* Render NAVBAR */}
            <Navbar />

            <div className='apt-view-div'>

                <div className='apt-address'>
                    <h1>{localStorage.getItem('address')}</h1>
                    {/* <h1>address: {props.address}</h1> */}
                </div>

                <div className='apt-visuals'>
                    {/* Render PICTURE of Address */}
                    <div className='apt-pic'>
                        <div className='streetview'>
                            <ApartmentPic />
                        </div>
                    </div>

                    {/* Render MAP of Address */}
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

                {/* Show RATING of Address */}
                <div className='star-rating'>
                    Rating: (insert star pic here)
                </div>

                {/* Show REVIEWS of Address */}
                <h1 className='reviews-title'>What residents have to say ...</h1>
                <div className='reviews'>

                    <div className='review-card'>
                        <div className='review-content'>There are issues with the hot water.</div>
                        <div className='review-author'>James A.</div>
                    </div>
                    <div className='review-card'>
                        <div className='review-content'>Management takes a while to respond.</div>
                        <div className='review-author'>Crystal T.</div>
                    </div>
                    <div className='review-card'>
                        <div className='review-content'>Really friendly neighbors.</div>
                        <div className='review-author'>Anna M.</div>
                    </div>
                    <div className='review-card'>
                        <div className='review-content'>It's a quiet place, I like it.</div>
                        <div className='review-author'>Linda A.</div>
                    </div>
                </div>

                {/* USER INPUT - review*/}
                <form onSubmit={handleSubmit} className='user-review-form'>
                    {/* <label> */}
                    <input
                        className='user-review-textbox'
                        placeholder='Leave a review...'
                        type='textarea'
                        value={userReview}
                        onChange={handleOnChange}
                    />
                    {/* </label> */}
                    <input type='submit' value='SUBMIT' className='user-review-submit-btn' />
                </form>
            </div>
        </>
    )
}