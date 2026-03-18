const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/blog")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

app.get("/",(req,res)=>{
res.send("Blog API running")
})

const postRoute = require("./router/post")

app.use("/posts",postRoute)

app.listen(5000,()=>{
console.log("Server running on port 5000")
})