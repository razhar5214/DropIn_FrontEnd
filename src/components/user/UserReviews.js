import React, { useState, useEffect } from 'react';

export default function UserReviews() {
    const [username, setUsername] = useState(localStorage.getItem('username'))

    useEffect(() => {
        getReviewsFromBackend()
    }, [username])

    //array of objects to store all of our reviews
    const [userReviews, setUserReviews] = useState([
        {
            body: "",
            author: "",
            timestamp: "",
            address: ""
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
            const res = await fetch(`https://dropin-backend.herokuapp.com/my-reviews`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username
                })
            })

            const resObject = await res.json()

            console.log('line 44 of rendering user reviews', resObject)

            if (resObject.status == 400) {
                throw resObject
            }

            //set the reviews to be the response of array of addresses received from the backend
            for (let i = 0; i < resObject.length; i++) {
                setUserReviews(prev => [...prev, {
                    body: resObject[i].comment_body,
                    author: resObject[i].username,
                    timestamp: resObject[i].timestamp,
                    address: resObject[i].address,
                }])
            }

        } catch (err) {
            console.log('error : line 60 of rendering user reviews', err)
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

            {/* SHOW REVIEWS POSTED BY USER */}
            <div className='reviews'>

                {newestReviewBtn ?
                    sortReviewByNewest.map((item) => {
                        return (
                            <>
                                {item.body ? (
                                    <div className='review-card'>
                                        <div className='review-content'>{item.body}</div>
                                        <div className='review-author'>{item.author}</div>
                                        <div className='review-content'>({item.address})</div>
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
                                        <div className='review-content'>({item.address})</div>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                            </>
                        );
                    })}
            </div>
        </>
    )
}