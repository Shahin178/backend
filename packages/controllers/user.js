const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = mongoose.model("User");
const { generateToken } = require("../token");

const signup = async (req, res) => {
  try {
    const { name, email, phoneno, password } = req.body;
    const newUserObject = { name, email, phoneno, password };

    const oldUser = await UserModel.findOne({ name });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await UserModel.create(newUserObject);
    console.log("User created:", user);
    return res.status(201).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error while creating user." });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    console.log({ body: req.body });

    if (!(name && password)) {
      // return res
      //   .status(400)
      //   .json({ success: false, data: "All input is required" });
      return;
    }

    const user = await UserModel.findOne({ name });

    if (!(user.password === req.body.password)) {
      // return res.status(401).json("Invalid Credentials");
      return;
    }
    const token = generateToken(user);
    console.log("\n\ntoken:", token);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { login, signup };
