const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
  
});

userSchema.pre('save',async function(next){
  

  if (!this.isModified("password")) {
    return next();
  }

  try{

  const salt = await  bcrypt.genSalt(10) ;
  const hashedpassword = await bcrypt.hash(this.password, salt) ;
  this.password = hashedpassword ;
  }catch(e){
    return next(e);
  }


})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
