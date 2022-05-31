import React, { useEffect, useState } from 'react'
import '../../styles/Rating.css'

export default function Rating(props) {
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(0)
  
    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={index <= (hover || rating) ? "on" : "off"}
                        id="star-rating-btn"
                        onClick={() => {
                            setRating(index);
                            props.setCurrentReview({...props.currentReview,
                                star_rating: index
                            });
                            console.log('index is: ', index)
                            console.log('rating is: ', rating)
                            console.log('hover is: ', hover)
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                )
            })}
        </div>
    )
}
