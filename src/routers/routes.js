const express = require("express");
const router = express.Router();


//* Require contoller functions 
const labourController = require("../controllers/labourControl.js");


//* Define routes here -> 
//? GET REQUEST goes from here -> 
router.get("/", labourController.showHomePage);

router.get("/register", labourController.showRegistrationPage);

router.get("/login", labourController.showLoginPage);



//? POST REQUEST goes from here -> 
router.post("/register", labourController.registerLabour);

router.post("/login", labourController.loginLabour);



//* Exporting router
module.exports = router;