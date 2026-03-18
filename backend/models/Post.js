const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({

title:{
  type:String,
  required:true
},

content:{
  type:String,
  required:true
},

topic:{
  type:String,
  default:"Chung"
},

author:{
  type:String,
  default:"admin"
},

createdAt:{
  type:Date,
  default:Date.now
}

})

module.exports = mongoose.model("Post",PostSchema)