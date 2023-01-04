import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Layouts/MetaData";
import Sidebar from "../Sidebar";
import { NEW_PRODUCT_RESET } from '../../../Redux/constant/productConstant';
import { clearErrors, createProduct } from '../../../Redux/action/productAction';
import Toast from "../../Layouts/Toast"
import ToastContainerBox from "../../Layouts/ToastContainerBox"

const categories = ["Women Ethnic", "Women Western", "Men", "Kitchen", "Beauty", "Jewellery", "Bags", "Electronics", "Accesories", "Footwear", "Home"];

const subcategories = ["Dupattas", "Kurtis", "Kurta Sets", "Lehengas", "Patiala", "Sarees", "Suits", "Tops and Tunics", "Shirts", "T-shirts", "Beauty", "Jewellery", "Bags", "Footware", "Electronics", "Kitchen", "Home"]

const sizes = ['L', 'XL', 'XXL', 'M', 'S', 'XXXL', 'XXS', 'FREE SIZE']

const colors = ['Beige', 'Black', 'Blue', 'Brown', 'Grey', 'Khaki', 'Maroon', 'White', 'Multicolor', 'Nude', 'Olive', 'Orange', 'Pink']

const NewProduct = ({ history }) => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.newProduct);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [category, setCategory] = useState('');
    const [displayCategory, setDisplayCategory] = useState(false);
    const [subcategory, setSubcategory] = useState('');
    const [displaySubcategory, setDisplaySubcategory] = useState(false);
    const [size, setSize] = useState('');
    const [displaySize, setDisplaySize] = useState(false);
    const [color, setColor] = useState('');
    const [displayColor, setDisplayColor] = useState(false);

    useEffect(() => {
        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (success) {
            Toast({
                msg: "Product Creat succesfully"
            });

            history.push("/admin/deshboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }

    }, [dispatch, error, history, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("subcategory", subcategory);
        myForm.set("stock", Stock);
        myForm.set("size", size);
        myForm.set("color", color);

        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {

        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title={`Create Product Admin`} />
            <ToastContainerBox />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                <div className='createProductContainer'>
                    <div className='createProductContent'>
                        <form
                            className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={(e) => { createProductSubmitHandler(e) }}
                        >
                            <h2>CREATE PRODUCT</h2>
                            <div className="inputField">
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="inputField">
                                <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="textareaField">
                                <textarea
                                    placeholder="Product Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>
                            <div className="inputField">
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div className="categoryBox">
                                <h2 className='heading' onClick={() => setDisplayCategory(!displayCategory)}>
                                    {category !== '' ?
                                        `${category}`
                                        :
                                        'Category'
                                    }
                                </h2>
                                <div className='categoryList' style={{ display: `${displayCategory ? 'block' : 'none'}` }}>
                                    {categories &&
                                        categories.map((item) => (
                                            <div key={item} value={item} onClick={() => {
                                                setCategory(item)
                                                setDisplayCategory(!displayCategory)
                                            }}>
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="categoryBox">
                                <h2 className='heading' onClick={() => setDisplaySubcategory(!displaySubcategory)}>
                                    {subcategory !== '' ?
                                        `${subcategory}`
                                        :
                                        'Subcategory'
                                    }
                                </h2>
                                <div className='categoryList' style={{ display: `${displaySubcategory ? 'block' : 'none'}` }}>
                                    {subcategories &&
                                        subcategories.map((item) => (
                                            <div key={item} value={item} onClick={() => {
                                                setSubcategory(item)
                                                setDisplaySubcategory(!displaySubcategory)
                                            }}>
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="categoryBox">
                                <h2 className='heading' onClick={() => setDisplaySize(!displaySize)}>
                                    {size !== '' ?
                                        `${size}`
                                        :
                                        'Size'
                                    }
                                </h2>
                                <div className='categoryList' style={{ display: `${displaySize ? 'block' : 'none'}` }}>
                                    {sizes &&
                                        sizes.map((item) => (
                                            <div key={item} value={item} onClick={() => {
                                                setSize(item)
                                                setDisplaySize(!displaySize)
                                            }}>
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div className="categoryBox">
                                <h2 className='heading' onClick={() => setDisplayColor(!displayColor)}>
                                    {color !== '' ?
                                        `${color}`
                                        :
                                        'Color'
                                    }
                                </h2>
                                <div className='categoryList' style={{ display: `${displayColor ? 'block' : 'none'}` }}>
                                    {colors &&
                                        colors.map((item) => (
                                            <div key={item} value={item} onClick={() => {
                                                setColor(item)
                                                setDisplayColor(!displayColor)
                                            }}>
                                                {item}
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div id="createProductFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={createProductImagesChange}
                                    multiple
                                />
                            </div>
                            <div id="createProductImage">
                                {imagesPreview.map((image, index) => (
                                    <div className="outerBodyImage">
                                        <div className="InnerBodyImage">
                                            <img key={index} src={image} alt="Product Preview" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='submitBtnCreateProdcuct'>
                                <button
                                    id="createProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    CREATE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NewProduct