const express = require('express');
const router = express.Router();

//contoller
const { getProducts, getProductById, deleteProduct, createProduct,updateProduct, createdProductReview, getTopProducts } = require('../controllers/productController');
//Middlewares
const { protect, admin } = require('../middlewares/authMiddleware');

// @desc   Fetch all products
// @route  GET /api/products/
// @access Public
router.route('/').get(getProducts);
router.route('/').post(protect, admin, createProduct);

router.get('/top',getTopProducts);

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);
router.route('/:id').put(protect, admin, updateProduct);

router.route('/:id/reviews').post(protect, createdProductReview);

module.exports = router;
