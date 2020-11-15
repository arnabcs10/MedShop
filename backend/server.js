//Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const colors = require('colors');
const morgan = require('morgan');

// Import Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

//Middlewares
const { notFound,errorHandler} = require('./middlewares/errorMiddleware');


//App config
const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

dotenv.config();
app.use(express.json()) //body-parser
const folder = path.resolve();
app.use('/uploads',express.static(path.join(folder,'/uploads')));



//Database connection
connectDB();

//Routes
//Home


//api/products/
app.use('/api/products/',productRoutes);

app.use('/api/users',userRoutes);

app.use('/api/orders', orderRoutes);

app.use('/api/upload', uploadRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(folder,'/frontend/build')));

    app.get('*',(req, res) => res.sendFile(path.resolve(folder, 'frontend','build','index.html')));
    
}else{
    app.get('/',(req,res)=>{
        res.send("API is running...");
    });
}



//error handler
app.use(notFound);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;

app.listen(PORT,() =>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});