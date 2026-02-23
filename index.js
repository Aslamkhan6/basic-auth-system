const express =  require("express")
const userroute = require("./routes/router")
const dbconnection = require("./utils/db-connection")
const app = express()
app.use(express.json());
app.use("/api/auth",userroute)
let port = process.env.PORT
console.log(port)
dbconnection().then(()=>{
app.listen(port,()=>{
    console.log("server is listening on port 5000")
})
})
