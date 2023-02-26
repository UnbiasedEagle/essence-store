import { createSlice } from '@reduxjs/toolkit';
import { getDiscountPrice } from '../../utils/utils';

const cartData = localStorage.getItem('cart');
const cartArray = cartData ? JSON.parse(cartData) : [];

const getItemsCount = (cart) => {
  return cart.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);
};

const getTotalPrice = (cart) => {
  return Number(
    cart
      .reduce((acc, curr) => {
        return (
          acc + getDiscountPrice(curr.price, curr.discount) * curr.quantity
        );
      }, 0)
      .toFixed(2)
  );
};

const cartReducer = createSlice({
  name: 'cart',
  initialState: {
    cart: cartArray,
    items: cartArray.length > 0 ? getItemsCount(cartArray) : 0,
    total: cartArray.length > 0 ? getTotalPrice(cartArray) : 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.items += action.payload.quantity;
      state.total += Number(
        (
          getDiscountPrice(action.payload.price, action.payload.discount) *
          action.payload.quantity
        ).toFixed(2)
      );
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);

      if (item) {
        item.quantity += 1;
        state.items += 1;
        state.total += Number(
          getDiscountPrice(item.price, item.discount).toFixed(2)
        );
        const itemIdx = state.cart.indexOf(item);
        state.cart[itemIdx] = item;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.items -= 1;
        state.total -= Number(
          getDiscountPrice(item.price, item.discount).toFixed(2)
        );
        const itemIdx = state.cart.indexOf(item);
        state.cart[itemIdx] = item;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    removeItem: (state, { payload }) => {
      const item = state.cart.find((item) => item._id === payload);
      if (item) {
        const index = state.cart.indexOf(item);
        state.items -= item.quantity;
        state.total -= Number(
          (getDiscountPrice(item.price, item.discount) * item.quantity).toFixed(
            2
          )
        );
        state.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    emptyCart: (state) => {
      state.cart = [];
      state.items = 0;
      state.total = 0;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  emptyCart,
} = cartReducer.actions;

export default cartReducer.reducer;
