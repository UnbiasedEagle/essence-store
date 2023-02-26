import { BsPlus } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillCheckCircle } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import ScreenHeader from '../../components/ScreenHeader';
import { useEffect } from 'react';
import { clearMessage, setSuccess } from '../../store/reducers/globalReducer';
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../../store/services/categoryService';
import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import Wrapper from '../../components/Wrapper';

const Categories = () => {
  const { success } = useSelector((state) => state.globalReducer);

  const dispatch = useDispatch();

  let { page } = useParams();

  if (!page) {
    page = 1;
  }

  const { data, isFetching } = useGetCategoriesQuery(page);
  const [deleteCategory, deleteCategoryResults] = useDeleteCategoryMutation();

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(clearMessage());
      }, 3000);
    }
  }, [success, dispatch]);

  const handleDeleteCategoryClick = (id) => {
    if (window.confirm('Are you sure you want to delete the category?')) {
      deleteCategory(id);
    }
  };

  useEffect(() => {
    if (deleteCategoryResults.isSuccess) {
      dispatch(setSuccess(deleteCategoryResults?.data?.message));
    }
  }, [
    deleteCategoryResults?.isSuccess,
    deleteCategoryResults?.data?.message,
    dispatch,
  ]);

  const renderCategories = () => {
    return (
      <>
        <div>
          <table className='w-full bg-gray-900 rounded-md'>
            <thead>
              <tr className='text-left border-b border-gray-800'>
                <th className='p-3 text-sm font-medium text-gray-500 uppercase'>
                  name
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
              {data.categories.map((category) => {
                return (
                  <tr className='odd:bg-gray-800' key={category._id}>
                    <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                      {category.name}
                    </td>
                    <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                      <Link
                        className='btn btn-warning'
                        to={`/dashboard/update-category/${category._id}`}
                      >
                        Edit
                      </Link>
                    </td>
                    <td className='p-3 text-sm font-normal text-gray-400 capitalize'>
                      <button
                        onClick={() => handleDeleteCategoryClick(category._id)}
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
        <Pagination
          path='/dashboard/categories'
          page={Number(page)}
          perPage={data.perPage}
          count={data.count}
        />
      </>
    );
  };

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className='btn-dark' to='/dashboard/create-category'>
          <span className='inline-block align-middle'>add categories</span>
          <BsPlus className='inline-block ml-1 text-2xl align-middle' />
        </Link>
      </ScreenHeader>
      {success && (
        <Alert className='text-indigo-900 bg-indigo-100 border-l-indigo-600'>
          <AiFillCheckCircle className='mr-1 text-2xl text-indigo-500' />
          <span className='text-base'>{success}</span>
        </Alert>
      )}
      {!isFetching ? (
        data?.categories?.length > 0 && renderCategories()
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Categories;
