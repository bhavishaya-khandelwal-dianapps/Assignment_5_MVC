//* Require necessary libraries 
const mongoose = require("mongoose");


//* Connect with our mongoDB server  
mongoose.connect("mongodb://localhost:27017/BhavishayaEnterprises")
.then(() => {
    console.log(`Connection successful FUTURE, Go ahead...`);
})
.catch((error) => {
    console.log(`Some error occur while connecting to mongoDB server and the ERROR = ${error}`);
});