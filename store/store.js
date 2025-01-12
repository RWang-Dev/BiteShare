import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./slices/createProfile";
import influencerApplicationReducer from "./slices/influencerApplication";
import mainLayoutReducer from "./slices/mainLayout";
import couponMapReducer from "./slices/couponMap";

export const store = configureStore({
  reducer: {
    user: userReducer,
    influencerApplication: influencerApplicationReducer,
    mainLayout: mainLayoutReducer,
    couponMap: couponMapReducer,
  },
});
