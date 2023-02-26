import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CategoryProducts from '../screens/home/CategoryProducts';
import AdminLogin from '../screens/auth/AdminLogin';
import Categories from '../screens/dashboard/Categories';
import CreateCategory from '../screens/dashboard/CreateCategory';
import CreateProduct from '../screens/dashboard/CreateProduct';
import EditProduct from '../screens/dashboard/EditProduct';
import Products from '../screens/dashboard/Products';
import UpdateCategory from '../screens/dashboard/UpdateCategory';
import Login from '../screens/home/auth/Login';
import Register from '../screens/home/auth/Register';
import Home from '../screens/home/Home';
import Dashboard from '../screens/users/Dashboard';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import UserAuthRoute from './UserAuthRoute';
import UserRoute from './UserRoute';
import Product from '../screens/home/Product';
import SearchProducts from '../screens/home/SearchProducts';
import Cart from '../screens/home/Cart';
import Orders from '../screens/dashboard/Order';
import OrderDetails from '../screens/dashboard/OrderDetails';
import UserOrders from '../screens/users/UserOrders';
import UserOrderDetails from '../screens/users/UserOrderDetails';

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='auth'>
          <Route
            path='admin-login'
            element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            }
          />
        </Route>
        <Route
          path='search-products/:keyword/:page?'
          element={<SearchProducts />}
        />
        <Route path='cart' element={<Cart />} />
        <Route path='/' element={<Home />} />
        <Route
          path='/category-products/:categoryName/:page?'
          element={<CategoryProducts />}
        />
        <Route element={<UserAuthRoute />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/product/:id' element={<Product />} />
        <Route element={<UserRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='orders/:page?' element={<UserOrders />} />
          <Route path='user-order-details/:id' element={<UserOrderDetails />} />
        </Route>
        <Route path='dashboard'>
          <Route
            path='products/:page?'
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route
            path='categories/:page?'
            element={
              <PrivateRoute>
                <Categories />
              </PrivateRoute>
            }
          />
          <Route
            path='create-category'
            element={
              <PrivateRoute>
                <CreateCategory />
              </PrivateRoute>
            }
          />
          <Route
            path='update-category/:id'
            element={
              <PrivateRoute>
                <UpdateCategory />
              </PrivateRoute>
            }
          />
          <Route
            path='create-product'
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path='edit-product/:id'
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          <Route
            path='orders/:page?'
            element={
              <PrivateRoute>
                <Orders />
              </PrivateRoute>
            }
          />
          <Route
            path='order-details/:id'
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
