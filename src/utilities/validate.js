async function isValid(field, data) {
    
    //* Validate Email 
    if(field == "email") { 
        let regex = /^[A-Za-z\d]+(?:[.%+_][A-Za-z\d]+)*@[A-Za-z0-9]+\.[A-Za-z]{2,}$/;
        let email = data[`${field}`];
        if(regex.test(email)) {
            console.log("Email verified successfully");
            return true;
        }
        return false;
    }

    //* Validate Age
    else if(field == "age") {
        if(data[`${field}`] <= 12 || data[`${field}`]  > 100) return false;
        return true;
    }

    //* Validate experience
    else if(field == "experience") {
        if(data[`${field}`]  > (data.age  - 12)) return false;
        return true;
    }

    //* Validate phone number
    else if(field == "phoneNumber") {
        if(data[`${field}`].length != 10) return false;
        return true;
    }

    //* Validate password 
    else if(field == "password") {
        let symbols = `~!@#$%^&*()-_+=,{}/.:;[]'"`;
        let characters = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
        let numbers =  `1234567890`;
        let isSymbol = false; 
        let isAlphabets = false; 
        let isDigit = false;
        for(let value of symbols) {
            if(data[`${field}`].includes(value)) {
                isSymbol = true;
                break;
            }
        }
        if(isSymbol == false) return false;
        for(let value of characters) {
            if(data[`${field}`].includes(value)) {
                isAlphabets = true;
                break;
            }
        }
        if(isAlphabets == false) return false;
        for(let value of numbers) {
            if(data[`${field}`].includes(value)) {
                isDigit = true;
                return true;
            }
        }
        if(isDigit == false) return false;
        return true;
    }
};



//* Export this function
module.exports = {
    isValid
}