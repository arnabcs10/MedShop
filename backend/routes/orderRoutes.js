const express = require('express')
const router = express.Router();

//controller
const {addOrderItems, getOrderById,updateOrderToPaid,getMyOrders,getOrders,updateOrderToDeliverd } = require('../controllers/orderController');

//Middleware
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').post(protect, addOrderItems);
router.route('/').get(protect,admin, getOrders);

router.route('/myorders').get(protect,getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDeliverd);





module.exports = router;