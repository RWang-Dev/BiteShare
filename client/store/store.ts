import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "./slices/createProfile";
import influencerApplicationReducer from "./slices/influencerApplication";
import mainLayoutReducer from "./slices/mainLayout";
import couponMapReducer from "./slices/couponMap";
import userProfileReducer from "./slices/userProfile";
import couponRedemptionReducer from "./slices/couponRedemption";
import userAuthReducer from "./slices/userAuth";
import couponFeedReducer from "./slices/couponFeed";

export const store = configureStore({
  reducer: {
    user: userReducer,
    influencerApplication: influencerApplicationReducer,
    mainLayout: mainLayoutReducer,
    couponMap: couponMapReducer,
    userProfile: userProfileReducer,
    couponRedemption: couponRedemptionReducer,
    userAuth: userAuthReducer,
    couponFeed: couponFeedReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
