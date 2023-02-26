import { body } from 'express-validator';

const ratingValidations = [
  body('rating')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('rating is required'),
];

export { ratingValidations };
