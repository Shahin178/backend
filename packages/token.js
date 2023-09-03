const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY;

  const data = {
    name: user.name,
    userId: user._id,
  };

  const token = jwt.sign(data, jwtSecretKey);
  console.log("\ntokennnn:", token);
  return token;
}

module.exports = { generateToken };
