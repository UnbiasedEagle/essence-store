import currency from 'currency-formatter';
import html2plaintext from 'html2plaintext';
import { useState } from 'react';
import { BsCheck2 } from 'react-icons/bs';
import { getDiscountPrice } from '../../utils/utils';
import htmlParser from 'html-react-parser';
import DetailsImage from './DetailsImage';
import Quantity from './Quantity';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/reducers/cartReducer';

const DetailCard = ({ product }) => {
  const [sizeState, setSizeState] = useState(
    product?.sizes?.length > 0 ? product.sizes[0].name : ''
  );

  const [colorState, setColorState] = useState(
    product?.colors?.length > 0 ? product.colors[0].color : ''
  );

  const [quantity, setQuantity] = useState(1);

  const inc = () => {
    setQuantity(quantity + 1);
  };

  const dec = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const dispatch = useDispatch();

  const handleAddCartClick = () => {
    const currentProduct = {
      ...product,
      size: sizeState,
      color: colorState,
      quantity,
    };
    delete currentProduct.colors;
    delete currentProduct.sizes;
    delete currentProduct.createdAt;
    delete currentProduct.updatedAt;

    const cart = localStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];

    const itemAlreadyInCart = cartItems.find(
      (item) => item._id === currentProduct._id
    );

    if (itemAlreadyInCart) {
      toast.error(`${currentProduct.title} is already in cart`);
      return;
    }

    cartItems.push(currentProduct);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    toast.success('Item added to cart');
    dispatch(addToCart(currentProduct));
  };

  let desc = html2plaintext(product.description);
  desc = htmlParser(desc);

  return (
    <>
      <Toaster />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='flex flex-wrap -mx-5'
      >
        <div className='order-2 w-full p-5 md:order-1 md:w-6/12'>
          <div className='flex flex-wrap -mx-1'>
            <DetailsImage image={product.image1} />
            <DetailsImage image={product.image2} />
            <DetailsImage image={product.image3} />
          </div>
        </div>
        <div className='order-1 w-full p-5 md:order-2 md:w-6/12'>
          <h1 className='text-2xl font-bold text-gray-900 capitalize'>
            {product.title}
          </h1>
          <div className='flex justify-between my-5'>
            <span className='text-2xl font-bold text-gray-900'>
              {currency.format(
                getDiscountPrice(product.price, product.discount).toFixed(2),
                { code: 'INR' }
              )}
            </span>
            <span className='text-xl text-gray-500 line-through'>
              {currency.format(product.price.toFixed(2), { code: 'INR' })}
            </span>
          </div>
          {product.sizes.length > 0 && (
            <>
              <h3 className='mb-3 text-base font-medium text-gray-600 capitalize'>
                sizes
              </h3>
              <div className='flex flex-wrap -mx-1'>
                {product.sizes.map((size) => (
                  <div
                    className={`p-2 m-1 border border-gray-300 rounded cursor-pointer ${
                      sizeState === size.name && 'bg-indigo-600'
                    }`}
                    key={size.name}
                    onClick={() => setSizeState(size.name)}
                  >
                    <span
                      className={`text-sm font-semibold uppercase  ${
                        sizeState === size.name ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {size.name}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
          {product.colors.length > 0 && (
            <>
              <h3 className='mt-3 mb-2 text-base font-medium text-gray-600 capitalize'>
                colors
              </h3>
              <div className='flex flex-wrap -mx-1'>
                {product.colors.map((color) => (
                  <div
                    key={color.color}
                    onClick={() => setColorState(color.color)}
                    className='p-1 m-1 border border-gray-300 rounded cursor-pointer'
                  >
                    <span
                      className='min-w-[40px] min-h-[40px] rounded flex items-center justify-center'
                      style={{ backgroundColor: color.color }}
                    >
                      {colorState === color.color && (
                        <BsCheck2 className='text-white' size={20} />
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
          <div className='flex items-center -mx-3'>
            <div className='w-full p-3 sm:w-6/12'>
              <Quantity quantity={quantity} inc={inc} dec={dec} />
            </div>
            <div className='w-full p-3 sm:w-6/12'>
              <button className='btn btn-indigo' onClick={handleAddCartClick}>
                add to cart
              </button>
            </div>
          </div>
          <h3 className='mt-3 mb-2 text-base font-medium text-gray-600 capitalize'>
            description
          </h3>
          <div className='mt-4 leading-[27px] description'>{desc}</div>
        </div>
      </motion.div>
    </>
  );
};

export default DetailCard;
