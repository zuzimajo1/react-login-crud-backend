require('dotenv').config();
const jwt = require('jsonwebtoken');

//CreateToken when Login In
const createToken = (user) => jwt.sign({email: user.email, firstname: user.firstname, lastname: user.lastname, isAdmin: user.isAdmin}, process.env.JWT_SEC);




module.exports = { createToken };
