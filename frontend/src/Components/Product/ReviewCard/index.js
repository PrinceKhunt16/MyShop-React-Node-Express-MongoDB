import React from 'react'
import "./style.css"
import StarImage from '../../../Utils/graystar.png'

const ReviewCard = ({ review }) => {
    return (
        <>
            <div className='reviewCard'>
                <div className='ratingOfComment'>
                    <div className='imgAndName'>
                        <p>{review.name}</p>
                    </div>
                    <div className='reviewsItem'>
                        <div>
                            <h3>{review.rating}</h3>
                            <img src={StarImage} alt="" />
                        </div>
                    </div>
                </div>
                <h4>{review.comment}</h4>
            </div>
        </>
    )
}

export default ReviewCard