import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { TwitterPicker } from 'react-color';
import { BsArrowLeftShort } from 'react-icons/bs';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Colors from '../../components/Colors';
import ImagesPreview from '../../components/ImagesPreview';
import ScreenHeader from '../../components/ScreenHeader';
import SizeList from '../../components/SizeList';
import Spinner from '../../components/Spinner';
import Wrapper from '../../components/Wrapper';
import { useFetchAllCategoriesQuery } from '../../store/services/categoryService';
import { useCreateProductMutation } from '../../store/services/productService';
import toast, { Toaster } from 'react-hot-toast';
import { setSuccess } from '../../store/reducers/globalReducer';

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

const CreateProduct = () => {
  const { data = [], isFetching } = useFetchAllCategoriesQuery();

  const [createProductForm, setCreateProductForm] = useState({
    title: '',
    price: 0,
    discount: 0,
    stock: 0,
    category: '',
    colors: [],
    sizes: [],
  });

  const [description, setDescription] = useState('');

  const [image1, setImage1] = useState('');
  const [image2, setImage2] = useState('');
  const [image3, setImage3] = useState('');

  const [preview, setPreview] = useState({
    image1: '',
    image2: '',
    image3: '',
  });

  const handleImageChange = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.name === 'image1') {
        setImage1(event.target.files[0]);
      } else if (event.target.name === 'image2') {
        setImage2(event.target.files[0]);
      } else {
        setImage3(event.target.files[0]);
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, [event.target.name]: reader.result });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleChange = (event) => {
    setCreateProductForm((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleColorChange = (color) => {
    setCreateProductForm((prev) => {
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
    const updatedColors = createProductForm.colors.filter(
      (clr) => clr.id !== id
    );

    setCreateProductForm((prev) => {
      return {
        ...prev,
        colors: updatedColors,
      };
    });
  };

  const handleSizeClick = (size) => {
    const updatedSizeList = [...createProductForm.sizes];

    const isSizePresent = createProductForm.sizes.find(
      (currSize) => currSize.name === size.name
    );

    if (!isSizePresent) {
      updatedSizeList.push(size);
    }

    setCreateProductForm({ ...createProductForm, sizes: updatedSizeList });
  };

  const handleSizeDelete = (size) => {
    const updatedSizeList = createProductForm.sizes.filter(
      (currSize) => currSize.name !== size.name
    );
    setCreateProductForm({ ...createProductForm, sizes: updatedSizeList });
  };

  const [createProduct, createProductResults] = useCreateProductMutation();

  const handleSubmit = (event) => {
    event.preventDefault();

    const createProductFormWithDescription = {
      ...createProductForm,
      description,
    };

    const formData = new FormData();
    formData.append('data', JSON.stringify(createProductFormWithDescription));
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);

    createProduct(formData);
  };

  useEffect(() => {
    if (!createProductResults.isSuccess) {
      createProductResults?.error?.data?.errors.map((error) => {
        return toast.error(error.msg);
      });
    }
  }, [
    createProductResults?.error?.data?.errors,
    createProductResults.isSuccess,
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (createProductResults?.isSuccess) {
      dispatch(setSuccess(createProductResults?.data?.message));
      navigate('/dashboard/products');
    }
  }, [
    createProductResults?.isSuccess,
    navigate,
    createProductResults?.data?.message,
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
      <div className='flex flex-wrap -mx-3'>
        <form onSubmit={handleSubmit} className='w-full p-3 xl:w-8/12'>
          <div className='flex flex-wrap'>
            <div className='w-full p-3 md:w-6/12'>
              <label htmlFor='title' className='label'>
                title
              </label>
              <input
                value={createProductForm.title}
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
                value={createProductForm.price}
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
                value={createProductForm.discount}
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
                value={createProductForm.stock}
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
                    value={createProductForm.category}
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
              <label htmlFor='image1' className='label'>
                Image 1
              </label>
              <input
                onChange={handleImageChange}
                className='input-file'
                type='file'
                name='image1'
                id='image1'
              />
            </div>
            <div className='w-full p-3'>
              <label htmlFor='image2' className='label'>
                Image 2
              </label>
              <input
                onChange={handleImageChange}
                className='input-file'
                type='file'
                name='image2'
                id='image2'
              />
            </div>
            <div className='w-full p-3'>
              <label htmlFor='image3' className='label'>
                Image 3
              </label>
              <input
                onChange={handleImageChange}
                className='input-file'
                type='file'
                name='image3'
                id='image3'
              />
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
                disabled={createProductResults.isLoading ? true : false}
                value={
                  createProductResults.isLoading ? 'loading...' : 'save product'
                }
                className='btn btn-dark'
              />
            </div>
          </div>
        </form>
        <div className='w-full p-3 xl:w-4/12'>
          <Colors onDelete={deleteColor} colors={createProductForm.colors} />
          <SizeList
            onDelete={handleSizeDelete}
            sizes={createProductForm.sizes}
          />
          <ImagesPreview url={preview.image1} heading='image 1' />
          <ImagesPreview url={preview.image2} heading='image 2' />
          <ImagesPreview url={preview.image3} heading='image 3' />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateProduct;
