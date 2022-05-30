import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'
import '../../styles/ReviewForm.css'

export default function ReviewForm(props) {
    const unique_id = uuid();

    //these states track the data in the review form
    const [reviewBody, setReviewBody] = useState("")
    const [reviewAuthor, setReviewAuthor] = useState("")
    const [reviewTime, setReviewTime] = useState("")

    const handleSubmit = (event) => {
        console.log('reviewBody', reviewBody)
        event.preventDefault()

        setReviewTime(Math.floor(Date.now() / 1000))

        props.setUserReviews(prev => [...prev, {
            body: reviewBody,
            author: reviewAuthor,
            timestamp: reviewTime
        }], reviewBody, reviewAuthor
        )

        setReviewBody('')
        setReviewAuthor('')
    }

    return (
        <>
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
        </>
    )
}