//* Require our "Labour" collection 
const Labour = require("../models/registrationSchema.js");


//* Require password hash function from utilities 
const hash = require("../utilities/hashPassword.js");
const validate = require("../utilities/validate.js");


async function registerLabour(data) {

    //* ========== Email verification goes from here ==========
    let isEmailValid = await validate.isEmailCorrect(data.email);
    if(isEmailValid == false) return "emailError";

    //* ========== Age Verification goes from here ==========
    let isAgeValid = await validate.isAgeCorrect(data.age);
    if(isAgeValid == false) return "ageError";

    //* ========= Experience Verification goes from here =========
    let isExperienceValid = await validate.isExperienceCorrect(data.experience, data.age);
    if(isExperienceValid == false) return "experienceError";

    //* ========== Phone Number verification goes from here ========== 
    let isPhoneNumberValid = await validate.isPhoneNumberCorrect(data.phoneNumber);
    if(isPhoneNumberValid == false) return "phoneNumberError";

    
    //* ======== Password Validation goes from here ==========
    let isPasswordValid = await validate.isPasswordCorrect(data.password);
    if(isPasswordValid == false) return "passwordError";


    //* Before saving data into data base make sure to hash the password  
    let hashedPassword = await hash.hashThePassword(data.password);
    data.password = hashedPassword;

    const newLabour = new Labour(data);
    await newLabour.save();
    return newLabour;
}


async function loginLabour(body) {
    let email = body.email; 
    let password = body.password;
    if(validate.isEmailCorrect(email) == false) return false;
    if(validate.isPasswordCorrect(password) == false) return false;
    let userData = await Labour.find({email});
    if(userData.length == 0) return false;
    let storedPassword = (userData[0].password).toString();
    let isMatch = await hash.compareThePassword(password, storedPassword);  
    return isMatch;  
}



module.exports = {
    registerLabour,
    loginLabour
}