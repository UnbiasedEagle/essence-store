import { body } from 'express-validator';

const productValidations = [
  body('title')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Title is required'),
  body('price')
    .custom((value) => {
      if (Number(value) < 1) {
        throw new Error('Price should be above $1');
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  body('discount')
    .custom((value) => {
      if (Number(value) < 0) {
        throw new Error('Discount should not be negative');
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  body('stock')
    .custom((value) => {
      if (Number(value) < 20) {
        throw new Error('Stock should not be less than 20');
      } else {
        return value;
      }
    })
    .trim()
    .escape(),
  body('category')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Category is required'),
  body('description')
    .not()
    .isEmpty()
    .trim()
    .escape()
    .withMessage('Description is required'),
];

export { productValidations };
