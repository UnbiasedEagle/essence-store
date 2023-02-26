import { useEffect, useState } from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import ScreenHeader from '../../components/ScreenHeader';
import Spinner from '../../components/Spinner';
import Wrapper from '../../components/Wrapper';
import { setSuccess } from '../../store/reducers/globalReducer';
import {
  useFetchCategoryQuery,
  useUpdateCategoryMutation,
} from '../../store/services/categoryService';

const UpdateCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const { id } = useParams();

  const { data, isFetching } = useFetchCategoryQuery(id);

  const [updateCategory, updateCategoryResults] = useUpdateCategoryMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    updateCategory({ name: categoryName, id });
  };

  useEffect(() => {
    if (data?.category) {
      setCategoryName(data?.category?.name);
    }
  }, [data?.category]);

  useEffect(() => {
    if (updateCategoryResults?.isSuccess) {
      dispatch(setSuccess(updateCategoryResults?.data?.message));
      navigate('/dashboard/categories');
    }
  }, [
    updateCategoryResults?.isSuccess,
    navigate,
    updateCategoryResults?.data?.message,
    dispatch,
  ]);

  const errors = updateCategoryResults?.error?.data?.errors || [];

  const renderedErrors = errors.map((error, key) => {
    return (
      <Alert key={key} className='text-rose-700 bg-rose-100 border-l-rose-600'>
        <MdOutlineErrorOutline className='mr-1 text-2xl text-rose-700' />
        <span className='text-base'>{error.msg}</span>
      </Alert>
    );
  });

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className='btn-dark' to='/dashboard/categories'>
          <BsArrowLeftShort className='inline-block mr-1 text-2xl align-middle' />
          <span className='inline-block align-middle'>categories list</span>
        </Link>
      </ScreenHeader>
      {isFetching ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit} className='w-full md:w-8/12'>
          <h3 className='mb-3 text-lg capitalize'>update category</h3>
          {errors.length > 0 && renderedErrors}
          <div className='mb-3'>
            <input
              type='text'
              className='form-control'
              placeholder='Category Name'
              value={categoryName}
              onChange={handleChange}
            />
          </div>
          <div className='mb-3'>
            <button className='btn btn-indigo' type='submit'>
              update
            </button>
          </div>
        </form>
      )}
    </Wrapper>
  );
};

export default UpdateCategory;
