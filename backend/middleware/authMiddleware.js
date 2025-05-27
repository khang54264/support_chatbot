// filepath: d:\DATN\supportchatbot\backend\middleware\authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your-secret-key');
    req.user = decoded; // Attach user information to the request
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;