const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const tkn = req.header("Authorization");
    console.log("Token received:", tkn);

    if (!tkn) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const token = tkn.split(" ")[1];

    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    console.log("JWT Secret Key:", jwtSecretKey);

    jwt.verify(token, jwtSecretKey, (err, decoded) => {
      if (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ error: "Invalid token." });
      }
      req.user = decoded;
      console.log("req.user:  ", req.user);
      next();
    });
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    return res.status(401).json({ error: "Invalid token." });
  }
}

module.exports = authMiddleware;
