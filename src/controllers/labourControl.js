//* Require our "Labour" collection 
const Labour = require("../models/registrationSchema.js");
const labourService = require("../services/lobourServices.js");


async function showHomePage(req, res) {
    try {
        res.render("home");
    }
    catch(error) {
        console.log(`Some error occur while showing home page and the error = ${error}`);
    }
};


async function showRegistrationPage(req, res) {
    try {
        res.render("registration");
    }
    catch(error) {
        console.log(`Some error occur while showing registration page and the error = ${error}`);
    }
};


async function showLoginPage(req, res) {
    try {
        res.render("login");
    }
    catch(error) {
        console.log(`Some error occur while showing login page and the error = ${error}`);
    }
};


async function registerLabour(req, res) {
    try {
        const result = await labourService.registerLabour(req.body); 
        const { newLabour, token } = result;
        //* console.log("New User Token =", token);
        //* console.log("User Data =", newLabour);

        //* Now, i am going to store this token into our cookie 
        res.cookie("jwt", token, {
            expires : new Date(Date.now() + 30000),
            httpOnly : true 
        });

        //* If everything is fine then redirect to login page
        return res.status(201).render("login");
    }
    catch(error) {
        console.log(`Some error occur while pushing data into our database and the error = ${error}`);
        return res.status(500).send(`${error}`);
    }
};


async function loginLabour(req, res) {
    try {
        const isValidUser = await labourService.loginLabour(req.body);
        const { isUserValid, token } = isValidUser;
        if(isUserValid) {
            res.cookie("jwt", token, {
                expires : new Date(Date.now() + 50000), 
                httpOnly : true
            });
            console.log("Login Time Cookie saved");
            return res.status(200).render("home");
        }
        return res.status(400).send("<h1>Sorry, Invalid credentials</h1>");
    }
    catch(error) {
        console.log(`Some error occur while login and the error = ${error}`);
        res.status(400).send(`${error}`);
    }
}


module.exports = {
    showHomePage, 
    showRegistrationPage, 
    showLoginPage,
    registerLabour,
    loginLabour
}