const jwt = require('jsonwebtoken');
const env = require('../config/env');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token missing' });
  }

  jwt.verify(token, env.jwt.secret, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid or expired access token' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  authenticateToken,
};
