import formidable from 'formidable';
import Product from '../models/Product.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { validationResult } from 'express-validator';

class ProductController {
  async create(req, res) {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (!err) {
        const parsedData = JSON.parse(fields.data);
        const errors = [];

        if (parsedData.title.trim().length === 0) {
          errors.push({ msg: 'Title is required' });
        }

        if (Number(parsedData.price) < 1) {
          errors.push({ msg: 'Price should be above $1' });
        }

        if (Number(parsedData.discount) < 0) {
          errors.push({ msg: 'Discount should not be negative' });
        }

        if (Number(parsedData.stock) < 20) {
          errors.push({ msg: 'Stock should be above 20' });
        }

        if (parsedData.category.trim().length === 0) {
          errors.push({ msg: 'Category is required' });
        }

        if (parsedData.description.trim().length === 0) {
          errors.push({ msg: 'Description is required' });
        }

        if (errors.length !== 0) {
          return res.status(400).json({ errors });
        }

        if (!files.image1) {
          errors.push({ msg: 'Image1 is required' });
        }

        if (!files.image2) {
          errors.push({ msg: 'Image2 is required' });
        }

        if (!files.image3) {
          errors.push({ msg: 'Image3 is required' });
        }

        if (errors.length !== 0) {
          return res.status(400).json({ errors });
        }
        const images = {};

        for (const key in files) {
          if (!files[key].mimetype.startsWith('image')) {
            errors.push({ msg: `${key} has invalid extension type` });
            return res.status(400).json({ errors });
          }
          const extension = files[key].mimetype.split('/')[1].toLowerCase();
          const imageName = uuidv4() + `.${extension}`;

          const __dirname = path.resolve();
          const newPath = path.resolve(
            __dirname,
            '../',
            'client',
            'public',
            'images',
            imageName
          );

          images[key] = imageName;

          fs.copyFile(files[key].filepath, newPath, (err) => {
            if (!err) {
              console.log('image uploaded');
            }
          });
        }
        try {
          const response = await Product.create({
            title: parsedData.title,
            price: parseInt(parsedData.price),
            discount: parseInt(parsedData.discount),
            stock: parseInt(parsedData.stock),
            category: parsedData.category,
            colors: parsedData.colors,
            sizes: parsedData.sizes,
            image1: images['image1'],
            image2: images['image2'],
            image3: images['image3'],
            description: parsedData.description,
          });
          return res
            .status(201)
            .json({ message: 'Product is created successfully!', response });
        } catch (error) {
          console.log(error);
          return res.status(500).json(error);
        }
      } else {
        res.status(400).json({ errors: [{ msg: err.message }] });
      }
    });
  }

  async getProducts(req, res) {
    const page = Number(req.params.page) || 1;
    const perPage = 5;
    const skip = (page - 1) * perPage;

    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
      .limit(perPage)
      .skip(skip)
      .sort({ updatedAt: -1 });

    res.status(200).json({ products, perPage, count: totalProducts });
  }

  async get(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: `product with ${id} not found` }] });
      }

      res.status(200).json(product);
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
      const { _id: id } = req.body;

      const response = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      return res
        .status(200)
        .json({ message: 'Product is updated successfully!', response });
    } catch (error) {
      return res.status(400).json({ errors: [{ msg: error.message }] });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ _id: id });
      [1, 2, 3].forEach((number) => {
        const key = `image${number}`;
        const image = product[key];
        const __dirname = path.resolve();
        const imagePath = __dirname + `/../client/public/images/${image}`;
        fs.unlink(imagePath, (err) => {
          if (err) {
            throw new Error(err);
          }
        });
      });
      await Product.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ message: 'Product has been deleted successfully' });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default new ProductController();
