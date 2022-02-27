import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/ApartmentView.css'
import Navbar from './Navbar';

export default function ApartmentView(props) {
    const [userReview, setUserReview] = useState("");
    const [apartmentPic, setApartmentPic] = useState("")
    const [address, setAddress] = useState("")

    localStorage.setItem("address", JSON.stringify(address)); //new code

    useEffect(() => {
        setAddress(props.address) //new code
        // localStorage.setItem("address", JSON.stringify(address));
        console.log('storage', address)
    }, [address])

    function handleOnChange(event) {
        event.preventDefault(); //should this be deleted?
        setUserReview(event.target.value)
        console.log(userReview);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // setAddress(event.target.value)
        console.log(userReview);
    }

    return (
        <>
            <Navbar />

            <div className="apartmentView">
                <div className='apt-view-page'>
                    {/* <h1>address: {JSON.parse(localStorage.getItem('address'))}</h1> */}
                    <h1>address: {localStorage.getItem("address")}</h1>
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
                    <input type="submit" value="SUBMIT" className="user-review-submit-btn" />
                </form>
            </div>
        </>
    )
}