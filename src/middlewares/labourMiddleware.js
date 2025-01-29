const jwt = require("jsonwebtoken");


//* Get SECRET_KEY from .env file  
const SECRET_KEY = process.env.SECRET_KEY || "mynameisbhavishayakhandelwalandilovetocoding";



//* Function to generate JWT token 
async function generateToken(data) {
console.log('data :', data);
    try {
        //* Define payload 
        console.log('data._id :', data._id);
        const payload = {
            _id : data._id
        };

        //* Now, generate token  
        console.log('payload :', payload);
        const token = await jwt.sign(payload, SECRET_KEY);


        //* Adding token to our data base  
        if(data.tokens == undefined) {
            data.tokens = [{ token }];
        }
        else {
            data.tokens.push({ token });
        }

        return token;
    }
    catch(error) {
        console.log(`OOPs, Token generation is failed and the error is = ${error}`);
    }
};



module.exports = {
    generateToken
}