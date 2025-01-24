import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LocationObject } from "expo-location";
import { LatLng, Region } from "react-native-maps";
import { Marker } from "react-native-svg";

type MarkerType = {
  id: string;
  name: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};

interface MapState {
  selectedMarker: MarkerType | null; // Assuming markers have latitude and longitude
  location: LocationObject | null; // Current location of the user or map
  region: Region; // Map's visible region
  markers: MarkerType[]; // Array of marker positions
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
    setSelectedMarker: (state, action: PayloadAction<MarkerType | null>) => {
      state.selectedMarker = action.payload;
    },
    setLocation: (state, action: PayloadAction<LocationObject | null>) => {
      state.location = action.payload;
    },
    setRegion: (state, action: PayloadAction<Region>) => {
      state.region = action.payload;
    },
    setMarkers: (state, action: PayloadAction<MarkerType[]>) => {
      state.markers = action.payload;
    },
  },
});

export const { setSelectedMarker, setLocation, setRegion, setMarkers } =
  couponMapSlice.actions;

export default couponMapSlice.reducer;
