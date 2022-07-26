import React from 'react'
import "./style.css"
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
    return (
        <>
            <div className='reviewCard'>
                <div className='imgAndName'>
                    <img src={"https://images.squarespace-cdn.com/content/v1/5c06d635506fbe62ec834460/1546860566858-6IZY147K91CWA7H2EZUW/default-user-image.png"} height="60" width="60" alt="" />
                    <p>{review.name}</p>
                </div>
                <div className='ratingOfComment'>
                    <ReactStars
                        edit={false}
                        isHalf={true}
                        color={"#dfdfdf"}
                        activeColor={"#9a9a9a"}
                        size={34}
                        value={review.rating}
                        count={5}
                    />
                </div>
                <h4>{review.comment}</h4>
            </div>
        </>
    )
}

export default ReviewCard