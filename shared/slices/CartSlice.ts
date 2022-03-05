import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { number: 0 },
  reducers: {
    setCart: (state) => {
      state.number++;
    },
    // getNumberItem: (state) => {console.log("aaa")},
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;
