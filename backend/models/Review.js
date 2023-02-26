import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 1,
    },
    comment: {
      type: String,
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Review', ReviewSchema);
