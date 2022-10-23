require('dotenv').config();
const jwt = require('jsonwebtoken');

//CreateToken when Login In
const createToken = (user) => jwt.sign({ isAdmin: user.isAdmin}, process.env.JWT_SEC);

const verifyToken = async (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
            if(err) return res.status(403).json({message: "Token is not valid"});
            user.isAdmin && next();
        });
    
    }else{
        return res.status(401).json({message: "There is no token!"})
    }
}


module.exports = { createToken, verifyToken };
