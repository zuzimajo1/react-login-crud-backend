require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const cryptojs = require('crypto-js');

const Register = async (req, res)=>{

    const newuser = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: cryptojs.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    try {
        const saveuser = await newuser.save();
        const { password, ...others } = saveuser._doc;
        res.status(200).json({ ...others });
    } catch (error) {
        res.status(500).json(error)
    }
}



const Login = async (req, res)=>{
    try {
        const user = await User.findOne({ email: req.query.email });
        if(!user) return res.status(401).json("Wrong Credentials");

        const hashedPassword = cryptojs.AES.decrypt(user.password, process.env.SECRET_KEY).toString(cryptojs.enc.Utf8);
        if(hashedPassword !== req.query.password) return res.status(401).json("Wrong Password");

        const {password, ...others } = user._doc;
        res.status(200).json({...others});

    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = { Register, Login };