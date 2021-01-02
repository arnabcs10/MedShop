# MedShop

 A web app for small scale medicine shops to display their products online.

It has features like product page, product reviws and ratings,User login and profile, Admin users,products and orders management etc.
It is developed with React and Redux at Frontend and used Node,Express and MongoDB for backend.

## Description
Features of the Web App:

- Users can view all the listed products on Home page.
- Users can view the details of a perticular product.
- Users can give rating and comment on a product.
- Users can select quantity,can add to cart and proceed for checkout.
- Users can login and set their profile.User can post address on their profile.
- Users can update their profile.
- Admin can create,update,delete a product.
- Admin can take the order and dispatch it.
- Admin can edit users information.

## Getting Started

### Dependencies

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), managed states with Redux, Bootstrap themes for styling.
* Backend framework - Express
* Database - MongoDB
* Authentication - JWT

### Installing

* Fork and clone this repository in your system
* Go to the required directory and run 
```
git clone https://github.com/arnabcs10/MedShop.git
```

### Executing program
Follow the instructions to get started with the project on your local machine 🚀

* In your terminal run `cd MedShop/`
* Run `npm install` to install all required dependencies.

#### Backend
* Add your `.env` file and put following variables.
```
NODE_ENV = development
PORT = 5000
MONGO_URI = YOUR_MONGO_URI
JWT_SECRET = YOUR_SECRET
```
* Run `npm run server` to start the backend server.
* Goto `http://localhost:5000/` to see : `API is running...`

### Frontend
* In your terminal run `cd frontend/`
* Run `npm install` to install all required frontend dependencies.
* Run `npm start` to start the project.
* Goto `http://localhost:3000/` 

## Authors

@arnabcs10

## Version History

* 0.1
    * First Release - A web-app for medicines shops.

