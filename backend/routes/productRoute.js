const express = require("express");
const { createProduct } = require("../controllers/productControllers");
const router = express.Router();

router.route('/product/new').post(createProduct);

module.exports = router;