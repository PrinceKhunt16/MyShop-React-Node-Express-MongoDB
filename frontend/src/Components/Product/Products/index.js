import React, { useEffect, useState } from 'react'
import "./style.css"
import Metadata from "../../Layouts/MetaData";
import ProductsCard from "./ProductsCard";
import Pagination from "react-js-pagination";
import { getProducts } from "../../../Redux/action/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Layouts/Loading";
import UseQuery from '../UseQuery'

const categories = ["Dupattas", "Kurtis", "Kurta Sets", "Lehengas", "Patiala", "Sarees", "Suits", "Tops and Tunics", "Shirts", "T-shirts", "Beauty", "Jewellery", "Bags", "Footware", "Electronics"]

const prices = [
    {
        "start": 0,
        "end": 100
    },
    {
        "start": 100,
        "end": 200
    },
    {
        "start": 200,
        "end": 400
    },
    {
        "start": 400,
        "end": 800
    },
    {
        "start": 800,
        "end": 1500
    },
    {
        "start": 1500,
        "end": 3000
    }
]

const sizes = ['L', 'XL', 'XXL', 'M', 'S', 'XXXL', 'XXS', 'FREE SIZE']

const productratings = [2, 3, 4]

const colors = ['Beige', 'Black', 'Blue', 'Brown', 'Grey', 'Khaki', 'Maroon', 'White', 'Multicolor', 'Nude', 'Olive', 'Orange', 'Pink']

