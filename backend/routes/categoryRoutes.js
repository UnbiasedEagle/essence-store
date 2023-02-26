import express from 'express';
import { categoryValidations } from '../validations/categoryValidations.js';
import categoryController from '../controllers/categoryController.js';
import authorization from '../services/authorization.js';

const router = express.Router();

router.post(
  '/create-category',
  [authorization.protect, categoryValidations],
  categoryController.create
);

router.put(
  '/update-category/:id',
  [authorization.protect, categoryValidations],
  categoryController.update
);

router.get(
  '/categories/:page',
  authorization.protect,
  categoryController.getAll
);

router.get(
  '/fetch-category/:id',
  authorization.protect,
  categoryController.get
);
router.delete(
  '/delete-category/:id',
  authorization.protect,
  categoryController.delete
);

router.get('/all-categories', categoryController.allCategories);

router.get('/random-categories', categoryController.getRandomCategory);

export default router;
