import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { BsHandbag } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import { toggleSearchBar } from '../../store/reducers/globalReducer';

const Nav = () => {
  const { user, userToken } = useSelector((state) => state.authReducer);
  const { items } = useSelector((state) => state.cartReducer);

  const dispatch = useDispatch();

  return (
    <>
      <nav className='nav'>
        <div className='custom-container'>
          <div className='flex items-center justify-between'>
            <Link to='/'>
              <img src='/logo.png' alt='logo' className='object-cover w-full' />
            </Link>
            <ul className='flex items-center'>
              <li
                onClick={() => dispatch(toggleSearchBar())}
                className='cursor-pointer nav-li'
              >
                <FiSearch size='22' />
              </li>
              <li className='nav-li'>
                {userToken && (
                  <Link className='nav-link' to='/user'>
                    {user.name}
                  </Link>
                )}
                {!userToken && (
                  <Link className='nav-link' to='/login'>
                    sign in
                  </Link>
                )}
              </li>
              <li className='relative nav-li'>
                <Link to='/cart'>
                  <BsHandbag size='20' />
                  <span className='nav-circle'>{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};

export default Nav;