const Products = () => {
    const query = UseQuery()
    const [keyword, setKeyword] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [type, setType] = useState('');
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);
    const [price, setPrice] = useState([0, 100000]);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [openclose, setOpenclose] = useState({
        'category': false,
        'color': false,
        'price': false,
        'ratings': false,
        'size': false
    });

    const { loading, products, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const handleOpenClose = (categoryName) => {
        setOpenclose({
            ...openclose,
            [categoryName]: !openclose[categoryName]
        })
    }

    const removeAllCategory = () => {
        setCategory('')
        setRatings(0)
        setPrice([0, 100000])
        setColor('')
        setSize('')
    }

    const dispatch = useDispatch();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }

    useEffect(() => {
        dispatch(getProducts(keyword, currentPage, category, ratings, price, color, size, type));
    }, [dispatch, keyword, currentPage, category, ratings, price, color, size, type]);

    useEffect(() => {
        let type = query.get('type')?.replace('-', ' ')
        setType(type)
        let search = query.get('search')?.replace('%20', ' ')
        setKeyword(search)
    }, [query])

    return ( 
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Metadata title="My Market Products" />
                    <div className='productsPageBody'>
                        <div className='filterBoxMainBody'>
                            <div className='heading'>
                                <h1>Filters</h1>
                                <button onClick={() => removeAllCategory()}>Remove All</button>
                            </div>
                            <div className='category categoryBorderBottom'>
                                <div className={`categoryHeading ${openclose.category && 'openCategory'}`} onClick={() => handleOpenClose('category')}>
                                    <h1>Category</h1>
                                </div>
                                {openclose.category &&
                                    <div className='categoryWrapper'>
                                        <div className='categoryItem' onClick={() => setCategory('')}>
                                            <div className={`checkBox ${category === '' && 'filledCheckBox'}`}></div>
                                            <div className='itemName'>
                                                All
                                            </div>
                                        </div>
                                        {
                                            categories.map((c) => (
                                                <div className='categoryItem' onClick={() => setCategory(c)}>
                                                    <div className={`checkBox ${category === c && 'filledCheckBox'}`}></div>
                                                    <div className='itemName'>
                                                        {c}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className='category categoryBorderBottom'>
                                <div className={`categoryHeading ${openclose.color && 'openCategory'}`} onClick={() => handleOpenClose('color')}>
                                    <h1>Color</h1>
                                </div>
                                {openclose.color &&
                                    <div className='categoryWrapper'>
                                        <div className='categoryItem' onClick={() => setColor('')}>
                                            <div className={`checkBox ${color === '' && 'filledCheckBox'}`}></div>
                                            <div className='itemName'>
                                                All
                                            </div>
                                        </div>
                                        {
                                            colors.map((c) => (
                                                <div className='categoryItem' onClick={() => setColor(c)}>
                                                    <div className={`checkBox ${color === c && 'filledCheckBox'}`}></div>
                                                    <div className='itemName'>
                                                        {c}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className='category categoryBorderBottom'>
                                <div className={`categoryHeading ${openclose.price && 'openCategory'}`} onClick={() => handleOpenClose('price')}>
                                    <h1>Price</h1>
                                </div>
                                {openclose.price &&
                                    <div className='categoryWrapper'>
                                        <div className='categoryItem' onClick={() => setPrice([0, 100000])}>
                                            <div className={`checkBox ${price[0] === 0 && price[1] === 100000 && 'filledCheckBox'}`}></div>
                                            <div className='itemName' onClick={() => setPrice([0, 100000])}>
                                                All
                                            </div>
                                        </div>
                                        {
                                            prices.map((p) => (
                                                <div className='categoryItem' onClick={() => setPrice([0, p.end])}>
                                                    <div className={`checkBox ${price[1] === p.end && 'filledCheckBox'}`}></div>
                                                    <div className='itemName'>
                                                        Under ₹ {p.end}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='categoryItem'>
                                            <div className={`checkBox ${price[0] === 3000 && price[1] === 100000 && 'filledCheckBox'}`}></div>
                                            <div className='itemName' onClick={() => setPrice([3000, 100000])}>
                                                Above ₹ 3000
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className='category categoryBorderBottom'>
                                <div className={`categoryHeading ${openclose.ratings && 'openCategory'}`} onClick={() => handleOpenClose('ratings')}>
                                    <h1>Rating</h1>
                                </div>
                                {openclose.ratings &&
                                    <div className='categoryWrapper'>
                                        <div className='categoryItem' onClick={() => setRatings(0)}>
                                            <div className={`checkBox ${ratings === 0 && 'filledCheckBox'}`}></div>
                                            <div className='itemName'>
                                                0.0 to 5.0
                                            </div>
                                        </div>
                                        {
                                            productratings.map((r) => (
                                                <div className='categoryItem' onClick={() => setRatings(r)}>
                                                    <div className={`checkBox ${ratings === r && 'filledCheckBox'}`}></div>
                                                    <div className='itemName'>
                                                        {r}.0 and above
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                            <div className='category'>
                                <div className={`categoryHeading ${openclose.size && 'openCategory'}`} onClick={() => handleOpenClose('size')}>
                                    <h1>Size</h1>
                                </div>
                                {openclose.size &&
                                    <div className='categoryWrapper'>
                                        <div className='categoryItem' onClick={() => setSize('')}>
                                            <div className={`checkBox ${size === '' && 'filledCheckBox'}`}></div>
                                            <div className='itemName'>
                                                ALL
                                            </div>
                                        </div>
                                        {
                                            sizes.map((s) => (
                                                <div className='categoryItem' onClick={() => setSize(s)}>
                                                    <div className={`checkBox ${size === s && 'filledCheckBox'}`}></div>
                                                    <div className='itemName'>
                                                        {s}
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                        {products.length === 0 &&
                            <div className='noItemWrapper'>
                                <div className='noItem'>Nothing to show you</div>
                            </div>
                        }
                        <div className="productsContainer">
                            <div className='productsBody'>
                                {products &&
                                    products.map((product) => (
                                        <ProductsCard product={product} />
                                    ))}
                            </div>
                            {resultPerPage < filteredProductsCount &&
                                <div className='paginationBox'>
                                    <Pagination
                                        activePage={currentPage}
                                        itemsCountPerPage={resultPerPage}
                                        totalItemsCount={productsCount}
                                        onChange={setCurrentPageNo}
                                        nextPageText="NEXT"
                                        prevPageText="PREV"
                                        firstPageText={false}
                                        lastPageText={false}
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