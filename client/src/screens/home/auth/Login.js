import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../../components/home/Header';
import Nav from '../../../components/home/Nav';
import { useEffect } from 'react';
import { useAuthLoginMutation } from '../../../store/services/authService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../store/reducers/authReducer';
import { useForm } from '../../../hooks/useForm';
import { showError } from '../../../utils/utils';

const Login = () => {
  const [formState, handleChange, errors, setErrors] = useForm({
    email: '',
    password: '',
  });

  const [login, response] = useAuthLoginMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.isError) {
      setErrors(response?.error?.data?.errors);
    }
  }, [response?.error?.data?.errors, response?.isError, setErrors]);

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('userToken', response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate('/user');
    }
  }, [response?.data?.token, response.isSuccess, dispatch, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    login(formState);
  };

  return (
    <>
      <Nav />
      <div className='mt-[70px] pb-[80px]'>
        <Header>sign in</Header>
        <motion.div
          initial={{ opacity: 0, x: '-100vw' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full p-6 mx-auto sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12'
        >
          <form
            onSubmit={handleSubmit}
            className='p-10 -mt-12 bg-white border border-gray-200 rounded-lg'
          >
            <h1 className='mb-5 heading'>sign in</h1>
            <div className='mb-4'>
              <label htmlFor='email' className='form-label'>
                email
              </label>
              <input
                value={formState.email}
                onChange={handleChange}
                type='email'
                name='email'
                id='email'
                className={`form-input ${
                  showError('email', errors)
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-300 bg-white'
                }`}
                placeholder='Enter email'
              />
              {showError('email', errors) && (
                <span className='error'>{showError('email', errors)}</span>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='form-label'>
                password
              </label>
              <input
                value={formState.password}
                onChange={handleChange}
                type='password'
                name='password'
                id='password'
                className={`form-input ${
                  showError('password', errors)
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-300 bg-white'
                }`}
                placeholder='Enter password'
              />
              {showError('password', errors) && (
                <span className='error'>{showError('password', errors)}</span>
              )}
            </div>
            <div className='mb-4'>
              <input
                disabled={response.isLoading ? true : false}
                type='submit'
                className='w-full btn btn-indigo'
                value={response.isLoading ? 'Loading...' : 'sign in'}
              />
            </div>
            <div>
              <p>
                Don't have an account?
                <span className='text-base font-medium text-black capitalize'>
                  <Link to='/register'> register</Link>
                </span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
