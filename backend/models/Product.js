import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    price: {
      required: true,
      type: Number,
    },
    discount: {
      required: true,
      type: Number,
    },
    stock: {
      required: true,
      type: Number,
    },
    category: {
      type: String,
      required: true,
    },
    colors: {
      type: [Map],
    },
    sizes: {
      type: [Map],
    },
    image1: {
      required: true,
      type: String,
    },
    image2: {
      required: true,
      type: String,
    },
    image3: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Product', ProductSchema);
