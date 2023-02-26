import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/reducers/authReducer';

const AccountList = () => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <NavLink to='/user' className='account-list'>
        <BsPersonCircle size={22} />
        <span className='account-list-title'>my account</span>
      </NavLink>
      <NavLink to='/orders' className='account-list'>
        <AiOutlineShoppingCart size={22} />
        <span className='account-list-title'>my orders</span>
      </NavLink>
      <span onClick={handleLogoutClick} className='cursor-pointer account-list'>
        <AiOutlineLogout size={22} />
        <span className='account-list-title'>logout</span>
      </span>
    </>
  );
};

export default AccountList;
