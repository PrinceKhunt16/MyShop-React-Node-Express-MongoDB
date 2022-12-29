import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../../Redux/action/productAction';
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';
import ReviewCard from '../ReviewCard';
import ToastContainerBox from "../../Layouts/ToastContainerBox";
import Toast from "../../Layouts/Toast";
import { addItemsToCart } from '../../../Redux/action/cartAction';
import ImageShow from './ImageShow';
import StarImage from '../../../Utils/graystar.png'

const ProductDetails = ({ match }) => {
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submitComment, setSubmitComment] = useState(false);
    const dispatch = useDispatch();
    const { product, loading, error } = useSelector((state) => state.productDetail);

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));
        setSubmitComment(!submitComment);
        
        setOpen(false);
    };

    const addToCartHendle = () => {
        dispatch(addItemsToCart(match.params.id, 1));

        Toast({
            msg: `${product.name} added in your cart`
        });
    }

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id));

    }, [dispatch, match.params.id, error, submitComment]);

    return (
        <>
            <Metadata title={product?.name} />
            <ToastContainerBox />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className='bodyProductDetails'>
                        <div className='productDetailsContent'>
                            <div className='imageContent'>
                                <ImageShow images={product?.images} />
                            </div>
                            <div className='detailsContent'>
                                <div className='headerDetails'>
                                    <div className='description'>
                                        <p>{product.description}</p>
                                    </div>
                                    <div className='nameAndId'>
                                        <h2>{product?.name}</h2>
                                    </div>
                                    <h1>₹{product.price}</h1>
                                    <div className='reviews'>
                                        <div>
                                            <h3>{product?.ratings?.toFixed(1)}</h3>
                                            <img src={StarImage} alt="" />
                                        </div>
                                        <h2>{product?.numOfReviews} Reviews</h2>
                                    </div>
                                </div>
                                <div className='contentDetails'>
                                    <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHendle}>ADD TO CART</button>
                                    <button onClick={() => setOpen(!open)}>GIVE REVIEW</button>
                                </div>
                                {open &&
                                    <div className='giveReview'>
                                        <textarea onChange={(e) => setComment(e.target.value)} placeholder={`Review on ${product.name}`}></textarea>
                                        <div className='postReview'>
                                            <div className='ratingNumber'>
                                                {
                                                    [1, 2, 3, 4, 5].map((item) => (
                                                        <div key={item} id={`${rating === item && 'selectedRate'}`} onClick={() => setRating(item)}>
                                                            <h4>{item}</h4>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            <button onClick={() => reviewSubmitHandler()}>SUBMIT</button>
                                        </div>
                                    </div>
                                }
                                <div className='reviewsContent'>
                                    <h1>Reivews</h1>
                                    {product.reviews && product.reviews[0] ? (
                                        <div className='reviewCardBody'>
                                            {
                                                product.reviews &&
                                                product.reviews.map((review) => <ReviewCard review={review} />)
                                            }
                                        </div>
                                    ) : (
                                        <h6 className='noReivews'>No Reviews</h6>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails