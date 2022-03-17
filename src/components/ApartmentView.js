import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/ApartmentView.css'
import Navbar from './Navbar';
import Map from './Map'
import ApartmentPic from './ApartmentPic';
import { withScriptjs, withGoogleMap } from 'react-google-maps'
import { v4 as uuid } from 'uuid';

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function ApartmentView(props) {
    const unique_id = uuid();
    console.log('in apartment view', props)
    // const [userReview, setUserReview] = useState([
    //     { id: uuidv4(), review: '', author: '' }
    // ])
    const [userReview, setUserReview] = useState([
        {
            body: null,
            author: null
        }
    ])
    const [reviewBody, setReviewBody] = useState(null)
    const [reviewAuthor, setReviewAuthor] = useState(null)

    const handleSubmit = (event) => {
        console.log(userReview)
        console.log(reviewBody)
        event.preventDefault()

        setUserReview(prev => [...prev, {
            body: reviewBody,
            author: reviewAuthor
        }], reviewBody, reviewAuthor
        )

        setReviewBody('')
        setReviewAuthor('')
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
                    {/* Rating: (insert star pic here) */}
                </div>

                {/* Show REVIEWS of Address */}
                <h1 className='reviews-title'>What residents have to say ...</h1>
                <div className='reviews'>
                    {/* Filler Data */}
                    <div className='review-card'>
                        <div className='review-content'>There are issues with the hot water.</div>
                        <div className='review-author'>James A.</div>
                    </div>
                    <div className='review-card'>
                        <div className='review-content'>Management takes a while to respond.</div>
                        <div className='review-author'>Crystal T.</div>
                    </div>
                    {/* <div className='review-card'>
                        <div className='review-content'>Really friendly neighbors.</div>
                        <div className='review-author'>Anna M.</div>
                    </div>
                    <div className='review-card'>
                        <div className='review-content'>It's a quiet place, I like it.</div>
                        <div className='review-author'>Linda A.</div>
                    </div> */}

                    {userReview.map((item) => {
                        return (
                            <>
                                {item.body ? (
                                    <div className='review-card'>
                                        <div className='review-content'>{item.body}</div>
                                        <div className='review-author'>{item.author}</div>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                            </>
                        );
                    })}

                </div>


                {/* USER INPUT - review*/}
                <form onSubmit={handleSubmit} className='user-review-form'>

                    <input
                        className='user-review-textbox'
                        name='review'
                        placeholder='Leave a review'
                        value={reviewBody}
                        onChange={(e) => setReviewBody(e.target.value)}
                    />
                    <input
                        className='user-author-textbox'
                        name='author'
                        placeholder='Add your name'
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                    />

                    <button type='submit' className='user-review-submit-btn'>SUBMIT</button>
                </form>



            </div>
        </>
    )
}