import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InfluencerPostState {
  active: boolean;
  media: any;
}

const initialState: InfluencerPostState = {
  active: false,
  media: null,
};

const influencerPostSlice = createSlice({
  name: "influencerPost",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setMedia: (state, action: PayloadAction<any>) => {
      state.media = action.payload;
    },
  },
});

export const { setActive, setMedia } = influencerPostSlice.actions;

export default influencerPostSlice.reducer;
