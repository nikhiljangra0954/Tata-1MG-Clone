const express = require("express");
const { Usermodel } = require("../models/user.model.js");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

userRouter.post("/register", async (req, res) => {
  const { email, password, name, age } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, secure_password) => {
      if (err) {
        console.log(err);
      } else {
        const user = new Usermodel({
          email,
          password: secure_password,
          name,
          age,
        });
        await user.save();
        console.log(user);
        res.send(`Registered`);
      }
    });
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usermodel.find({ email });
    const hashed_password = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashed_password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "masai");
          res.send({ msg: "Login Successfull", token: token });
        } else {
          res.send({ msg: "Login Failed" });
        }
      });
    } else {
      res.send(`Wrong Details`);
    }
  } catch (error) {
    console.log(error);
    res.send(`Error: ${error}`);
  }
});

module.exports = {
  userRouter,
};
