const express = require("express");
const router = express.Router();


//* Require our "Labour" collection 
const Labour = require("../models/registrationSchema.js");


//* Define routes here -> 
//? GET REQUEST goes from here -> 
router.get("/", async (req, res) => {
    res.render("home");
});

router.get("/register", async (req, res) => {
    res.render("registration");
});

router.get("/login", async (req, res) => {
    res.render("login");
});



//? POST REQUEST goes from here -> 
router.post("/register", async (req, res) => {
    try {
        const createLabour = new Labour(req.body);
        const result = await createLabour.save();
        console.log(result);
        res.render("login");
    }
    catch(error) {
        console.log(`Some error occur while pushing data into our database and the error = ${error}`);
        res.status(400).send(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = (req.body.password).toString();
        const getUserData = await Labour.find({email});
        console.log(getUserData);
        if(getUserData.length.toString() === "0") {
            res.send("Sorry, invalid credentials");
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
});


//* Exporting router
module.exports = router;