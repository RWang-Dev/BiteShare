import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LatLng, Region } from "react-native-maps";

interface MapState {
  selectedMarker: LatLng | null; // Assuming markers have latitude and longitude
  location: LatLng | null; // Current location of the user or map
  region: Region; // Map's visible region
  markers: LatLng[]; // Array of marker positions
}

const initialState: MapState = {
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
    setSelectedMarker: (state, action: PayloadAction<LatLng | null>) => {
      state.selectedMarker = action.payload;
    },
    setLocation: (state, action: PayloadAction<LatLng | null>) => {
      state.location = action.payload;
    },
    setRegion: (state, action: PayloadAction<Region>) => {
      state.region = action.payload;
    },
    setMarkers: (state, action: PayloadAction<LatLng[]>) => {
      state.markers = action.payload;
    },
  },
});

export const { setSelectedMarker, setLocation, setRegion, setMarkers } =
  couponMapSlice.actions;

export default couponMapSlice.reducer;
