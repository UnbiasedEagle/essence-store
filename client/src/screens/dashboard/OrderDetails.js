import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Spinner from '../../components/Spinner';
import Wrapper from '../../components/Wrapper';
import {
  useDeliverOrderMutation,
  useDetailsQuery,
} from '../../store/services/orderService';
import moment from 'moment';
import currency from 'currency-formatter';
import { getDiscountPrice } from '../../utils/utils';
import ReactToPrint from 'react-to-print';
import { useRef } from 'react';
import { BsPrinter } from 'react-icons/bs';

const OrderDetails = () => {
  const { id } = useParams();

  const { data, isFetching } = useDetailsQuery(id);

  const componentRef = useRef();

  const total =
    getDiscountPrice(
      data?.details?.productId?.price,
      data?.details?.productId?.discount
    ) * data?.details?.quantities;

  const [sentUserOrder, response] = useDeliverOrderMutation();

  const sentOrder = () => {
    sentUserOrder(data?.details?._id);
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <div className='flex items-center'>
          <Link to='/dashboard/orders'>
            <MdOutlineKeyboardBackspace />
          </Link>
          <span className='ml-4'> Order Details</span>
          <span className='ml-4'>
            <ReactToPrint
              trigger={() => (
                <button className='flex items-center px-3 py-1 text-sm font-semibold bg-indigo-600 btn'>
                  <BsPrinter /> <span className='ml-2'>print</span>
                </button>
              )}
              content={() => componentRef.current}
            />
          </span>
          <span className='ml-4'>
            {!isFetching && !data?.details?.status && (
              <button
                className='px-3 py-1 text-sm font-semibold bg-orange-600 btn'
                onClick={sentOrder}
              >
                {response?.isLoading ? 'Loading...' : 'Deliver'}
              </button>
            )}
          </span>
        </div>
      </ScreenHeader>
      {isFetching ? (
        <Spinner />
      ) : (
        <div ref={componentRef}>
          <h3 className='text-gray-400 capitalize'>
            order number:
            <span className='ml-4 text-lg text-gray-300'>
              #{data?.details?._id}
            </span>
          </h3>
          <h3 className='mt-2 text-gray-400 capitalize'>
            order date:{' '}
            <span className='ml-4 text-sm text-gray-300'>
              {moment(data?.details?.createdAt).format('MMMM Do YYYY')}
            </span>
          </h3>
          {data?.details?.received && (
            <h3 className='mt-2 text-gray-400 capitalize'>
              received date:{' '}
              <span className='ml-4 text-sm text-gray-300'>
                {moment(data?.details?.updatedAt).format('MMMM Do YYYY')}
              </span>
            </h3>
          )}
          <div className='flex flex-wrap -mx-5'>
            <div className='w-full p-5 md:w-8/12'>
              <div className='overflow-x-auto'>
                <table className='bg-transparent rounded-none md:rounded-md dashboard-table'>
                  <thead>
                    <tr className='dashboard-tr'>
                      <th className='dashboard-th'>image</th>
                      <th className='dashboard-th'>quantities</th>
                      <th className='dashboard-th'>price</th>
                      <th className='dashboard-th'>size</th>
                      <th className='dashboard-th'>color</th>
                      <th className='dashboard-th'>total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='dashboard-td'>
                        <img
                          src={`/images/${data?.details?.productId?.image1}`}
                          alt='image1'
                          className='w-[50px] h-[50px] rounded-full object-cover'
                        />
                      </td>
                      <td className='dashboard-td'>
                        {data?.details?.quantities}
                      </td>
                      <td className='dashboard-td'>
                        {currency.format(
                          getDiscountPrice(
                            data?.details?.productId?.price,
                            data?.details?.productId?.discount
                          ),
                          { code: 'INR' }
                        )}
                      </td>
                      <td className='dashboard-td'>
                        {data?.details?.size ? data?.details?.size : 'No size'}
                      </td>
                      <td className='dashboard-td'>
                        <span
                          className='block w-[15px] h-[15px] rounded-full'
                          style={{ background: data?.details?.color }}
                        ></span>
                      </td>
                      <td className='dashboard-td'>
                        {currency.format(total, { code: 'INR' })}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='w-full p-5 md:w-4/12'>
              <div className='p-4 border border-gray-600 rounded-none md:rounded-md'>
                <div className='pb-3 border-b border-b-gray-600'>
                  <h4 className='text-base text-gray-500 capitalize'>
                    customer name
                  </h4>
                  <span className='mt-2 text-base font-medium text-gray-400 capitalize'>
                    {data?.details?.userId?.name}
                  </span>
                </div>
                <div className='pb-3 border-b border-b-gray-600'>
                  <h4 className='text-base text-gray-500 capitalize'>
                    product name
                  </h4>
                  <span className='mt-2 text-base font-medium text-gray-400 capitalize'>
                    {data?.details?.productId?.title}
                  </span>
                </div>

                <div>
                  <h4 className='mt-2 text-base text-gray-500 capitalize'>
                    shipping address
                  </h4>
                  <div className='mt-2'>
                    <span className='block text-gray-400 capitalize'>
                      {data?.details?.address?.city}
                    </span>
                    <span className='block text-gray-400 capitalize'>
                      {data?.details?.address?.line1}
                    </span>
                    <span className='block text-gray-400 capitalize'>
                      {data?.details?.address?.line2}
                    </span>
                    <span className='block text-gray-400 capitalize'>
                      {data?.details?.address?.postal_code}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default OrderDetails;
