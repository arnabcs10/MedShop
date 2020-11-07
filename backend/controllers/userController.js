const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
//@desc Auth user & get token
//@route POST /api/users/login
//@access Public

const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne( { email: email } );
    if( user && (await user.matchPassword(password)) ){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        });
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

//@desc GET user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler( async (req, res) => {
    
    if(req.user){
        const { _id, name, email, isAdmin} = req.user;
        res.json({
            _id, 
            name, 
            email, 
            isAdmin
        });
    }else{
        res.status(404);
        throw new Error('User not found');
    }
})





module.exports = { authUser, getUserProfile };