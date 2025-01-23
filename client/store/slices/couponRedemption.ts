import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RedemptionState {
  active: boolean;
  ID: number | null;
}
const initialState: RedemptionState = {
  active: false,
  ID: null,
};

const couponRedemptionSlice = createSlice({
  name: "couponRedemption",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setID: (state, action: PayloadAction<number | null>) => {
      state.ID = action.payload;
    },
  },
});

export const { setActive, setID } = couponRedemptionSlice.actions;

export default couponRedemptionSlice.reducer;
