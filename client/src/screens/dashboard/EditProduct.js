import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { BsArrowLeftShort } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Colors from '../../components/Colors';
import ScreenHeader from '../../components/ScreenHeader';
import SizeList from '../../components/SizeList';
import Spinner from '../../components/Spinner';
import Wrapper from '../../components/Wrapper';
import { useFetchAllCategoriesQuery } from '../../store/services/categoryService';
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from '../../store/services/productService';
import toast, { Toaster } from 'react-hot-toast';
import { setSuccess } from '../../store/reducers/globalReducer';
import h2p from 'html2plaintext';

const sizes = [
  { name: 'xs' },
  { name: 's' },
  { name: 'm' },
  { name: 'l' },
  { name: 'xl' },
  { name: 'xxl' },
  { name: '1 year' },
  { name: '2 years' },
  { name: '3 years' },
  { name: '4 years' },
  { name: '5 years' },
];

const EditProduct = () => {
  const { data = [], isFetching } = useFetchAllCategoriesQuery();

  const { id } = useParams();

  const { data: productResponse, isFetching: isProductFetching } =
    useGetProductQuery(id);

  const [updateProductForm, setUpdateProductForm] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    colors: [],
    sizes: [],
  });

  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!isProductFetching) {
      const product = { ...productResponse };
      delete product.description;
      setUpdateProductForm(product);
      setDescription(h2p(productResponse?.description));
    }
  }, [isProductFetching, productResponse]);

  const handleChange = (event) => {
    setUpdateProductForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleColorChange = (color) => {
    setUpdateProductForm((prev) => {
      const updatedColors = [...prev.colors];

      const isColorPresent = prev.colors.find(
        (item) => item.color === color.hex
      );

      if (!isColorPresent) {
        updatedColors.push({ color: color.hex, id: nanoid() });
      }

      return {
        ...prev,
        colors: updatedColors,
      };
    });
  };

  const deleteColor = (id) => {
    const updatedColors = updateProductForm.colors.filter(
      (clr) => clr.id !== id
    );

    setUpdateProductForm((prev) => {
      return {
        ...prev,
        colors: updatedColors,
      };
    });
  };

  const handleSizeClick = (size) => {
    const updatedSizeList = [...updateProductForm.sizes];

    const isSizePresent = updateProductForm.sizes.find(
      (currSize) => currSize.name === size.name
    );

    if (!isSizePresent) {
      updatedSizeList.push(size);
    }

    setUpdateProductForm({ ...updateProductForm, sizes: updatedSizeList });
  };

  const handleSizeDelete = (size) => {
    const updatedSizeList = updateProductForm.sizes.filter(
      (currSize) => currSize.name !== size.name
    );
    setUpdateProductForm({ ...updateProductForm, sizes: updatedSizeList });
  };

  const [updateProduct, updateProductResults] = useUpdateProductMutation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateProductFormWithDescription = {
      ...updateProductForm,
      description,
    };

    updateProduct(updateProductFormWithDescription);
  };

  useEffect(() => {
    if (!updateProductResults.isSuccess) {
      updateProductResults?.error?.data?.errors.map((error) => {
        return toast.error(error.msg);
      });
    }
  }, [
    updateProductResults?.error?.data?.errors,
    updateProductResults.isSuccess,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (updateProductResults?.isSuccess) {
      dispatch(setSuccess(updateProductResults?.data?.message));
      navigate('/dashboard/products');
    }
  }, [
    updateProductResults?.isSuccess,
    navigate,
    updateProductResults?.data?.message,
    dispatch,
  ]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link className='btn-dark' to='/dashboard/products'>
          <BsArrowLeftShort className='inline-block mr-1 text-2xl align-middle' />
          <span className='inline-block align-middle'>products list</span>
        </Link>
      </ScreenHeader>
      <Toaster position='top-right' reverseOrder={true} />
      {isProductFetching && <Spinner />}
      {!isProductFetching && (
        <div className='flex flex-wrap -mx-3'>
          <form onSubmit={handleSubmit} className='w-full p-3 xl:w-8/12'>
            <h3 className='pl-3 mb-3 text-lg capitalize'>update product</h3>
            <div className='flex flex-wrap'>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='title' className='label'>
                  title
                </label>
                <input
                  value={updateProductForm.title}
                  onChange={handleChange}
                  type='text'
                  name='title'
                  className='form-control'
                  id='title'
                  placeholder='Enter title'
                />
              </div>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='price' className='label'>
                  price
                </label>
                <input
                  value={updateProductForm.price}
                  onChange={handleChange}
                  type='number'
                  name='price'
                  className='form-control'
                  id='price'
                  placeholder='Enter price'
                />
              </div>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='discount' className='label'>
                  discount
                </label>
                <input
                  value={updateProductForm.discount}
                  onChange={handleChange}
                  type='number'
                  name='discount'
                  className='form-control'
                  id='discount'
                  placeholder='Enter discount'
                />
              </div>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='stock' className='label'>
                  stock
                </label>
                <input
                  value={updateProductForm.stock}
                  onChange={handleChange}
                  type='number'
                  name='stock'
                  className='form-control'
                  id='stock'
                  placeholder='Enter stock'
                />
              </div>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='category' className='label'>
                  category
                </label>
                {isFetching ? (
                  <Spinner />
                ) : (
                  data?.categories?.length > 0 && (
                    <select
                      value={updateProductForm.category}
                      onChange={handleChange}
                      className='form-control'
                      name='category'
                      id='category'
                    >
                      <option value='' disabled>
                        Choose category
                      </option>
                      {data.categories.map((category) => {
                        return (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        );
                      })}
                    </select>
                  )
                )}
              </div>
              <div className='w-full p-3 md:w-6/12'>
                <label htmlFor='colors' className='label'>
                  choose colors
                </label>
                <TwitterPicker onChangeComplete={handleColorChange} />
              </div>
              <div className='w-full p-3'>
                <label htmlFor='sizes' className='label'>
                  choose sizes
                </label>
                {sizes.length > 0 && (
                  <div className='flex flex-wrap -mx-2'>
                    {sizes.map((size) => {
                      return (
                        <div
                          onClick={() => handleSizeClick(size)}
                          className='size'
                          key={size.name}
                        >
                          {size.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className='w-full p-3'>
                <label htmlFor='description' className='label'>
                  Description
                </label>
                <ReactQuill
                  id='description'
                  name='description'
                  className='placeholder:text-white!important'
                  placeholder='Enter description'
                  theme='snow'
                  value={description}
                  onChange={setDescription}
                />
              </div>
              <div className='w-full p-3'>
                <input
                  type='submit'
                  disabled={updateProductResults.isLoading ? true : false}
                  value={
                    updateProductResults.isLoading
                      ? 'loading...'
                      : 'edit product'
                  }
                  className='btn btn-dark'
                />
              </div>
            </div>
          </form>
          <div className='w-full p-3 xl:w-4/12'>
            <Colors onDelete={deleteColor} colors={updateProductForm.colors} />
            <SizeList
              onDelete={handleSizeDelete}
              sizes={updateProductForm.sizes}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default EditProduct;
