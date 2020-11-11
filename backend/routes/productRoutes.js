const express = require('express');
const router = express.Router();

//contoller
const { getProducts, getProductById, deleteProduct } = require('../controllers/productController');
//Middlewares
const { protect, admin } = require('../middlewares/authMiddleware');

// @desc   Fetch all products
// @route  GET /api/products/
// @access Public
router.route('/').get(getProducts);

// @desc   Fetch single product
// @route  GET /api/products/:id
// @access Public
router.route('/:id').get(getProductById);
router.route('/:id').delete(protect, admin, deleteProduct);



module.exports = router;
