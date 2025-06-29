const express = require("express");
const Blog = require("./../models/blog");
const {generate_token, check_token} = require('../jwt') ;
const jwt = require("jsonwebtoken");
const routes = express.Router();

const JWT_SECRET =  "ABC"; ;




routes.get("/bulk",check_token ,async (req, res) => {
  const resposnse = await  Blog.find({}) ;
  //console.log(resposnse) ;
  res.status(200).json({response : resposnse });
})


routes.get("/:id",check_token, async (req, res) => {


  //console.log("bgggg" , req.params.id);
  const id = req.params.id ;
  const response = await  Blog.findById(id) ;
  // //console.log(resposnse) ;
  
  res.status(200).json( {response , hello: "Hello World", name: req.name , id : req.params.id  });
});


;

routes.get("/", check_token, async (req, res) => { 
  // //console.log(req.name);
  res.status(200).json({ info: "Hello World", name: req.name });
});




routes.post("/",check_token, async (req, res) => {
  try {
    const body = await req.body;


    if (!body.title || !body.content || !body.name) {
      return res.status(400).json({ message: "Title, content, and name are required" });
    }

    const find = await Blog.find({title:body.title}) ;
    //console.log(find) ;
    if(find.length > 0){
      return res.status(400).json({ message: "Blog already exists" });
    }
    

    const response = await Blog.create({
      title: body.title,
      content: body.content,
      name: body.name,
      published: body.published || false,
      // id : body.id,
    });

    res.status(200).json(response);
  } catch (e) {
    //console.log(e);
    res
      .status(500)
      .send({ message: "Internal Server Error (Create Blog)", e: e });
  }
});

routes.put("/:id",check_token,async (req, res) => {
  try {
    const { id } = req.params; // Extracting ID from route parameters
    const body = req.body;

    // Validate input


    // Updating the blog
    const updatedBlog = await Blog.findByIdAndUpdate(id, body, { new: true });

    // If the blog does not exist
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    //console.log(updatedBlog);
    res.status(200).json({ response: updatedBlog });
  } catch (e) {
    //console.error(e);
    res.status(500).json({ message: "Internal Server Error (Update Blog)", error: e.message });
  }
});


module.exports = routes;
