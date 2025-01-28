const bcrypt = require("bcryptjs");


async function hashThePassword(password) {
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
    catch(error) {
        console.log(`Error occur while hashing the password and the error is = ${error}`);
    }
};


async function compareThePassword(password, storedPassword) {
    try {
        const isPasswordMacth = await bcrypt.compare(password, storedPassword);
        console.log("isPasswordMacth =", isPasswordMacth);
        return isPasswordMacth;
    }
    catch(error) {
        console.log(`Error occur while comparing the password and the error is ${error}`);
    }
};



module.exports = {
    hashThePassword,
    compareThePassword
};