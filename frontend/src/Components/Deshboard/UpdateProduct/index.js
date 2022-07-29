import React, { useEffect, useState } from 'react'
import "./style.css"
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../Layouts/MetaData";
import Sidebar from "../Sidebar";
import { UPDATE_PRODUCT_RESET } from '../../../Redux/constant/productConstant';
import { clearErrors, updateProduct, getProductDetails } from '../../../Redux/action/productAction';
import Toast from "../../Layouts/Toast"
import ToastContainerBox from "../../Layouts/ToastContainerBox"

const UpdateProduct = ({ history, match }) => {
    const dispatch = useDispatch();
    const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
    const { error, product } = useSelector((state) => state.productDetail);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop", 
        "Footwear",
        "Bottom",
        "Tops",
        "Watch",
        "Camera",
        "SmartPhones",
    ];

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
            <MetaData title={`Create Product Admin`} />
            <ToastContainerBox />
            <div className='deshboardContent'>
                <div className='deshboard'>
                    <Sidebar />
                </div>
                <div className='newProductContainer'>
                    <div className='newProductContent'>
                        <form
                            className="createProductForm"
                            encType="multipart/form-data"
                            onSubmit={(e) => {updateProductSubmitHandler(e)}}
                        >
                            <h2>Update Product</h2>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Product Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Price"
                                    required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div>
                                <textarea
                                    placeholder="Product Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    cols="30"
                                    rows="1"
                                ></textarea>
                            </div>
                            <div>
                                <select onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Choose Category</option>
                                    {categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <input
                                    type="number"
                                    placeholder="Stock"
                                    required
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                />
                            </div>
                            <div id="createProductFormFile">
                                <input
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange={updateProductImagesChange}
                                    multiple
                                />
                            </div>
                            <div id="createProductFormImage">
                                {oldImages && oldImages.map((image, index) => (
                                    <div className="outerBodyImage">
                                        <div className="InnerBodyImage">
                                            <img key={index} src={image.url} alt="Product Preview" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id="createProductFormImage">
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
                                    Update
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