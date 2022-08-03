import { createSlice } from "@reduxjs/toolkit";
import cartItems from "../../cartItems";

// Default value of payload
const initialState = {
  cartItems: cartItems,
  amount: 4,
  total: 0,
  isLoading: true,
};

// Pre-control function called action
const cartSlice = createSlice({
  name: "cart", //slice name
  initialState, //payload
  reducers: {
    // reducer case  or action
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state?.cartItems?.filter((item) => item?.id !== itemId);
    },
    increase: (state, { payload }) => {
      const cartItem = state?.cartItems?.find(
        (item) => item?.id === payload.id
      );
      cartItem.amount += 1;
    },
    decrease: (state, { payload }) => {
      const cartItem = state?.cartItems?.find(
        (item) => item?.id === payload.id
      );
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state?.cartItems?.forEach((item) => {
        amount += item?.amount;
        total += item?.amount * item?.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

// console.log("cartSlice :>> ", cartSlice.actions);
export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice?.actions;
export default cartSlice.reducer;
