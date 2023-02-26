import express from 'express';
import paymentController from '../controllers/paymentController.js';
import authorization from '../services/authorization.js';

const router = express.Router();

router.post(
  '/create-checkout-session',
  authorization.protect,
  paymentController.paymentProcess
);

router.post(
  '/webhook',
  express.raw({ type: '*/*' }),
  paymentController.checkOutSession
);

router.get(
  '/verify-payment/:id',
  authorization.protect,
  paymentController.paymentVerify
);

export default router;
