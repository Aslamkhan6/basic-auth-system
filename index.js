const express =  require("express")
const userroutes = require("./routes/userroute");
const dbconnection = require("./utils/db-connection")
require("dotenv").config();
const app = express()
app.use(express.json());
app.use("/api/auth",userroutes)
let port = process.env.PORT
console.log(port)
dbconnection().then(()=>{
app.listen(port,()=>{
    console.log("server is listening on port 5000")
})
})
