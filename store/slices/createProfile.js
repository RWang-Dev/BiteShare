import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  image: null,
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

export const { setUsername, setImage } = userSlice.actions;

export default userSlice.reducer;
