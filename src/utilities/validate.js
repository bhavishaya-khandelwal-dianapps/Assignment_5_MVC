//* Function to validate email 
async function isEmailCorrect(email) {
    let regex = /^[A-Za-z\d]+(?:[.%+_][A-Za-z\d]+)*@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
    if(regex.test(email)) {
        return true;
    }
    return false;
};


//* Function to validate age
async function isAgeCorrect(age) {
    if(age <= 12 || age > 100) return false;
    return true;
};


//* Function to validate experience
async function isExperienceCorrect(experience, age) {
    if(experience > (age - 12)) return false;
    return true;
};


//* Function to validate phoneNumber 
async function isPhoneNumberCorrect(phoneNumber) {
    if(phoneNumber.length != 10) return false;
    return true;
};


//* Function to validate password 
let symbols = `~!@#$%^&*()-_+=,{}/.:;[]'"`;
let characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
let numbers =  `1234567890`;
async function isPasswordCorrect(password) {
    let isSymbol = false; 
    let isAlphabets = false; 
    let isDigit = false;
    for(let value of symbols) {
        if(password.includes(value)) {
            isSymbol = true;
            break;
        }
    }
    if(isSymbol == false) return false;
    for(let value of characters) {
        if(password.includes(value)) {
            isAlphabets = true;
            break;
        }
    }
    if(isAlphabets == false) return false;
    for(let value of numbers) {
        if(password.includes(value)) {
            isDigit = true;
            return true;
        }
    }
    if(isDigit == false) return false;
    return true;
};



//* Export this function
module.exports = {
    isEmailCorrect, 
    isAgeCorrect,
    isExperienceCorrect,
    isPhoneNumberCorrect, 
    isPasswordCorrect
}