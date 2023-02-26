import { body } from 'express-validator';

const registerValidations = [
  body('name').not().isEmpty().trim().escape().withMessage('Name is required'),
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password should be atleast 6 characters long'),
];

const loginValidations = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .escape()
    .withMessage('Email is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
];

export { registerValidations, loginValidations };
