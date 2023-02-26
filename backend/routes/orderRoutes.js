import express from 'express';
import orderController from '../controllers/orderController.js';
import authorization from '../services/authorization.js';
import { ratingValidations } from '../validations/ratingValidation.js';
const router = express.Router();

router.get('/orders', authorization.protect, orderController.getOrders);

router.put('/order-update', authorization.protect, orderController.updateOrder);

router.post(
  '/add-review',
  [authorization.protect, ratingValidations],
  orderController.createRating
);

router.get(
  '/order-details/:id',
  authorization.protect,
  orderController.orderDetails
);

export default router;
