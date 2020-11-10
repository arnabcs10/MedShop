const express = require('express')
const router = express.Router();

//controller
const { authUser, getUserProfile, registerUser, updateUserProfile, getUsers } = require('../controllers/userController');

//Middleware
const { protect, admin } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser);
router.route('/').get(protect,admin,getUsers);

router.post('/login', authUser);

router.route('/profile').get( protect, getUserProfile);
router.route('/profile').put( protect, updateUserProfile);




module.exports = router;