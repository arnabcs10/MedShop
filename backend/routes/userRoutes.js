const express = require('express')
const router = express.Router();

//controller
const { authUser, getUserProfile, registerUser, updateUserProfile } = require('../controllers/userController');

//Middleware
const { protect } = require('../middlewares/authMiddleware');

router.route('/').post(registerUser);

router.post('/login', authUser);

router.route('/profile').get( protect, getUserProfile);
router.route('/profile').put( protect, updateUserProfile);

router


module.exports = router;