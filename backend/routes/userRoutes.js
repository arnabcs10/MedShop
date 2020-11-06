const express = require('express')
const router = express.Router();

//controller
const {userController, authUser} = require('../controllers/userController');

router.post('/login', authUser);

module.exports = router;