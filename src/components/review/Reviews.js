import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm'
import '../../styles/Reviews.css'

export default function Reviews() {
    const [placeID, setPlaceID] = useState(localStorage.getItem('placeID'))
    const [address, setAddress] = useState(localStorage.getItem('address'))

    useEffect(() => {
        getReviewsFromBackend()
    }, [placeID])

    //array of objects to store all of our reviews
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

    const getReviewsFromBackend = async () => {
        try {
            const res = await fetch(`https://dropin-backend.herokuapp.com/building-reviews`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    building_id: placeID
                })
            })
            const resObject = await res.json()

            console.log('line 49 of rendering reviews', resObject)

            if (resObject.status == 400) {
                throw resObject
            }

            //set the reviews to be the response of array of addresses received from the backend
            for (let i = 0; i < resObject.length; i++) {
                setUserReviews(prev => [...prev, {
                    body: resObject[i].comment_body,
                    author: resObject[i].username,
                    timestamp: resObject[i].timestamp
                }])
            }

        } catch (err) {
            console.log('error : line 61 of rendering reviews', err)
            if (err.status == 400) {
                alert(err.message)
            }
        }
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