const jwt = require('jsonwebtoken');

module.exports = (req,res,next)=>{
    try{

        console.log("Hello")

        const authHeader = req.header('authorization');


        // console.log(authHeader)
        if(!authHeader) return res.status(400).json({msg:"Access Denied!"})
    
        
        //If Authorization

        if(authHeader.startsWith('Bearer ')){
            //Extracting the bearer token
            const token = authHeader.slice(7);

            console.log("Bearer TokenL: "+token);
            const decoded  = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decoded;
            console.log("Decoded:> ")
            console.log(decoded);
            next();
        }
        
        // return res.status(400).json({msg:"Invalid Token!"});
    }catch(err){
        return res.status(400).json({msg:"Invalid Token!"});
    }
}