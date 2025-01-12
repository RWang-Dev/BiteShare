import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tab: "Coupon",
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = mainLayoutSlice.actions;

export default mainLayoutSlice.reducer;
