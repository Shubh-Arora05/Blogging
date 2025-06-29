const express = require('express');
// const { Route } = require('react-router');
const User= require('./../models/user') ;
const {generate_token, check_token} = require('../jwt') ;
const jwt = require('jsonwebtoken') ;
const JWT_SECRET =  "ABC"; ;

const routes = express.Router();


// app.use()


routes.post('/signup', async(req, res)=>{
        
    try{ 
    console.log("fbhkrker")
    const body = await req.body ;
 
 
   const token =  generate_token({password : body.password , 
    name:  body.name , username : body.username 
   }  , JWT_SECRET) ;
    
   const user = await User.create({
        name: body.name,
        username: body.username,
        password:body.password
    });

    return res.status(200).json({user, token});
}
catch(error){ 
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
}

})


routes.post('/signin', async(req, res)=>{
        
    try{
    const body = await req.body ;
   

   const response = await User.findOne({
    username: body.username
   })

   if(!response){
    return res.status(401).json({ message: 'Invalid username or password' });
   }

   const isMatch = await response.comparePassword(body.password) ;
   if(!isMatch){
    return res.status(401).json({ message: 'Invalid username or password' });
   }




   const token = generate_token({password : body.password , 
    name:  body.name
   }  , JWT_SECRET) ;
    

    return res.status(200).json({token});
}
catch(error){
    //console.error(error);
    return res.status(500).json({ message: 'Server error' });
}

})



module.exports = routes;