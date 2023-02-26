import { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ScreenHeader from '../../components/ScreenHeader';
import Wrapper from '../../components/Wrapper';
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from '../../store/services/productService';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';

const Products = () => {
  const { success } = useSelector((state) => state.globalReducer);

  let { page } = useParams();

  if (!page) {
    page = 1;
  }

  const { data = [], isFetching } = useGetProductsQuery(page);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch(clearMessage());
    }
  }, [success, dispatch]);

  const [deleteProduct, deleteProductResults] = useDeleteProductMutation();

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete the product?')) {
      deleteProduct(productId);
    }
  };

  useEffect(() => {
    if (deleteProductResults.isSuccess) {
      dispatch(setSuccess(deleteProductResults?.data?.message));
    }
  }, [
    deleteProductResults?.isSuccess,
    deleteProductResults?.data?.message,
    dispatch,
  ]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className='btn-dark' to='/dashboard/create-product'>
          <span className='inline-block align-middle'>create product</span>
          <BsPlus className='inline-block ml-1 text-2xl align-middle' />
        </Link>
      </ScreenHeader>
      <Toaster position='top-right' reverseOrder={true} />
      {isFetching ? (
        <Spinner />
      ) : (
        data?.products?.length > 0 && (
          <div>
            <table className='w-full bg-gray-900 rounded-md'>
              <thead>
                <tr className='text-left border-b border-gray-800'>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    name
                  </th>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    price
                  </th>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    stock
                  </th>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    image
                  </th>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    edit
                  </th>
                  <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                    delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product) => {
                  return (
                    <tr className='odd:bg-gray-800' key={product._id}>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        {product.title}
                      </td>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        ${product.price}
                      </td>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        {product.stock}
                      </td>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        <img
                          src={`/images/${product.image1}`}
                          alt='image1'
                          className='object-cover w-20 h-20 rounded-md'
                        />
                      </td>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        <Link
                          className='btn btn-warning'
                          to={`/dashboard/edit-product/${product._id}`}
                        >
                          Edit
                        </Link>
                      </td>
                      <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className='btn btn-danger'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      )}
      <Pagination
        path='/dashboard/products'
        page={Number(page)}
        perPage={data.perPage}
        count={data.count}
      />
    </Wrapper>
  );
};

export default Products;
