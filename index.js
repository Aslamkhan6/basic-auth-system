const express =  require("express")
const userroutes = require("./routes/userroute");
const dbconnection = require("./utils/db-connection")
// const errorhandler = require("./middlewars/errormiddlewars")
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();
const app = express()
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api",userroutes)
// app.use(errorhandler)
let port = process.env.PORT
console.log(port)
dbconnection().then(()=>{
app.listen(port,()=>{
    console.log("server is listening on port 5000")
})
})
