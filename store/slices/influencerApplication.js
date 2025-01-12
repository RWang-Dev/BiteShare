import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

const influencerApplicationSlice = createSlice({
  name: "influencerApplication",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = influencerApplicationSlice.actions;

export default influencerApplicationSlice.reducer;
