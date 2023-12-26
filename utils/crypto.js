const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateRandomHexString = (length = 32, encoding = 'hex') => {
  return crypto.randomBytes(length).toString(encoding);
};

const signJWT = (tokenData, expiresIn = '1800s') => {
  return jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn });
};

const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const hashPasswordSync = (password, saltRounds = 10) => {
  return bcrypt.hashSync(password, saltRounds);
};

const verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};

module.exports = {
  generateRandomHexString,
  signJWT,
  comparePassword,
  hashPasswordSync,
  verifyJWT,
};
