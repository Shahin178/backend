const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");
const port = 4000;
const host = "localhost";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const userRoute = require("./routes/userRoutes");

app.use("/api/user", userRoute);

app.listen(port, () => {
  console.log(`Listening at http://${host}:${port}`);
});
