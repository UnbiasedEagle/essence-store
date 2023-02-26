import { validationResult } from 'express-validator';
import Category from '../models/Category.js';

class CategoryController {
  async create(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    const isCategoryPresent = await Category.findOne({ name });

    if (isCategoryPresent) {
      return res
        .status(400)
        .json({ errors: [{ msg: `${name} category already exists` }] });
    }

    await Category.create({ name });

    res.status(201).json({ message: 'Your category is created successfully!' });
  }

  async getAll(req, res) {
    const page = Number(req.params.page) || 1;
    const perPage = 3;
    const skip = (page - 1) * perPage;

    const totalCategories = await Category.countDocuments();
    const categories = await Category.find()
      .limit(perPage)
      .skip(skip)
      .sort({ updatedAt: -1 });

    res.status(200).json({ categories, perPage, count: totalCategories });
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);
      if (!category) {
        return res
          .status(404)
          .json({ errors: [{ msg: `category with ${id} not found` }] });
      }

      res.status(200).json({ category });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }

  async update(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const { name } = req.body;

      const isCategoryPresent = await Category.findOne({ name });

      if (isCategoryPresent) {
        return res.status(400).json({
          errors: [{ msg: `category ${name} is already present` }],
        });
      }

      await Category.findByIdAndUpdate(
        id,
        { name },
        {
          new: true,
          runValidators: true,
        }
      );

      res
        .status(200)
        .json({ message: 'Your category is updated successfully!' });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const isCategoryPresent = await Category.findById(id);

      if (!isCategoryPresent) {
        return res.status(404).json({
          errors: [{ msg: `category with id ${id} is not present` }],
        });
      }

      await Category.findByIdAndDelete(id);

      res
        .status(200)
        .json({ message: 'Your category is removed successfully!' });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }

  async allCategories(req, res) {
    try {
      const categories = await Category.find({});
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }

  async getRandomCategory(req, res) {
    try {
      const categories = await Category.aggregate([{ $sample: { size: 3 } }]);
      return res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({
        errors: [{ msg: error.message }],
      });
    }
  }
}

export default new CategoryController();
