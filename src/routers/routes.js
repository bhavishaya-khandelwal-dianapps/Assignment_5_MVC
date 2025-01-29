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

router.get("/users", authMiddleware.validateToken, labourController.getAllUsers);



//? POST REQUEST goes from here -> 
router.post("/register", labourController.registerLabour);

router.post("/login", labourController.loginLabour);



//? PATCH REQUEST goes from here -> 
router.patch("/user/:id", authMiddleware.validateToken, labourController.updateUser);



//* Exporting router
module.exports = router;