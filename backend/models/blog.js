const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default : false,
  },
  name:{
    type:String,
    required: true,
  },


},
{ timestamps: true } 
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;