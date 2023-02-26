import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { adminToken } = useSelector((state) => {
    return state.authReducer;
  });

  if (!adminToken) {
    return <Navigate to='/auth/admin-login' />;
  }

  return children;
};

export default PrivateRoute;
