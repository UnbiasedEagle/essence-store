import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { adminToken } = useSelector((state) => state.authReducer);

  if (adminToken) {
    return <Navigate to='/dashboard/products' />;
  }

  return children;
};

export default PublicRoute;
