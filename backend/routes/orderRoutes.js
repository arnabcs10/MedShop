const express = require('express')
const router = express.Router();

//controller
const {addOrderItems } = require('../controllers/orderController');

//Middleware
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(protect, addOrderItems);





module.exports = router;