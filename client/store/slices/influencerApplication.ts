import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfluencerApplicationState {
  username: string;
}

const initialState: InfluencerApplicationState = {
  username: "",
};

const influencerApplicationSlice = createSlice({
  name: "influencerApplication",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
});

export const { setUsername } = influencerApplicationSlice.actions;

export default influencerApplicationSlice.reducer;
