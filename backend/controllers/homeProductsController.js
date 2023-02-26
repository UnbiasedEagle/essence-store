import Product from '../models/Product.js';

class HomeProductsController {
  async get(req, res) {
    let { page, name, keyword } = req.params;

    const options = name
      ? { category: name }
      : keyword && { title: { $regex: keyword, $options: 'i' } };

    if (page) {
      page = Number(page);
      const perPage = 5;
      const skip = (page - 1) * perPage;

      const totalProducts = await Product.countDocuments({
        ...options,
        stock: { $gt: 0 },
      });
      const products = await Product.find({
        ...options,
        stock: { $gt: 0 },
      })
        .limit(perPage)
        .skip(skip)
        .populate('reviews')
        .sort({ updatedAt: -1 });

      res.status(200).json({ products, perPage, count: totalProducts });
    } else {
      const response = await Product.find({
        ...options,
        stock: { $gt: 0 },
      })
        .limit(4)
        .populate('reviews')
        .sort({ updatedAt: -1 });

      res.status(200).json({ products: response });
    }
  }
}

export default new HomeProductsController();
