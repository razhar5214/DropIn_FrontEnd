import React from 'react'
import '../styles/apartmentView.css'

export default function ApartmentView(){
    //reviews = ["review1", "review2", "review3", "review4", "review5", "review6"];
    

    return(
        <div className="apartmentView">
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
        </div>
    )

}