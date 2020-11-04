//Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');


// Import Routes
const productRoutes = require('./routes/productRoutes');

//App config
const app = express();
dotenv.config();

//Database connection
connectDB();

//Routes
//Home
app.get('/',(req,res)=>{
    res.send("API is running...");
});

//api/products/
app.use('/api/products/',productRoutes);




const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});