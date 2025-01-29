const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
config();

//* Require "Labour" collection 
const Labour = require("../models/registrationSchema.js");
const SECRET_KEY = process.env.SECRET_KEY;
console.log('SECRET_KEY :', SECRET_KEY);



const auth = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = await jwt.verify(token, SECRET_KEY);

        const labourData = await Labour.findOne({_id : verifyUser._id}); 


        req.token = token;
        req.labourData = labourData;

        next();
    }
    catch(error) {
        res.status(401).send(`${error}`);
    }
};




module.exports = {
    auth
}