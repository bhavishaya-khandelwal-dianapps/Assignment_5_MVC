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
        const newlabour = await labourService.registerLabour(req.body);
        res.status(201).send(newlabour);
    }
    catch(error) {
        console.log(`Some error occur while pushing data into our database and the error = ${error}`);
        res.status(500).send(error);
    }
};


async function loginLabour(req, res) {
    try {
        const email = req.body.email;
        const password = (req.body.password).toString();
        const getUserData = await labourService.loginLabour(email);
        console.log(getUserData);
        if(getUserData.length.toString() === "0") {
            res.status(400).send("Sorry, invalid credentials");
        } 
        else {
            const pw = getUserData[0].password.toString();
            if(pw == password) {
                res.render("home");
            }
            else {
                res.send("Sorry, invalid credentials");
            }
        }
    }
    catch(error) {
        console.log(`Some error occur while login and the error = ${error}`);
        res.status(400).send(error);
    }
}


module.exports = {
    showHomePage, 
    showRegistrationPage, 
    showLoginPage,
    registerLabour,
    loginLabour
}