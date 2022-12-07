const jwt = require('jsonwebtoken');

require('dotenv').config();

const key = process.env.JWT_KEY;
const config = {
  algorithm: 'HS256',
  expiresIn: '3d',
};

module.exports = {
  createToken: (payload) => jwt.sign(payload, key, config),

  validateToken: (token) => {
    try {
      return jwt.verify(token, key);
    } catch (error) {
      return { error: 'INVALID_TOKEN' };
    }
  },
};
