import { createSlice } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';

const adminToken = localStorage.getItem('admin-token') || null;
const userToken = localStorage.getItem('userToken') || null;

const verifyToken = (token, key) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expiresIn = new Date(decodeToken.exp * 1000);

    if (new Date() > expiresIn) {
      localStorage.removeItem(key);
      return null;
    }

    return token;
  }

  return null;
};

const authReducer = createSlice({
  name: 'authReducer',
  initialState: {
    adminToken: verifyToken(adminToken, 'admin-token'),
    userToken: verifyToken(userToken, 'userToken'),
    user: userToken ? jwtDecode(userToken) : null,
  },
  reducers: {
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      state.user = jwtDecode(action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('userToken');
      state.adminToken = null;
      state.userToken = null;
      state.user = null;
    },
  },
});

export const { setAdminToken, logout, setUserToken } = authReducer.actions;

export default authReducer.reducer;
