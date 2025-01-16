import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  active: false,
  ID: "",
};

const couponRedemptionSlice = createSlice({
  name: "couponRedemption",
  initialState,
  reducers: {
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setID: (state, action) => {
      state.ID = action.payload;
    },
  },
});

export const { setActive, setID } = couponRedemptionSlice.actions;

export default couponRedemptionSlice.reducer;
