const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apifeatures");

// Create Product - Admin
exports.createProduct = catchAsyncError(async (req, res, next) => {
    req.body.user = req.user.id;
    
    const product = await Product.create(req.body);

    res.status(200).json({
        success: true,
        product
    })
});

// Get All Product
exports.getAllProducts = catchAsyncError(async (req, res) => {
    const resultPerPage = 10;
    const apiFeatures = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);
    const productsCount = await Product.countDocuments();

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage
    });
});

// Update Product - Admin
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    });

    res.status(200).json({
        success: true,
        product
    });

});

// Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 404));
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product deleted succesfully"
    });

});

// Get Product Details
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        product
    });

});   