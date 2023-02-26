import { validationResult } from 'express-validator';
import User from '../models/User.js';
import {
  comparePassword,
  getHashedPassword,
  getJWTToken,
} from '../services/authServices.js';

// @route POST /api/register
// @access Public
// @desc Create user and return a token
const register = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { name, email, password } = req.body;

    try {
      const emailExist = await User.findOne({ email });

      if (!emailExist) {
        const hashedPassword = await getHashedPassword(password);

        const user = await User.create({
          name,
          email,
          password: hashedPassword,
        });

        const token = getJWTToken({ id: user._id, name: user.name });

        return res
          .status(201)
          .json({ msg: 'Your account has been created!', token });
      } else {
        // email already taken
        return res.status(401).json({
          errors: [{ msg: `${email} already exists`, param: 'email' }],
        });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: 'Internal server error!' });
    }
  } else {
    // validation failed
    return res.status(400).json({ errors: errors.array() });
  }
};

// @route POST /api/login
// @access Public
// @desc Login user and return a token
const login = async (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({
          errors: [
            { msg: `Invalid email or password`, param: 'email' },
            { msg: `Invalid email or password`, param: 'password' },
          ],
        });
      }

      const matchPassword = await comparePassword(password, user.password);

      if (!matchPassword) {
        return res.status(401).json({
          errors: [
            { msg: `Invalid email or password`, param: 'email' },
            { msg: `Invalid email or password`, param: 'password' },
          ],
        });
      }

      const token = getJWTToken({ id: user._id, name: user.name });

      if (user.admin) {
        return res.status(200).json({ token, admin: true });
      } else {
        return res.status(200).json({ token, admin: false });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ msg: 'Internal server error!' });
    }
  } else {
    // validation failed
    return res.status(400).json({ errors: errors.array() });
  }
};

export { register, login };
