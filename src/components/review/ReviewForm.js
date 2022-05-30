import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'
import '../../styles/ReviewForm.css'

export default function ReviewForm(props) {
    const unique_id = uuid();

    const [currentReview, setCurrentReview] = useState({
        body: "",
        author: "",
        timestamp: ""
    })

    // const [reviewBody, setReviewBody] = useState("")
    // const [reviewAuthor, setReviewAuthor] = useState("")
    // const [reviewTime, setReviewTime] = useState("")

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

        // currentReview.timestamp = (Math.floor(Date.now() / 1000))
        await setCurrentReview(prev => ({
            ...prev,
            timestamp: (Math.floor(Date.now() / 1000))
        }))

        props.setUserReviews(prev => [...prev, {
            body: currentReview.body,
            author: currentReview.author,
            timestamp: currentReview.timestamp
        }], currentReview.body, currentReview.author
        )

        setCurrentReview(prev => ({
            ...prev,
            body: "",
            author: ""
        }))


        // try {
        //     const res = await fetch(`https://dropin-backend.herokuapp.com/review`, {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             review_id: ,
        //             building_id: ,
        //             username: ,
        //             comment_body: ,
        //             star_rating
        //         })
        //     })
        //     const resObject = await res.json()
        //     console.log('line 43 of review form', resObject)
        //     if (resObject.status == 400) {
        //         throw resObject
        //     }
        //     alert('Review added')

        // } catch (err) {
        //     console.log('error : line 50 of review form', err)
        //     if (err.status == 400) {
        //         alert(err.message)
        //     }
        // }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='user-review-form'>
                <input
                    className='user-review-textbox'
                    name='body'
                    placeholder='Leave a review'
                    value={currentReview.body}
                    onChange={handleChange}
                />
                <input
                    className='user-author-textbox'
                    name='author'
                    placeholder='Add your name'
                    value={currentReview.author}
                    onChange={handleChange}
                />
                <button type='submit' className='user-review-submit-btn'>SUBMIT</button>
            </form>
        </>
    )
}