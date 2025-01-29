const express = require("express");
const router = express.Router();


//* Require contoller functions 
const labourController = require("../controllers/labourControl.js");
const authMiddleware = require("../middlewares/auth.js");


//* Define routes here -> 
//? GET REQUEST goes from here -> 
router.get("/", labourController.showHomePage);

router.get("/register", labourController.showRegistrationPage);

router.get("/login", labourController.showLoginPage);

router.get("/secret", authMiddleware.auth, labourController.showSecretPage);

router.get("/logout", authMiddleware.auth, labourController.logoutLabour);



//? POST REQUEST goes from here -> 
router.post("/register", labourController.registerLabour);

router.post("/login", labourController.loginLabour);



//* Exporting router
module.exports = router;