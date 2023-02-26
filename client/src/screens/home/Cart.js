import Nav from '../../components/home/Nav';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import currency from 'currency-formatter';
import { getDiscountPrice } from '../../utils/utils';
import Quantity from '../../components/home/Quantity';
import { BsTrash } from 'react-icons/bs';
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from '../../store/reducers/cartReducer';
import { useNavigate } from 'react-router-dom';
import { useSendPaymentMutation } from '../../store/services/paymentService';
import { useEffect } from 'react';

const Cart = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { cart, total } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  const deleteItem = (productId) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      dispatch(removeItem(productId));
    }
  };

  const navigate = useNavigate();

  const [doPayment, doPaymentResponse] = useSendPaymentMutation();

  const pay = () => {
    if (!userToken) {
      navigate('/login');
    } else {
      doPayment({ cart, userId: user.id });
    }
  };

  useEffect(() => {
    if (doPaymentResponse?.isSuccess) {
      window.location.href = doPaymentResponse?.data?.url;
    }
  }, [doPaymentResponse?.data?.url, doPaymentResponse?.isSuccess]);

  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='custom-container mt-28'
      >
        {cart.length > 0 ? (
          <>
            <div className='table-container'>
              <table className='w-full'>
                <thead>
                  <tr className='thead-tr'>
                    <th className='th'>image</th>
                    <th className='th'>name</th>
                    <th className='th'>color</th>
                    <th className='th'>size</th>
                    <th className='th'>price</th>
                    <th className='th'>quantities</th>
                    <th className='th'>total</th>
                    <th className='th'>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const total = currency.format(
                      (
                        getDiscountPrice(item.price, item.discount) *
                        item.quantity
                      ).toFixed(2),
                      {
                        code: 'INR',
                      }
                    );
                    return (
                      <tr className='even:bg-gray-50' key={item._id}>
                        <td className='td'>
                          <img
                            src={`/images/${item.image1}`}
                            alt={item.title}
                            className='object-cover w-12 h-12 rounded-full'
                          />
                        </td>
                        <td className='font-medium td'>{item.title}</td>
                        <td className='td'>
                          <span
                            className='block w-[15px] h-[15px] rounded-full'
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </td>
                        <td className='td'>
                          <span className='font-semibold'>{item.size}</span>
                        </td>
                        <td className='font-bold text-gray-900 td'>
                          {currency.format(
                            getDiscountPrice(item.price, item.discount).toFixed(
                              2
                            ),
                            {
                              code: 'INR',
                            }
                          )}
                        </td>
                        <td className='td'>
                          <Quantity
                            quantity={item.quantity}
                            inc={() => dispatch(incrementQuantity(item._id))}
                            dec={() => dispatch(decrementQuantity(item._id))}
                            theme='indigo'
                          />
                        </td>
                        <td className='font-bold td '>{total}</td>
                        <td className='td'>
                          <span
                            className='cursor-pointer'
                            onClick={() => deleteItem(item._id)}
                          >
                            <BsTrash className='text-rose-600' size={20} />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className='flex justify-end p-4 mt-5 rounded-md bg-indigo-50'>
              <div>
                <span className='mr-10 text-lg font-semibold text-indigo-800'>
                  {currency.format(total.toFixed(2), { code: 'INR' })}
                </span>
                <button
                  disabled={doPaymentResponse.isLoading}
                  className='btn bg-indigo-600 text-sm font-medium py-2.5'
                  onClick={pay}
                >
                  {doPaymentResponse.isLoading
                    ? 'checking out...'
                    : 'check out'}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className='p-4 text-sm font-medium text-indigo-800 border border-indigo-100 rounded-md bg-indigo-50'>
            Cart is empty!
          </div>
        )}
      </motion.div>
    </>
  );
};

export default Cart;
