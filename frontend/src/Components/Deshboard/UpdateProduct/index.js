import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Layouts/MetaData";
import Sidebar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from '../../../Redux/constant/productConstant';
import { clearErrors, updateProduct, getProductDetails } from '../../../Redux/action/productAction';
import Toast from "../../Layouts/Toast"
import ToastContainerBox from "../../Layouts/ToastContainerBox"

const categories = ["Women Ethnic", "Women Western", "Men", "Tops", "Kitchen", "Beauty", "Jewellery", "Bags", "Electronics", "Accesories", "Footwear", "Home"];

const subCategories = ["Dupattas", "Kurtis", "Kurta Sets", "Lehengas", "Patiala", "Sarees", "Suits", "Tops and Tunics", "Shirts", "T-shirts", "Beauty", "Jewellery", "Bags", "Footware", "Electronics", "Home"];

const sizes = ['L', 'XL', 'XXL', 'M', 'S', 'XXXL', 'XXS']

const colors = ['Beige', 'Black', 'Blue', 'Brown', 'Grey', 'Khaki', 'Maroon', 'White', 'Multicolor', 'Nude', 'Olive', 'Orange', 'Pink']

const UpdateProduct = ({ history, match }) => {
    const dispatch = useDispatch();
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
    const { error, product } = useSelector((state) => state.productDetail);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [category, setCategory] = useState('');
    const [displayCategory, setDisplayCategory] = useState(false);
    const [subcategory, setSubcategory] = useState('');
    const [displaySubCategory, setDisplaySubCategory] = useState(false);
    const [size, setSize] = useState('');
    const [displaySize, setDisplaySize] = useState(false);
    const [color, setColor] = useState('');
    const [displayColor, setDisplayColor] = useState(false);

    const productId = match.params.id;

    useEffect(() => {
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else { 
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.stock);
            setOldImages(product.images);
            setSubcategory(product.subcategory);
            setSize(product.size);
            setColor(product.color);
        }

        if (error) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (updateError) {
            Toast({
                msg: error
            });

            dispatch(clearErrors());
        }

        if (isUpdated) {
            Toast({
                msg: "Product Updated succesfully"
            });

            history.push("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }

    }, [dispatch, error, history, isUpdated, productId, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        myForm.set("size", size);
        myForm.set("color", color);
 
        images.forEach((image) => {
            myForm.append("images", image);
        });

        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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
            <MetaData title={`Update Product Admin`} />
            <ToastContainerBox />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                <div className='updateProductContainer'>
                    <div className='updateProductContent'>
                        <form
                            className="updateProductForm"
                            encType="multipart/form-data"
                            onSubmit={(e) => {updateProductSubmitHandler(e)}}
                        >
                            <h2>UPDATE PRODUCT</h2>
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
                                    value={price}
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
                                    value={stock}
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
                                <h2 className='heading' onClick={() => setDisplaySubCategory(!displaySubCategory)}>
                                    {subcategory !== '' ?
                                        `${subcategory}`
                                        :
                                        'Subcategory'
                                    }
                                </h2>
                                <div className='categoryList' style={{ display: `${displaySubCategory ? 'block' : 'none'}` }}>
                                    {subCategories &&
                                        subCategories.map((item) => (
                                            <div key={item} value={item} onClick={() => {
                                                setSubcategory(item)
                                                setDisplaySubCategory(!displaySubCategory)
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

                            <div id="updateProductFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProductImagesChange}
                                    multiple
                                />
                            </div>
                            <div id="updateProductImage">
                                {oldImages && oldImages.map((image, index) => (
                                    <div className="outerBodyImage">
                                        <div className="InnerBodyImage">
                                            <img key={index} src={image.url} alt="Product Preview" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id="updateProductImage">
                                {imagesPreview.map((image, index) => (
                                    <div className="outerBodyImage">
                                        <div className="InnerBodyImage">
                                            <img key={index} src={image} alt="Product Preview" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className='submitBtnUpdateProdcuct'>
                                <button
                                    id="updateProductBtn"
                                    type="submit"
                                    disabled={loading ? true : false}
                                >
                                    UPDATE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default UpdateProduct