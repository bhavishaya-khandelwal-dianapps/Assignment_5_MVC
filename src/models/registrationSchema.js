//* Require necessary libraries 
const mongoose = require("mongoose");
const validator = require("validator");


//* Construct schema for registration
const rSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true  
    },
    phoneNumber : {
        type : Number,
        required : true, 
        unique : true
    },
    email : {
        type : String, 
        required : true, 
        unique : true, 
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Sorry, your email is invalid");
            }
        }
    }, 
    gender : {
        type : String, 
        required : true
    },
    age : {
        type : Number, 
        required : true,
    },
    experience : {
        type : Number, 
    },
    password : {
        type : String, 
        required : true, 
    }
});


//* Create collection 
const Labour = new mongoose.model("Labour", rSchema);


module.exports = Labour;