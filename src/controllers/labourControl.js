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
        const body = {
            name : req.body.name, 
            phoneNumber : req.body.phoneNumber,
            email : req.body.email, 
            gender : req.body.gender, 
            age : req.body.age,
            experience : req.body.experience, 
            password : req.body.password
        };
        const result = await labourService.registerLabour(body);
        if(result == "emailError") {
            return res.status(400).send("<h1>OOPs, your email is invalid</h1>");
        }
        if(result == "ageError") {
            return res.status(400).send("<h1>Your age must be greater than 12 and less than 101</h1>");
        }
        if(result == "experienceError") {
            return res.status(400).send(`<h1>Your experience is not more than ${body.age - 12} years</h1>`);
        }
        if(result == "phoneNumberError") {
            return res.status(400).send(`<h1>Please enter correct phone number</h1>`);
        }

        if(result == "passwordError") {
            return res.status(400).send(`<h1>Please include special characters, digits and alphabets</h1>`);
        }

        //* If everything is fine then redirect to login page
        return res.status(201).render("login");
    }
    catch(error) {
        console.log(`Some error occur while pushing data into our database and the error = ${error}`);
        res.status(500).send(error);
    }
};


async function loginLabour(req, res) {
    try {
        const body = {
            email : req.body.email, 
            password : req.body.password
        }; 
        const isValidUser = await labourService.loginLabour(body);
        if(isValidUser) {
            return res.status(200).render("home");
        }
        return res.status(400).send("<h1>Sorry, Invalid credentials</h1>");
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