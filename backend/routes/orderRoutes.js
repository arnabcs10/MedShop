const express = require('express')
const router = express.Router();

//controller
const {addOrderItems, getOrderById } = require('../controllers/orderController');

//Middleware
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);




module.exports = router;