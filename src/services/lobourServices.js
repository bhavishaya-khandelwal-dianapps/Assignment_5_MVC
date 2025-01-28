//* Require our "Labour" collection 
const Labour = require("../models/registrationSchema.js");


//* Require password hash function from utilities 
const hash = require("../utilities/hashPassword.js");
const validate = require("../utilities/validate.js");
const middleware = require("../middlewares/labourMiddleware.js");



//* Register the new labour into our database 
async function registerLabour(data) {

    //* ========== Email verification goes from here ==========
    let isEmailValid = await validate.isValid("email", data);
    console.log('isEmailValid =', isEmailValid);
    if(isEmailValid == false) throw new Error(`<h1>Email is not valid</h1>`);

    //* ========== Age Verification goes from here ==========
    let isAgeValid = await validate.isValid("age", data);
    console.log('isAgeValid =', isAgeValid);
    if(isAgeValid == false) throw new Error(`<h1>Your age is in between (12 to 100)</h1>`);

    //* ========= Experience Verification goes from here =========
    let isExperienceValid = await validate.isValid("experience", data);
    console.log('isExperienceValid =', isExperienceValid);
    if(isExperienceValid == false) throw new Error(`<h1>Your experience is not more than ${data.age - 10} years</h1>`);

    //* ========== Phone Number verification goes from here ========== 
    let isPhoneNumberValid = await validate.isValid("phoneNumber", data);
    console.log("isPhoneNumberValid =", isPhoneNumberValid);
    if(isPhoneNumberValid == false) throw new Error(`<h1>Please enter valid phone number</h1>`);

    
    //* ======== Password Validation goes from here ==========
    let isPasswordValid = await validate.isValid("password", data);
    console.log('isPasswordValid =', isPasswordValid);
    if(isPasswordValid == false) throw new Error(`<h1>Include symbols, alphabets and numbers</h1>`);


    //* Before saving data into data base make sure to hash the password  
    let hashedPassword = await hash.hashThePassword(data.password);
    data.password = hashedPassword;


    //* Now, i am going to generate token when ever any new labour registers  
    const token = await middleware.generateToken(data); 
    console.log("Token =", token); 


    const newLabour = new Labour(data);
    await newLabour.save();
    return { newLabour, token };
} 



//* Login the labour (if it is a valid user or after authentication)
async function loginLabour(body) {
    let email = body.email; 
    let password = body.password;
    if(validate.isValid("email", body) == false) throw new Error("<h1>Invalid Credentials</h1>");
    if(validate.isValid("password", body) == false) throw new Error("<h1>Invalid Credentials</h1>");
    
    //* Find the data of that user 
    let userData = await Labour.find({email});
    if(userData.length == 0) throw new Error("<h1>Invalid Credentials</h1>");
    let storedPassword = (userData[0].password).toString();
    let isMatch = await hash.compareThePassword(password, storedPassword);  
    if(isMatch == false) {
        throw new Error("<h1>Invalid Credentials</h1>");
    }

    
    //* If all the details are match then also generate token and store it in cookies 
    const token = await middleware.generateToken(body);
    console.log("Login Time Token =", token); 

    const isUserValid = true;
    return { isUserValid, token };
}



module.exports = {
    registerLabour,
    loginLabour
}