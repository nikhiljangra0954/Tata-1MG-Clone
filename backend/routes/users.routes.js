// here we will create all routes for the user register and sign up
// we will intialize the routes first for the user register
// here we will exprort the models for the user register
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()
const { Usermodel } = require('../models/users.model');
const userrouter = express.Router()

userrouter.get("/", async (req, res) => {
 
     try {
        const userdata = await Usermodel.find()
        res.send(userdata)
     } catch (error) {
        console.log(error)
     }
})








userrouter.post("/register", async (req, res) => {
    const { name , email, password } = req.body
    try {
        // here we use bcrypt to protect our password
        bcrypt.hash(password, 5, async (err, secure_pass)=> {
            if(err){
                console.log(err);
            }else{
                // here we send all data to DB with secure password
                const user = new Usermodel({name,email, password: secure_pass});
                await user.save();
                res.send(`${user.name} is registered successfully`);
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({msg: error})
    }
})

// now we will create a login for the user;
// while login we new to change the password and create a new token for the user 
userrouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // first find the user using the email
        const user = await Usermodel.findOne({email});
        const hashpassword = user.password
        // here we change the password
        bcrypt.compare(password, hashpassword, (err, result)=> {
            if(result){
                // here we will create the token
                const token = jwt.sign({userID: user._id}, process.env.key);
                res.send({user:`user ${user.name} loged in successfully`, token: token})
            }else{
                console.log(err)
                res.send({msg:"login failed 1"})
            }
        });
    } catch (error) {
        console.log(error)
        res.send({msg:"login failed 2"})
    }
})


module.exports ={
    userrouter
}