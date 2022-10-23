require('dotenv').config();
const User = require('../models/User');
const cryptojs = require('crypto-js');
const { createToken } = require('../middleware/jwt');

const Register = async (req, res)=>{

    const newuser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      status: req.body.status,
      role: req.body.role,
      password: cryptojs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    try {
        const saveuser = await newuser.save();
        res.status(200).json(saveuser);
    } catch (err) {
        res.status(500).json({message: `Error registering the user: ${err}`})
    }
}



const Login = async (req, res)=>{
    try {
        const user = await User.findOne({ email: req.query.email });
        if(!user) return res.status(401).json({message: "Account doesn't exist!"});

        const hashedPassword = cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptojs.enc.Utf8);
        if (hashedPassword !== req.query.password)
          return res.status(401).json({ message: "Wrong Credentials!" });

        const token = createToken(user);
        const { password, ...userData } = user._doc; 
        res.status(200).json({...userData, token});

    } catch (err) {
        res.status(500).json({message: `Error Login! : ${err}`});
    }
}


module.exports = { Register, Login };