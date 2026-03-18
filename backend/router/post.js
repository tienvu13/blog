const router = require("express").Router()
const Post = require("../models/Post")

// CREATE POST
router.post("/", async (req,res)=>{

try{

const newPost = new Post(req.body)
const savedPost = await newPost.save()

res.status(200).json(savedPost)

}catch(err){

res.status(500).json(err)

}

})


// GET ALL POSTS
router.get("/", async (req,res)=>{

try{

const posts = await Post.find()
res.status(200).json(posts)

}catch(err){

res.status(500).json(err)

}

})


// GET SINGLE POST
router.get("/:id", async (req,res)=>{

try{

const post = await Post.findById(req.params.id)
res.status(200).json(post)

}catch(err){

res.status(500).json(err)

}

})


// UPDATE POST
router.put("/:id", async (req,res)=>{

try{

const updatedPost = await Post.findByIdAndUpdate(
req.params.id,
{ $set:req.body },
{ new:true }
)

res.status(200).json(updatedPost)

}catch(err){

res.status(500).json(err)

}

})


// DELETE POST
router.delete("/:id", async (req,res)=>{

try{

await Post.findByIdAndDelete(req.params.id)
res.status(200).json("Post deleted")

}catch(err){

res.status(500).json(err)

}

})

module.exports = router