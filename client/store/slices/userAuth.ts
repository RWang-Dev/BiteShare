import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; accessToken: string }>) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
