const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.protect = (req, res, next) => {
  let token = null;

  // If token is in Authorization header as Bearer token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { userId: '...' }
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed" });
  }
};
