import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, getProductDetails, newReview } from '../../../Redux/action/productAction';
import Carousel from "react-material-ui-carousel"
import Loading from '../../Layouts/Loading';
import Metadata from '../../Layouts/MetaData';
import ReactStars from 'react-rating-stars-component';
import ReviewCard from '../ReviewCard';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import ToastContainerBox from "../../Layouts/ToastContainerBox";
import Toast from "../../Layouts/Toast";
import { addItemsToCart } from '../../../Redux/action/cartAction';
import DialogContent from '@mui/material/DialogContent';
import Rating from '@mui/material/Rating';
import Dialog from '@mui/material/Dialog';

const ProductDetails = ({ match }) => {
    const [open, setOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector((state) => state.productDetail);

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const increaseQuantity = () => {
        if (product.stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartHendler = () => {
        dispatch(addItemsToCart(match.params.id, quantity));

        Toast({
            msg: `${quantity} items added in your cart`
        });
    }

    const reviewSubmitHandler = () => {
        const myForm = new FormData();

        myForm.set("rating", rating);
        myForm.set("comment", comment); 
        myForm.set("productId", match.params.id);

        dispatch(newReview(myForm));
        setOpen(false);
        Toast({
            msg: "Review submited succesfully"
        });
    };

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        dispatch(getProductDetails(match.params.id));

    }, [dispatch, match.params.id, error]);

    return (
        <>
            <Metadata title={product.name} />
            <ToastContainerBox />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <div className='bodyProductDetails'>
                        <div className='mainHeading'>
                            <h1>Product Details</h1>
                        </div>
                        <div className='productDetailsContent'>
                            <div className='imageContent'>
                                <Carousel swipe autoPlay interval={4000}>
                                    {product.images &&
                                        product.images.map((item, index) => (
                                            <img
                                                className='carouselImage'
                                                key={item.url}
                                                src={item.url}
                                                alt={`${index}th Image`}
                                            />
                                        )
                                        )}
                                </Carousel>
                            </div>
                            <div className='detailsContent'>
                                <div className='nameAndId'>
                                    <h2>{product.name}</h2>
                                    <p>Product Id <span>{product._id}</span></p>
                                </div>
                                <div className='ratingAndReview'>
                                    <ReactStars
                                        edit={false}
                                        isHalf={true}
                                        color={"#dfdfdf"}
                                        activeColor={"#9a9a9a"}
                                        size={30}
                                        count={5}
                                        value={product.ratings}
                                    />
                                    <h5> ( {product.numOfReviews} <span> Reviews </span> ) </h5>
                                </div>
                                <div className='priceAndAddRemove'>
                                    <h1><span>Rs {product.price}</span></h1>
                                </div>
                                <div className='addToCartAndButtons'>
                                    <div className='addRemoveButtons'>
                                        <button onClick={decreaseQuantity}><AiOutlineMinus /></button>
                                        <h2>{quantity}</h2>
                                        <button onClick={increaseQuantity}><AiOutlinePlus /></button>
                                    </div>
                                    <div className='addToCart'>
                                        <button disabled={product.Stock < 1 ? true : false} onClick={addToCartHendler}>Add To Cart</button>
                                    </div>
                                </div>
                                <div className='status'>
                                    <p>Status <span className={product.Stock < 1 ? "redColor" : " greenColor"}>{product.Stock < 1 ? "Stock Over" : "In Stock"}</span></p>
                                </div>
                                <div className='description'>
                                    <h5>Description</h5>
                                    <p>{product.description}</p>
                                </div>
                                <div className='submitReview'>
                                    <button onClick={submitReviewToggle}>Submit Review</button>
                                </div>
                            </div>
                        </div>
                        <Dialog className='dialogBox' open={open} onClose={submitReviewToggle}>
                            <h2 id="reviewTitle">Review Put Here</h2>
                            <DialogContent className='submitCommentContent'>
                                <div className='ratingComment'>
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        precision={0.5}
                                        className={"productDetailRating"}
                                        onChange={(e) => setRating(e.target.value)}
                                    />
                                </div>
                                <textarea
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </DialogContent>
                            <div className='submitCommentButtons'>
                                <button onClick={submitReviewToggle}>Cancel</button>
                                <button color="primary" onClick={reviewSubmitHandler}>Submit</button>
                            </div>
                        </Dialog>
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
                                <h6 className='noReivews'>No Reviews Yet</h6>
                            )}
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ProductDetails