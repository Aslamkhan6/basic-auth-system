const {  mongoose } = require("mongoose");
require("dotenv").config()
let url = process.env.URL
const dbconnection = async()=>{
try {
    
    await  mongoose.connect(url)
    console.log("data base connected sucessfully")
} catch (error) {
    console.log(`some thing went wrong  ${error}`)
    process.exit()
}
    
}

module.exports = dbconnection