const express = require("express")
const app = express()

const Home = (req,res)=>{
    try {
        res.send("hello world by controller ")
    } catch (error) {
        console.log(error)
    }

}
module.exports = Home
