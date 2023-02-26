import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/envConfig.js';

const getHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const getJWTToken = (payload) => {
  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: '7d',
  });

  return token;
};

const comparePassword = async (candidatePassword, hashedPassword) => {
  return await bcrypt.compare(candidatePassword, hashedPassword);
};

export { getHashedPassword, getJWTToken, comparePassword };
