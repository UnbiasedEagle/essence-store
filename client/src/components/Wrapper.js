import { useState } from 'react';
import AdminNav from './AdminNav';
import Sidebar from './Sidebar';

const Wrapper = ({ children }) => {
  const [sidebarClass, setSidebarClass] = useState('-left-64');

  const openSidebar = () => {
    setSidebarClass('left-0');
  };

  const closeSidebar = () => {
    setSidebarClass('-left-64');
  };

  return (
    <>
      <Sidebar closeSidebar={closeSidebar} sidebarClass={sidebarClass} />
      <AdminNav openSidebar={openSidebar} />
      <section className='min-h-screen px-4 ml-0 bg-gray-900 sm:ml-64 pt-28'>
        <div className='p-4 text-white bg-gray-800'>{children}</div>
      </section>
    </>
  );
};

export default Wrapper;
