import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Review from '../models/Review.js';
import { validationResult } from 'express-validator';

class OrderController {
  async getOrders(req, res) {
    const query = req.query;
    const perPage = 5;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * perPage;
    const option = query.userId ? { userId: query.userId } : {};
    try {
      const count = await Order.find(option).countDocuments();
      const response = await Order.find(option)
        .populate(
          'productId',
          '-colors -sizes -createdAt -updatedAt -stock -image2 -image3'
        )
        .populate('userId', '-password -updatedAt -createdAt -admin')
        .skip(skip)
        .limit(perPage)
        .sort({ createdAt: -1 });

      return res.status(200).json({ orders: response, perPage, count });
    } catch (error) {
      console.log(error.message);
    }
  }

  async orderDetails(req, res) {
    const { id } = req.params;
    try {
      const details = await Order.findOne({ _id: id })
        .populate(
          'productId',
          '-colors -sizes -createdAt -updatedAt -stock -image2 -image3'
        )
        .populate('userId', '-password -updatedAt -createdAt -admin');
      return res.status(200).json({ details });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ errors: error });
    }
  }

  async updateOrder(req, res) {
    const { id, status } = req.query;

    let option = {};
    if (status === 'delivered') {
      option = { status: true };
    } else if (status === 'received') {
      option = { received: true };
    }
    try {
      await Order.findByIdAndUpdate(id, option, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        msg:
          status === 'delivered'
            ? 'Order is delivered'
            : status === 'received' && 'Order is received',
      });
    } catch (error) {
      return res.status(500).json({ errors: error.message });
    }
  }

  async createRating(req, res) {
    const errors = validationResult(req);
    const { rating, message, user, product, id } = req.body;
    if (errors.isEmpty()) {
      try {
        const createdReview = await Review.create({
          rating: parseInt(rating),
          comment: message,
          product,
          user,
        });

        await Order.findByIdAndUpdate(id, { review: true });
        await Product.findOneAndUpdate(
          { _id: product },
          { $push: { reviews: createdReview._id } }
        );
        return res.status(201).json({ msg: 'Review added successfully!' });
      } catch (error) {
        return res.status(500).json({ errors: error.message });
      }
    } else {
      return res.status(400).json({ errors: errors.array() });
    }
  }
}

export default new OrderController();
