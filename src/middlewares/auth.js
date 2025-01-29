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
        req.user = labourData;

        next();
    }
    catch(error) {
        res.status(401).send(`${error}`);
    }
};



async function validateToken(req, res, next) {
    try {
        console.log('req.headers :', req.headers);
        const auth = req.headers.authorization;

        const token = auth.split(" ")[1];
        console.log('token :', token);
        const verifyToken = jwt.verify(token, SECRET_KEY);
        if(verifyToken) {
            next(); 
        }
        else {
            throw new Error("Token verification failed");
        }
    }
    catch(error) {
        res.status(500).send(`${error}`);
    }
};



module.exports = {
    auth,
    validateToken
}