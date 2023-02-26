import Nav from '../../components/home/Nav';
import Header from '../../components/home/Header';
import AccountList from '../../components/home/AccountList';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.authReducer);

  return (
    <>
      <Nav />
      <div className='mt-[70px]'>
        <Header>my account</Header>
        <div className='custom-container mt-[40px]'>
          <div className='flex flex-wrap -mx-6'>
            <div className='w-full p-6 md:w-4/12'>
              <AccountList />
            </div>
            <div className='w-full p-6 md:w-8/12'>
              <h1 className='heading'>name</h1>
              <span className='block mt-3 text-sm font-medium capitalize'>
                {user && user.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
