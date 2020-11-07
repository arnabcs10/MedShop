const express = require('express')
const router = express.Router();

//controller
const { authUser, getUserProfile } = require('../controllers/userController');

//Middleware
const { protect } = require('../middlewares/authMiddleware');

router.post('/login', authUser);

router.route('/profile').get( protect, getUserProfile);


module.exports = router;