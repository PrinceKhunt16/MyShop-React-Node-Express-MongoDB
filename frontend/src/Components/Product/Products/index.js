import React, { useEffect, useState } from 'react'
import "./style.css"
import Metadata from "../../Layouts/MetaData";
import ProductsCard from "./ProductsCard";
import Pagination from "react-js-pagination";
import { getProducts } from "../../../Redux/action/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Layouts/Loading";

const categories = [
    "All",
    "TShirt",
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Toys",
    "Camera",
    "SmartPhones",
    "Machine",
    "Television",
    "Book",
    "Hoodies",
];

const prices = [
    {
        "start": 0,
        "end": 2000
    },
    {
        "start": 2000,
        "end": 5000
    },
    {
        "start": 5000,
        "end": 10000
    },
    {
        "start": 10000,
        "end": 20000
    },
    {
        "start": 20000,
        "end": 40000
    },
    {
        "start": 40000,
        "end": 80000
    },
    {
        "start": 80000,
        "end": 100000
    }
];

const ratingsvalue = [
    {
        "value": 1
    },
    {
        "value": 2
    },
    {
        "value": 3
    },
    {
        "value": 4
    },
    {
        "value": 5
    }
]

const reviewsvalue = [
    {
        "value": 1,
        "name": "Bad"
    },
    {
        "value": 2,
        "name": "Average"
    },
    {
        "value": 3,
        "name": "Medium"
    },
    {
        "value": 4,
        "name": "Good"
    },
    {
        "value": 5,
        "name": "Excellent"
    }
]

const Products = ({ match, history }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("");
    const [catogery, setCategory] = useState("");
    const [ratings, setRating] = useState(0);
    const [price, setPrice] = useState([0, 100000]);

    const dispatch = useDispatch();

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (search.trim()){
            history.push(`products/${search}`);
        } else {
            history.push("/products");
        }
    }

    const { loading, error, products, productsCount, resultPerPage } = useSelector(
        (state) => state.products
    );

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    const keyword = match.params.keyword;

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, catogery, ratings, price));
    }, [dispatch, keyword, currentPage, catogery, ratings, price]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Metadata title="My Market Products" />
                    <div className='productsPageBody'>
                        <div className='ratingBoxMainBody'>
                            <div className='searchBox'>
                                <form className='searchbox' onSubmit={searchSubmitHandler}>
                                    <input
                                        type="text"
                                        placeholder='Search here'
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </form>
                            </div>
                            <div className='coverOfSelectBox'>
                                <div className='priceBody'>
                                    <select onChange={(e) => setPrice([prices[e.target.value].start, prices[e.target.value].end])}>
                                        <option value="">Choose Price</option>
                                        {prices.map((price, index) => (
                                            <option key={index} value={index}>
                                                {`${price.start}, ${price.end}`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='coverOfSelectBox'>
                                <div className='variantsBody'>
                                    <select onChange={(e) => setCategory(e.target.value === "All" ? "" : e.target.value)}>
                                        <option value="">Choose Category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='coverOfSelectBox'>
                                <div className='ratingBody'>
                                    <select onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Choose Rating</option>
                                        {ratingsvalue.map((rating) => (
                                            <option key={rating.value} value={rating.value}>
                                                {`${rating.value} star above`}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='coverOfSelectBox'>
                                <div className='reviewBody'>
                                    <select onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Choose Review</option>
                                        {reviewsvalue.map((reviews) => (
                                            <option key={reviews.value} value={reviews.value}>
                                                {reviews.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="productsContainer">
                            {products &&
                                products.map((product) => <ProductsCard product={product} />)}
                            {resultPerPage < productsCount &&
                                <div className='paginationBox'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="Next"
                                        prevPageText="Prev"
                                        firstPageText={"First"}
                                        lastPageText={"Last"}
                                        itemClass="pageItem"
                                        linkClass="pageLink"
                                        activeClass="pageItemActive"
                                        activeLinkClass="pageLinkActive"
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default Products