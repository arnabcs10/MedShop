const express = require('express');
const router = express.Router();

//contoller
const { getProducts, getProductById, deleteProduct, createProduct,updateProduct } = require('../controllers/productController');
//Middlewares
const { protect, admin } = require('../middlewares/authMiddleware');

// @desc   Fetch all products
// @route  GET /api/products/
// @access Public
router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct);
// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id').put(protect, admin, updateProduct);



module.exports = router;
