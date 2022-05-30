import React, { useState } from 'react';
import { v4 as uuid } from 'uuid'
import ReviewForm from './ReviewForm'
import '../../styles/Reviews.css'

export default function Reviews(props) {

    const unique_id = uuid();

    //array of objects for all of our reviews
    const [userReviews, setUserReviews] = useState([
        {
            body: "",
            author: "",
            timestamp: ""
        }
    ])

    const [newestReviewBtn, setNewestReviewBtn] = useState(false)

    const sortReviewByNewest = [].concat(userReviews)
        .sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)

    const handleSortByNewest = (event) => {
        event.preventDefault()
        setNewestReviewBtn(true)
    }

    return (
        <>
            <div>
                <button onClick={handleSortByNewest}>SORT BY NEWEST</button>
            </div>

            {/* SHOW REVIEWS OF ADDRESS */}
            <h1 className='reviews-title'>What residents have to say ...</h1>

            <div className='reviews'>
                {/* Hard Coded Filler Data */}
                <div className='review-card'>
                    <div className='review-content'>There are issues with the hot water.</div>
                    <div className='review-author'>James A.</div>
                </div>
                <div className='review-card'>
                    <div className='review-content'>Management takes a while to respond.</div>
                    <div className='review-author'>Crystal T.</div>
                </div>

                {newestReviewBtn ?
                    sortReviewByNewest.map((item) => {
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
                    })
                    //If user sorts by new, then render the reviews by newest AKA sort by shortest timestamp. Else, show the reviews normally as they are added.
                    : userReviews.map((item) => {
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

                <ReviewForm setUserReviews={setUserReviews} />
            </div>
        </>
    )
}