import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CouponFeedState {
  coupons: any[];
  hasMore: boolean;
  lastVisible: string | null;
  scrollPosition: number;
}

const initialState: CouponFeedState = {
  coupons: [],
  hasMore: true,
  lastVisible: null,
  scrollPosition: 0,
};
const couponFeedSlice = createSlice({
  name: "couponFeed",
  initialState,
  reducers: {
    addCoupons: (state, action: PayloadAction<any[]>) => {
      state.coupons = [...state.coupons, ...action.payload];
    },
    removeCoupon: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.coupons.length) {
        state.coupons.splice(action.payload, 1);
      }
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setLastVisible: (state, action: PayloadAction<string | null>) => {
      state.lastVisible = action.payload;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.scrollPosition = action.payload;
    },
  },
});

export const {
  addCoupons,
  removeCoupon,
  setHasMore,
  setLastVisible,
  setScrollPosition,
} = couponFeedSlice.actions;

export default couponFeedSlice.reducer;
