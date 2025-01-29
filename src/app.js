//* Requiring necessary libraries 
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { config } = require("dotenv");
config();
const cookieParser = require("cookie-parser");



//* Require connection.js file to connect with our mongoDB server 
require("./config/connection.js");


//* Require routes.js file 
const router = require("./routers/routes.js");



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

//? Use cookie parser - Middleware - 3
app.use(cookieParser());

//? Getting routes 
app.use(router);

//? Define view engine 
let viewPath = path.join(__dirname, "views");
app.set("views", viewPath);
app.set("view engine", "hbs");



//* Listen the express server 
const server = app.listen(PORT, () => {
    console.log(`Server is listening on PORT number ${PORT}`);
});