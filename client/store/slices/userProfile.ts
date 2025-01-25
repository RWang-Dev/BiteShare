import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  profileTab: string;
  userType: string;
}
const initialState: UserProfileState = {
  profileTab: "Coupon",
  userType: "influencer",
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.profileTab = action.payload;
    },
    setUserType: (state, action: PayloadAction<string>) => {
      state.userType = action.payload;
    },
  },
});

export const { setTab, setUserType } = userProfileSlice.actions;

export default userProfileSlice.reducer;
