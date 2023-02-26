import { useEffect } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { useForm } from '../hooks/useForm';
import { usePostReviewMutation } from '../store/services/userOrdersService';
import Alert from './Alert';

const ReviewForm = ({ state, toggleReview, data }) => {
  const [ratingState, handleChange] = useForm({
    rating: '',
    message: '',
  });

  const [submitReview, response] = usePostReviewMutation();

  const addReview = (e) => {
    e.preventDefault();
    submitReview({
      ...ratingState,
      user: data?.details?.userId?._id,
      product: data?.details?.productId?._id,
      id: data.details?._id,
    });
  };

  useEffect(() => {
    if (response.isSuccess) {
      toggleReview(response?.data?.msg);
    }
  }, [response.isSuccess, response?.data?.msg, toggleReview]);

  return (
    state && (
      <div className='fixed inset-0 w-full h-full bg-black/40 z-[1000] flex items-center justify-center'>
        <div className='w-[90%] sm:w-8/12 md:w-6/12 lg:w-4/12'>
          <div className='p-5 bg-white'>
            <h1 className='mb-3 text-base font-medium text-gray-700 capitalize'>
              add a review
            </h1>
            {response.isError &&
              response?.error?.data?.errors.map((err) => (
                <Alert
                  key={err}
                  className='text-rose-900 bg-rose-100 border-rose-900'
                >
                  <MdErrorOutline className='mr-1' />{' '}
                  <span className='text-base capitalize'>{err.msg}</span>
                </Alert>
              ))}

            <form onSubmit={addReview}>
              <div className='mb-3'>
                <label
                  htmlFor='rating'
                  className='block mb-2 text-sm font-medium capitalize'
                >
                  rating
                </label>
                <select
                  name='rating'
                  id='rating'
                  className='form-input'
                  onChange={handleChange}
                  value={ratingState.rating}
                >
                  <option value=''>Choose a rating</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
              <label
                htmlFor='rating'
                className='block mb-2 text-sm font-medium capitalize'
              >
                message
              </label>
              <textarea
                name='message'
                id=''
                cols='30'
                rows='5'
                className='form-input'
                placeholder='Write a message'
                onChange={handleChange}
                value={ratingState.message}
              ></textarea>
              <div className='flex justify-between mt-3'>
                <input
                  type='submit'
                  value='add reivew'
                  className='rounded cursor-pointer btn-indigo'
                />
                <button
                  className='px-4 py-2 text-sm font-medium text-white capitalize rounded bg-rose-600'
                  onClick={() => toggleReview('')}
                >
                  close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};
export default ReviewForm;
