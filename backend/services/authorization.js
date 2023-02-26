import jwt from 'jsonwebtoken';
import envConfig from '../config/envConfig.js';

class Authorization {
  protect(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        errors: [{ msg: 'Unauthorized, invalid token' }],
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        errors: [{ msg: 'Unauthorized, invalid token' }],
      });
    }

    const verified = jwt.verify(token, envConfig.JWT_SECRET);

    if (!verified) {
      return res.status(401).json({
        errors: [{ msg: 'Unauthorized, invalid token' }],
      });
    }

    next();
  }
}

export default new Authorization();
