import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  image: string | null;
  username: string;
}

const initialState: UserState = {
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
