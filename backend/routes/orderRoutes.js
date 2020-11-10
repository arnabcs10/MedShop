const express = require('express')
const router = express.Router();

//controller
const {addOrderItems, getOrderById,updateOrderToPaid } = require('../controllers/orderController');

//Middleware
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);



module.exports = router;