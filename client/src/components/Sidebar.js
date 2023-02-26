import { Link } from 'react-router-dom';
import {
  BsBagCheckFill,
  BsBarChartFill,
  BsCardList,
  BsPeopleFill,
  BsXLg,
} from 'react-icons/bs';

const Sidebar = ({ sidebarClass, closeSidebar }) => {
  return (
    <div
      className={`fixed top-0 z-10 duration-300 ${sidebarClass} sm:left-0 w-64 h-screen bg-gray-800`}
    >
      <BsXLg
        onClick={closeSidebar}
        className='absolute text-lg text-gray-600 cursor-pointer top-5 right-4 sm:hidden'
      />
      <div className='p-4 bg-white'>
        <img src='/logo.png' alt='logo' />
      </div>
      <ul className='mt-4'>
        <li className='px-4 py-2 text-white duration-300 cursor-pointer hover:bg-gray-600'>
          <Link className='flex items-center' to='/dashboard/products'>
            <BsCardList className='mr-2 text-lg' />
            <span className='text-base capitalize'>products</span>
          </Link>
        </li>
        <li className='px-4 py-2 text-white duration-300 cursor-pointer hover:bg-gray-600'>
          <Link className='flex items-center' to='/dashboard/orders'>
            <BsBagCheckFill className='mr-2 text-lg' />
            <span className='text-base capitalize'>orders</span>
          </Link>
        </li>
        <li className='px-4 py-3 text-white duration-300 cursor-pointer hover:bg-gray-600'>
          <Link className='flex items-center' to='/dashboard/customers'>
            <BsPeopleFill className='mr-2 text-lg' />
            <span className='text-base capitalize'>customers</span>
          </Link>
        </li>
        <li className='px-4 py-3 text-white duration-300 cursor-pointer hover:bg-gray-600'>
          <Link className='flex items-center' to='/dashboard/categories'>
            <BsBarChartFill className='mr-2 text-lg' />
            <span className='text-base capitalize'>categories</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
