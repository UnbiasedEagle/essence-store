import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSearchBar } from '../../store/reducers/globalReducer';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [inputTerm, setInputTerm] = useState('');

  const { searchBar } = useSelector((state) => state.globalReducer);
  const searchInputContainer = useRef();

  const dispatch = useDispatch();

  const closeSearch = (event) => {
    if (!searchInputContainer.current.contains(event.target)) {
      dispatch(toggleSearchBar());
    }
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputTerm) {
      return;
    }

    dispatch(toggleSearchBar());
    navigate(`/search-products/${inputTerm}/1`);
  };

  return (
    searchBar && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='fixed inset-0 w-full h-full bg-black/50 z-[300]'
        id='search'
        onClick={closeSearch}
      >
        <div className='fixed inset-0 w-full h-full bg-black/50 z-[300]'>
          <div className='flex justify-center -mx-8'>
            <form
              onSubmit={handleSubmit}
              ref={searchInputContainer}
              className='relative w-full px-8 mt-10 sm:w-10/12 md:w-8/12 lg:w-6/12'
            >
              <input
                type='text'
                value={inputTerm}
                onChange={(e) => setInputTerm(e.target.value)}
                className='w-full bg-white h-[50px] rounded outline-none pl-5 pr-14'
                placeholder='Search products....'
              />
              <button type='submit'>
                <FiSearch className='absolute top-[13px] right-12 text-2xl text-gray-500 cursor-pointer' />
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    )
  );
};

export default Search;
