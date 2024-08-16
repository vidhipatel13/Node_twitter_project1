const jwt = require('jsonwebtoken');
const secret = "vidhi"; 

const validateuser = (req,res,next) =>{
    var token = req.headers.authorization;
    if(token){
        if(token.startsWith("Bearer ")){
            token = token.split(" ")[1]
            try{
                const user = jwt.verify(token,secret);
                console.log(user)
                next();
            }catch(err){
                res.status(400).json({
                    mess : "unauthorized token is inviled"
                })
            }
        }else{
            res.status(400).json({
                message:"Unauthorized Token should be Bearer token"
            })
        }
    }else{
        res.status(400).json({
           mess :"Unauthorized,Please provide token in header " 
        })
    }
}

module.exports={
    validateuser
}