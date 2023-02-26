import express from 'express';
import homeProductsController from '../controllers/homeProductsController.js';
import productController from '../controllers/productController.js';
import authorization from '../services/authorization.js';
import { productValidations } from '../validations/productValidations.js';

const router = express.Router();

router.post('/create-product', authorization.protect, productController.create);

router.put(
  '/product',
  [authorization.protect, productValidations],
  productController.update
);

router.get('/search-products/:keyword/:page?', homeProductsController.get);

router.get('/cat-products/:name/:page?', homeProductsController.get);

router.delete(
  '/product/:id',
  authorization.protect,
  productController.deleteProduct
);

router.get('/product/:id', productController.get);

router.get(
  '/products/:page',
  authorization.protect,
  productController.getProducts
);

export default router;
