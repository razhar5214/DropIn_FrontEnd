import React from 'react'
import { useState } from 'react'
import '../styles/ApartmentView.css'
import Navbar from './Navbar';

export default function ApartmentView(props) {
    const [userReview, setUserReview] = useState("");
    const [apartmentPic, setApartmentPic] = useState("")

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
        <div className="apartmentView">
            <Navbar/>
            <div className='apt-view-page'>
                <h1>address: {props.address}</h1>
            </div>

            <div className="apartment-visuals">
                <div className="apartment-pic">apartment picture</div>
                <div className="apartment-map">apartment map</div>
            </div>
            <div className="star-rating">
                Rating: (insert star pic here)
            </div>
            <h1 className="reviews-title">What residents have to say ...</h1>
            <div className="reviews">

                <div className="review-card">
                    <div className="review-content">The heat is always broken.</div>
                    <div className="review-author">James A.</div>
                </div>
                <div className="review-card">
                    <div className="review-content">The dogs are always barking.</div>
                    <div className="review-author">Crystal T.</div>
                </div>
                <div className="review-card">
                    <div className="review-content">I LOVE the neighbors.</div>
                    <div className="review-author">Anna M.</div>
                </div>
                <div className="review-card">
                    <div className="review-content">It's a quiet place, I like it.</div>
                    <div className="review-author">Linda A.</div>
                </div>

            </div>
            <form onSubmit={handleSubmit} className="user-review-form">
                <label>
                    <input
                        className="user-review-textbox"
                        placeholder='Leave a review...'
                        type="textarea"
                        value={userReview}
                        onChange={handleOnChange}
                    />
                </label>
                <input type="submit" className="user-review-submit-btn" />
            </form>
        </div>
    )
}