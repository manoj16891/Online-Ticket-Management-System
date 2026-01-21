
const jwt = require('jsonwebtoken');

exports.generatetoken = (user) => {
  return jwt.sign({
    id: user._id,
    role: user.role
  }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}