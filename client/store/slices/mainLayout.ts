import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LayoutState {
  tab: string;
}
const initialState: LayoutState = {
  tab: "Coupon",
};

const mainLayoutSlice = createSlice({
  name: "mainLayout",
  initialState,
  reducers: {
    setTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
});

export const { setTab } = mainLayoutSlice.actions;

export default mainLayoutSlice.reducer;
