

const jwt = require('jsonwebtoken') ;

const JWT_SECRET = "ABC";


const generate_token = (payload) =>{
    //console.log(payload) ;

       const token = jwt.sign( payload, JWT_SECRET) ;    
        return token ;
    
}



const check_token = (req,res,next) =>{

  
    try{
    const token = req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(404).json({msg : "token not found"}) ;
   }

   const decoded = jwt.verify(token, JWT_SECRET) ;

   if (!decoded) {
    return res.status(401).json({ message: "Unauthorized", status: 401 });
  }

    
    req.name = decoded.name;
    
  next();
}catch(e){
    //console.log(e);
    return res.status(500).json({ message: "Unauthorized", status: 500 });
   
}
  


}

module.exports = {generate_token, check_token} ;