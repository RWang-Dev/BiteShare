import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profileTab: "Coupon",
  userType: "default",
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setTab: (state, action) => {
      state.profileTab = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { setTab, setUserType } = userProfileSlice.actions;

export default userProfileSlice.reducer;
