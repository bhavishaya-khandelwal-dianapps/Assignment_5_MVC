//* Requiring necessary libraries 
const express = require("express");
const hbs = require("hbs");
const { config } = require("dotenv");
config();



//* Require connection.js file to connect with our mongoDB server 
require("../controllers/connection.js");


//* Require routes.js file 
const router = require("../routers/routes.js");



//* Creating an instance of express 
const app = express();



//* Get PORT from .env file 
const PORT = process.env.PORT || 3001;



//* Define middlewares 
//? Middleware - 1
app.use(express.urlencoded({
    extended : true
}));

//? Midlleware - 2 
app.use(express.json());

//? Getting routes 
app.use(router);

//? Define view engine  
app.set("view engine", "hbs");



//* Listen the express server 
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT number ${PORT}`);
});