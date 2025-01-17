import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setImage: (state, action: PayloadAction<string | null>) => {
      state.image = action.payload;
    },
  },
});

export const { setUsername, setImage } = userSlice.actions;

export default userSlice.reducer;
