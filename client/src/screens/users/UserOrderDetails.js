import { useParams, useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import currency from 'currency-formatter';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import moment from 'moment';
import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import AccountList from '../../components/home/AccountList';
import { useDetailsQuery } from '../../store/services/userOrdersService';
import Spinner from '../../components/Spinner';
import DetailsList from '../../components/DetailsList';
import { getDiscountPrice } from '../../utils/utils';
import ReviewForm from '../../components/ReviewForm';
import toast, { Toaster } from 'react-hot-toast';

const UserOrderDetails = () => {
  const [state, setState] = useState(false);

  const toggleReview = useCallback((message) => {
    setState((prev) => {
      if (message) {
        toast.success(message);
      }
      return !prev;
    });
  }, []);

  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching } = useDetailsQuery(id);

  const total = currency.format(
    getDiscountPrice(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities,
    {
      code: 'INR',
    }
  );

  return (
    <>
      <ReviewForm state={state} data={data} toggleReview={toggleReview} />
      <Nav />
      <Toaster position='top-right' />
      <div className='mt-[70px]'>
        <Header>order details</Header>
        <div className='custom-container mt-[40px]'>
          <div className='flex flex-wrap -mx-6'>
            <div className='w-full p-6 md:w-4/12'>
              <AccountList />
            </div>
            <div className='w-full p-6 md:w-8/12'>
              <h1 className='flex items-center heading'>
                <MdOutlineKeyboardBackspace
                  className='text-gray-500 cursor-pointer'
                  onClick={() => navigate(-1)}
                />{' '}
                <span className='ml-5'>details</span>
              </h1>
              {!isFetching ? (
                <div className='flex flex-col flex-wrap my-5 md:flex-row'>
                  <div className='w-[130px] md:w-[160px] h-[130px] md:h-[160px] overflow-hidden'>
                    <img
                      src={`/images/${data?.details?.productId?.image1}`}
                      alt=''
                      className='object-cover w-full h-full rounded-md'
                    />
                  </div>
                  <div className='flex-1 my-4 md:my-0 md:ml-4'>
                    <DetailsList
                      label='order number'
                      data={data?.details?._id}
                    />
                    <DetailsList
                      label='product name'
                      data={data?.details?.productId?.title}
                    />
                    <DetailsList
                      label='order received'
                      data={data?.details?.received ? 'Yes' : 'No'}
                    />
                    <DetailsList
                      label='order date'
                      data={moment(data?.details?.createdAt).format(
                        'MMMM Do YYYY'
                      )}
                    />
                    {data?.details?.received && (
                      <DetailsList
                        label='received date'
                        data={moment(data?.details?.updatedAt).format(
                          'MMMM Do YYYY'
                        )}
                      />
                    )}
                    {data?.details?.received && !data?.details?.review && (
                      <div className='flex items-center justify-end mt-2'>
                        <button
                          className='btn-indigo rounded !py-2 !text-sm'
                          onClick={() => toggleReview()}
                        >
                          add reivew
                        </button>
                      </div>
                    )}

                    <div className='mt-4 overflow-x-auto'>
                      <table className='w-full'>
                        <thead>
                          <tr className='thead-tr'>
                            <th className='th'>color</th>
                            <th className='th'>size</th>
                            <th className='th'>price</th>
                            <th className='th'>quantities</th>
                            <th className='th'>total</th>
                            <th className='th'>delivered</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className='even:bg-gray-50'>
                            <td className='td'>
                              <span
                                className='block w-[15px] h-[15px] rounded-full'
                                style={{
                                  backgroundColor: data?.details?.color,
                                }}
                              ></span>
                            </td>
                            <td className='td'>{data?.details?.size}</td>
                            <td className='td'>
                              {currency.format(
                                getDiscountPrice(
                                  data?.details?.productId?.price,
                                  data?.details?.productId?.discount
                                ),
                                {
                                  code: 'INR',
                                }
                              )}
                            </td>
                            <td className='td'>{data?.details?.quantities}</td>
                            <td className='td'>{total}</td>
                            <td className='td'>
                              {data?.details?.status ? 'Yes' : 'No'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
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

export default UserOrderDetails;
