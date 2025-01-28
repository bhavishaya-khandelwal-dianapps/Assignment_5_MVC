const jwt = require("jsonwebtoken");


//* Get SECRET_KEY from .env file  
const SECRET_KEY = process.env.SECRET_KEY || "mynameisbhavishayakhandelwalandilovetocoding";



//* Function to generate JWT token 
async function generateToken(data) {
    try {
        //* Define payload 
        const payload = {
            _id : data._id
        };

        //* Now, generate token  
        const token = await jwt.sign(payload, SECRET_KEY);

        //* Adding token to our data base  
        console.log("data.tokens =", data.tokens); 

        if(data.tokens == undefined) {
            data.tokens = [{ token }];
        }
        else {
            data.token[(data.tokens).length] = { token };
        }
        console.log("data.tokens.length =", (data.tokens).length);

        return token;
    }
    catch(error) {
        console.log(`OOPs, Token generation is failed and the error is = ${error}`);
    }
};



module.exports = {
    generateToken
}