import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '../../../components/home/Header';
import Nav from '../../../components/home/Nav';
import { useEffect } from 'react';
import { useRegisterUserMutation } from '../../../store/services/authService';
import { useDispatch } from 'react-redux';
import { setUserToken } from '../../../store/reducers/authReducer';
import { useForm } from '../../../hooks/useForm';
import { showError } from '../../../utils/utils';

const Register = () => {
  const [form, handleChange, errors, setErrors] = useForm({
    name: '',
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, registerUserResults] = useRegisterUserMutation();

  useEffect(() => {
    if (registerUserResults?.isError) {
      setErrors(registerUserResults?.error?.data?.errors);
    }
  }, [
    registerUserResults?.error?.data,
    registerUserResults?.isError,
    setErrors,
  ]);

  useEffect(() => {
    if (registerUserResults.isSuccess) {
      localStorage.setItem('userToken', registerUserResults?.data?.token);
      dispatch(setUserToken(registerUserResults?.data?.token));
      navigate('/user');
    }
  }, [
    registerUserResults?.data?.msg,
    registerUserResults?.data?.token,
    registerUserResults.isSuccess,
    dispatch,
    navigate,
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();

    registerUser(form);
  };

  return (
    <>
      <Nav />
      <div className='mt-[70px] pb-[80px]'>
        <Header>sign up</Header>
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
            <h1 className='mb-5 heading'>sign up</h1>
            <div className='mb-4'>
              <label htmlFor='name' className='form-label'>
                name
              </label>
              <input
                value={form.name}
                onChange={handleChange}
                type='text'
                name='name'
                id='name'
                className={`form-input ${
                  showError('name', errors)
                    ? 'border-rose-600 bg-rose-50'
                    : 'border-gray-300 bg-white'
                }`}
                placeholder='Enter name'
              />
              {showError('name', errors) && (
                <span className='error'>{showError('name', errors)}</span>
              )}
            </div>
            <div className='mb-4'>
              <label htmlFor='email' className='form-label'>
                email
              </label>
              <input
                value={form.email}
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
                value={form.password}
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
                disabled={registerUserResults.isLoading ? true : false}
                type='submit'
                className='w-full btn btn-indigo'
                value={registerUserResults.isLoading ? 'Loading...' : 'sign up'}
              />
            </div>
            <div>
              <p>
                Already have an account?
                <span className='text-base font-medium text-black capitalize'>
                  <Link to='/login'> login</Link>
                </span>
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default Register;
