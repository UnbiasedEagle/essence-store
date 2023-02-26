import {
  useParams,
  Link,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import currency from 'currency-formatter';
import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import AccountList from '../../components/home/AccountList';
import Spinner from '../../components/Spinner';
import {
  useGetOrdersQuery,
  useReceivedOrderMutation,
} from '../../store/services/userOrdersService';
import Pagination from '../../components/Pagination';
import { getDiscountPrice } from '../../utils/utils';
import { useVerifyPaymentQuery } from '../../store/services/paymentService';
import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { emptyCart } from '../../store/reducers/cartReducer';

const UserOrders = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const { data: stripeSession, isSuccess } = useVerifyPaymentQuery(sessionId, {
    skip: sessionId ? false : true,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem('cart');
      toast.success(stripeSession.msg);
      dispatch(emptyCart());
      navigate('/orders');
    }
  }, [isSuccess, stripeSession?.msg, dispatch, navigate]);

  let { page } = useParams();
  page = page ? page : 1;
  const { user } = useSelector((state) => state.authReducer);
  const { data, isFetching } = useGetOrdersQuery({ page, userId: user.id });
  const [updateOrder] = useReceivedOrderMutation();
  const orderReceived = (id) => {
    updateOrder(id);
  };

  return (
    <>
      <Nav />
      <div className='mt-[70px]'>
        <Toaster position='top-right' />
        <Header>my orders</Header>
        <div className='custom-container mt-[40px]'>
          <div className='flex flex-wrap -mx-6'>
            <div className='w-full p-6 md:w-4/12'>
              <AccountList />
            </div>
            <div className='w-full p-6 md:w-8/12'>
              <h1 className='mb-6 heading'>orders</h1>
              {!isFetching ? (
                data?.orders?.length > 0 ? (
                  <>
                    <div className='table-container'>
                      <table className='w-full'>
                        <thead>
                          <tr className='thead-tr'>
                            <th className='th'>image</th>
                            <th className='th'>name</th>
                            <th className='th'>total</th>
                            <th className='th'>details</th>
                            <th className='th'>received</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data?.orders.map((item) => {
                            const total = currency.format(
                              getDiscountPrice(
                                item.productId.price,
                                item.productId.discount
                              ) * item.quantities,
                              {
                                code: 'INR',
                              }
                            );
                            return (
                              <tr className='even:bg-gray-50' key={item._id}>
                                <td className='td'>
                                  <img
                                    src={`/images/${item.productId.image1}`}
                                    alt={item.productId.title}
                                    className='object-cover w-12 h-12 rounded-full'
                                  />
                                </td>
                                <td className='font-medium td'>
                                  {item.productId.title}
                                </td>
                                <td className='font-bold td '>{total}</td>
                                <td className='td'>
                                  <Link
                                    to={`/user-order-details/${item._id}`}
                                    className='btn btn-indigo'
                                  >
                                    details
                                  </Link>
                                </td>
                                <td className='td'>
                                  {item.status ? (
                                    item.received ? (
                                      <span className='font-medium capitalize text-emerald-600'>
                                        received
                                      </span>
                                    ) : (
                                      <button
                                        className='btn btn-indigo'
                                        onClick={() => orderReceived(item._id)}
                                      >
                                        confirm received
                                      </button>
                                    )
                                  ) : (
                                    <span className='font-medium capitalize text-rose-600'>
                                      under process
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <Pagination
                      page={parseInt(page)}
                      perPage={data.perPage}
                      count={data.count}
                      path={`/orders`}
                      theme='light'
                    />
                  </>
                ) : (
                  <div className='bg-indigo-50 border border-indigo-100 rounded px-4 py-2.5 capitalize text-indigo-900 text-sm font-medium'>
                    no orders
                  </div>
                )
              ) : (
                <Spinner />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOrders;
