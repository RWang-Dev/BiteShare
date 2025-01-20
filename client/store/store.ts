import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./slices/createProfile";
import influencerApplicationReducer from "./slices/influencerApplication";
import mainLayoutReducer from "./slices/mainLayout";
import couponMapReducer from "./slices/couponMap";
import userProfileReducer from "./slices/userProfile";
import couponRedemptionReducer from "./slices/couponRedemption";
import userAuthReducer from "./slices/userAuth";

export const store = configureStore({
  reducer: {
    user: userReducer,
    influencerApplication: influencerApplicationReducer,
    mainLayout: mainLayoutReducer,
    couponMap: couponMapReducer,
    userProfile: userProfileReducer,
    couponRedemption: couponRedemptionReducer,
    userAuth: userAuthReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
