import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMarker: null,
  location: null,
  region: {
    latitude: 44.984581,
    longitude: -93.2316061,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  },
  markers: [],
};

const couponMapSlice = createSlice({
  name: "couponMap",
  initialState,
  reducers: {
    setSelectedMarker: (state, action) => {
      state.selectedMarker = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setRegion: (state, action) => {
      state.region = action.payload;
    },
    setMarkers: (state, action) => {
      state.markers = action.payload;
    },
  },
});

export const { setSelectedMarker, setLocation, setRegion, setMarkers } =
  couponMapSlice.actions;

export default couponMapSlice.reducer;
