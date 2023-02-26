import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import currency from 'currency-formatter';
import { getDiscountPrice } from '../../utils/utils';
import { AiFillStar } from 'react-icons/ai';

const ProductCard = ({ prod }) => {
  let result = 0;
  let total = 0;

  if (prod?.reviews?.length > 0) {
    total = prod.reviews.length;
    result =
      prod.reviews.reduce((acc, curr) => {
        return acc + curr.rating;
      }, 0) / total;
  } else {
    total = 0;
    result = 0;
  }
  const finalResult = parseFloat(result).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='w-full px-5 py-10 sm:w-6/12 md:w-4/12 xl:w-3/12'
    >
      <Link to={`/product/${prod._id}`}>
        <div className='w-full'>
          <img
            className='h-[320px] object-cover'
            src={`/images/${prod.image1}`}
            alt='product image1'
          />
        </div>
        <p className='my-2.5 text-base font-medium text-black capitalize'>
          {prod.title}
        </p>
        <div className='flex items-center'>
          <div className='flex items-center mb-1 space-x-2'>
            <span>{finalResult}</span>
            <AiFillStar color='orange' />
            <span>({total})</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-medium text-black'>
            {currency.format(
              getDiscountPrice(prod.price, prod.discount).toFixed(2),
              {
                code: 'INR',
              }
            )}
          </span>
          <span className='text-lg font-medium text-gray-600 line-through'>
            {currency.format(prod.price.toFixed(2), { code: 'INR' })}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
