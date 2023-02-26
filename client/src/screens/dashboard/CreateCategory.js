import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Alert from '../../components/Alert';
import ScreenHeader from '../../components/ScreenHeader';
import { useCreateCategoryMutation } from '../../store/services/categoryService';
import { useDispatch } from 'react-redux';
import { setSuccess } from '../../store/reducers/globalReducer';
import Wrapper from '../../components/Wrapper';

const CreateCategory = () => {
  const [categoryName, setCategoryName] = useState('');

  const [createCategory, createCategoryResults] = useCreateCategoryMutation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createCategory({ name: categoryName });
  };

  useEffect(() => {
    if (createCategoryResults?.isSuccess) {
      dispatch(setSuccess(createCategoryResults?.data?.message));
      navigate('/dashboard/categories');
    }
  }, [
    createCategoryResults?.isSuccess,
    navigate,
    createCategoryResults?.data?.message,
    dispatch,
  ]);

  const errors = createCategoryResults?.error?.data?.errors || [];

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
      <form onSubmit={handleSubmit} className='w-full md:w-8/12'>
        <h3 className='mb-3 text-lg capitalize'>create category</h3>
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
          <button className='btn-indigo' type='submit'>
            {createCategoryResults.isLoading ? 'loading...' : 'create category'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default CreateCategory;
