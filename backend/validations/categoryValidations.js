import { body } from 'express-validator';

const categoryValidations = [
  body('name')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Category is required'),
];

export { categoryValidations };
