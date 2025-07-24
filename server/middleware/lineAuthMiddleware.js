// backend/middleware/lineAuthMiddleware.js
const jwt = require("jsonwebtoken");

const verifyLineToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Bearer token
  if (!token)
    return res.status(401).json({ message: "Unauthorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ข้อมูล user จาก token
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Token is invalid or expired" });
  }
};

module.exports = verifyLineToken;
