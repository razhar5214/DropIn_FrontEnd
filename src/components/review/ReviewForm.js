import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'
import Rating from './Rating';
import '../../styles/ReviewForm.css'

export default function ReviewForm(props) {
    const unique_id = uuid()
    const placeID = localStorage.getItem('placeID')

    const [currentReview, setCurrentReview] = useState(
        {
            review_id: unique_id,
            building_id: placeID,
            username: "",
            comment_body: "",
            star_rating: 0,
            timestamp: (Math.floor(Date.now() / 1000))
        }
    )

    const handleChange = (event) => {
        setCurrentReview(prevData => {
            return {
                ...prevData,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async(event) => {
        console.log('current review', currentReview)
        event.preventDefault()

        // setCurrentReview(prev => ({
        //     ...prev,
        //     //username, comment_body are being set in the form via on change function
        //     //star_rating is being set through the Rating.js component
        //     // review_id: unique_id,
        //     // building_id: placeID,
        //     // timestamp: (Math.floor(Date.now() / 1000))
        // }))

        if (currentReview.star_rating == 0) {
            alert("Provide a star rating")
            return
        }

        //old:
        // props.setUserReviews(prev => [...prev, {
        //     body: currentReview.comment_body,
        //     author: currentReview.username,
        //     timestamp: currentReview.timestamp
        // }], currentReview.body, currentReview.author
        // )
        
        //send this review up to its parent component (Reviews.js) so that all of the reviews can be rendered and mapped on the page
        props.setUserReviews(prev => [...prev, {
            body: currentReview.comment_body,
            author: currentReview.username,
            timestamp: currentReview.timestamp
        }])

        //reset form to look empty
        setCurrentReview(prev => ({
            ...prev,
            username: "",
            comment_body: "",
            star_rating: 0
        }))

        try {
            const res = await fetch(`https://dropin-backend.herokuapp.com/review`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentReview)
            })
            const resObject = await res.json()
            console.log('line 76 of review form', resObject)
            if (resObject.status == 400) {
                throw resObject
            }
            alert('Review added')

        } catch (err) {
            console.log('error : line 83 of review form', err)
            if (err.status == 400) {
                alert(err.message)
            }
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='user-review-form'>
                <input
                    className='user-review-textbox'
                    name='comment_body'
                    placeholder='Leave a review'
                    value={currentReview.comment_body}
                    onChange={handleChange}
                />
                <input
                    className='user-author-textbox'
                    name='username'
                    placeholder='Add your name'
                    value={currentReview.username}
                    onChange={handleChange}
                />
                <Rating currentReview={currentReview} setCurrentReview={setCurrentReview} />

                <h1>{currentReview.star_rating}</h1>
                <button type='submit' className='user-review-submit-btn'>SUBMIT</button>
            </form>
        </>
    )
}