//* Require our "Labour" collection 
const Labour = require("../models/registrationSchema.js");


async function registerLabour(data) {
    const newLabour = new Labour(data);
    await newLabour.save();
    return newLabour;
}


async function loginLabour(email) {
    const findUserByEmail = await Labour.find({email});
    return findUserByEmail;
}



module.exports = {
    registerLabour,
    loginLabour
}