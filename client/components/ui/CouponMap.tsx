import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  FC,
} from "react";
import MapView, { Marker, Region, LatLng } from "react-native-maps";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MagnifyingGlass from "../../assets/icons/MagnifyingGlass";
import BottomSheet, {
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetModalProvider,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-get-random-values";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import * as Location from "expo-location";

import LocationDot from "../../assets/icons/LocationDot";
import LocationArrow from "../../assets/icons/LocationArrow";
import CouponBottomSheetItem from "./CouponBottomSheetItem";
import { GOOGLE_MAPS_API_KEY } from "@/Keys";

// Redux
import {
  setSelectedMarker,
  setLocation,
  setRegion,
  setMarkers,
} from "@/store/slices/couponMap";
import { useAppSelector, useAppDispatch } from "@/store/hooks";

type LocationType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

type MarkerType = {
  id: string;
  name: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
};
const CouponMap: FC = () => {
  // const GOOGLE_MAPS_API_KEY = "AIzaSyAYOoMzREk0iSjhjIgzVTlPB5fWURSY4Fg";
  const selectedMarker = useAppSelector(
    (state) => state.couponMap.selectedMarker as MarkerType
  );
  const location = useAppSelector(
    (state) => state.couponMap.location as LocationType | null
  );
  // const [location, setLocation] = useState(null);
  const region = useAppSelector(
    (state) => state.couponMap.region as Region | null | undefined
  );
  const markers = useAppSelector(
    (state) => state.couponMap.markers as MarkerType[]
  );
  const [load, setLoad] = useState(true);
  const [offCenter, setOffCenter] = useState(false);

  const mapRef = useRef(null) as any;
  const bottomSheetModalRef = useRef(null) as any;
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const dispatch = useAppDispatch();

  const handleDismiss = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    dispatch(setSelectedMarker(null));
  }, []);

  useEffect(() => {
    // console.log("DEFAULT MARKERS: ", markers[0], markers.length);
    console.log("LOCATION INIT: ", location);
    console.log("Google maps API: ", GOOGLE_MAPS_API_KEY);
    if (!location) {
      getLocation();
    } else {
      console.log("SETTING LOAD TO FALSE");
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    if (location && region) {
      let delta = Math.sqrt(
        (location.coords.latitude - region.latitude) ** 2 +
          (location.coords.longitude - region.longitude) ** 2
      );
      if (delta > 0.001) {
        setOffCenter(true);
      } else {
        setOffCenter(false);
      }
    }
  }, [location, region]);

  useEffect(() => {
    if (location && load) {
      setLoad(false);
      if (!markers || markers.length > 0) {
        return;
      }
      dispatch(
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      );
    }
  }, [location, load]);

  useEffect(() => {
    if (mapRef.current && region) {
      mapRef.current.animateToRegion(
        region,
        1000 // animation duration in ms
      );

      // fetchNearbyRestaurants(region.latitude, region.longitude);
    }
  }, [region]);

  useEffect(() => {
    if (selectedMarker) {
      // bottomSheetModalRef.current?.snapToIndex(0); // Use snapToIndex
      bottomSheetModalRef.current?.present();
      console.log("BOTTOM SHEET NOW VISIBLE");
    }
  }, [selectedMarker]);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Ensure correct permissions API
    if (status !== "granted") {
      console.log(
        "Permission Denied",
        "Location permission is required to use this feature."
      );
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });
    // setLocation(currentLocation);
    dispatch(setLocation(currentLocation));
  };

  const fetchNearbyRestaurants = async (lat: number, lng: number) => {
    // Handle the search logic here, e.g., call an API to fetch results
    console.log("fetching nearby food");
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results) {
        // Create marker data for the places returned
        const newMarkers = data.results.map((place: any) => ({
          id: place.place_id,
          name: place.name,
          description: place.vicinity,
          coordinate: {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          },
          // You can store any other data (e.g. rating, photos, etc.)
        }));
        dispatch(setMarkers(newMarkers));
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const getCouponsByRestaurant = () => {
    const couponsForRestaurant = [];

    for (let i = 0; i < 5; i++) {
      couponsForRestaurant.push(
        <View key={i} style={{ marginBottom: 5 }}>
          <CouponBottomSheetItem />
        </View>
      );
    }
    return couponsForRestaurant;
  };

  const renderBottomSheetContent = () => {
    return (
      <BottomSheetScrollView contentContainerStyle={styles.bottomSheetContent}>
        {selectedMarker ? (
          getCouponsByRestaurant().map((coupon) => coupon)
        ) : (
          <Text>Select a marker to view details</Text>
        )}
      </BottomSheetScrollView>
    );
  };

  const regionsAreEqual = (region1: Region, region2: Region) => {
    return (
      Math.abs(region1.latitude - region2.latitude) < 0.0001 &&
      Math.abs(region1.longitude - region2.longitude) < 0.0001 &&
      Math.abs(region1.latitudeDelta - region2.latitudeDelta) < 0.0001 &&
      Math.abs(region1.longitudeDelta - region2.longitudeDelta) < 0.0001
    );
  };

  const centerRegion = () => {
    dispatch(
      setRegion({
        latitude: location ? location.coords.latitude : 44.9778,
        longitude: location ? location.coords.longitude : 93.265,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      })
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, position: "relative" }}>
        {offCenter ? (
          <Pressable style={styles.recenterBtn} onPressOut={centerRegion}>
            <LocationArrow width={20} height={20} color={"#5A84F0"} />
            <Text style={{ color: "#5A84F0" }}>Re-center</Text>
          </Pressable>
        ) : null}

        <View style={styles.autoCompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            enablePoweredByContainer={false}
            onPress={(data, details = null) => {
              if (details) {
                const { lat, lng } = details.geometry.location;
                dispatch(
                  setRegion({
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    latitude: lat,
                    longitude: lng,
                  })
                );
                fetchNearbyRestaurants(lat, lng);
              }
            }}
            query={{ key: GOOGLE_MAPS_API_KEY, language: "en" }}
            onFail={(error) => console.log(error)}
            styles={{
              container: {
                position: "absolute",
                top: 0,
                flex: 0,
                width: "100%",
                zIndex: 10,
                elevation: 10, // This is important for Android
              },
              textInput: {
                // position: "absolute",
                backgroundColor: "white",
                borderWidth: 3,
                borderColor: "#ff7b00",
                borderRadius: 22.5,
                height: 45,
                padding: 10,
                paddingLeft: 50,
                fontSize: 16,
                zIndex: 10,
                elevation: 10, // This is important for Android
              },
              listView: {
                // position: "absolute",
                backgroundColor: "white",
                borderRadius: 5,
                marginTop: 5,
                zIndex: 10,
                elevation: 10, // This is important for Android
              },
              row: {
                // position: "absolute",
                backgroundColor: "white",
                padding: 13,
                height: 44,
                flexDirection: "row",
                zIndex: 10,
                elevation: 10, // This is important for Android
              },
            }}
          />
          <View style={styles.searchBarIconContainer}>
            <MagnifyingGlass height={25} width={25} color={"white"} />
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.couponsNearbyBtn,
              {
                borderColor: pressed ? "#ff7b00" : "white",
                borderWidth: pressed ? 1 : 0,
              }, // Change background color when pressed
            ]}
            onPressOut={() => {
              const lat = region ? region.latitude : 44.9778;
              const lng = region ? region.longitude : 93.265;
              fetchNearbyRestaurants(lat, lng);
            }}
          >
            <Text style={{ textAlign: "center" }}>Coupons Nearby</Text>
          </Pressable>
        </View>

        {location && !load && region ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            showsPointsOfInterest={false}
            onRegionChangeComplete={(newRegion) => {
              if (!regionsAreEqual(newRegion, region)) {
                dispatch(setRegion(newRegion));
              }
            }}
          >
            <Marker
              key={0}
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"You"}
              description={"Current Location"}
              pinColor="blue"
            />
            {markers
              ? markers.map((marker) => {
                  // console.log("RENDERING MARKER: ", marker);
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={{
                        latitude: marker.coordinate.latitude,
                        longitude: marker.coordinate.longitude,
                      }}
                      title={marker.name}
                      description={marker.description}
                      pinColor="red"
                      onPress={() => {
                        console.log("MARKER PRESSED");
                        dispatch(setSelectedMarker(marker));
                      }}
                    />
                  );
                })
              : null}
          </MapView>
        ) : null}
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onDismiss={handleDismiss}
          backgroundStyle={styles.modalBackground}
        >
          {renderBottomSheetContent()}
          {/* <View>
            <Text>Modal content above top navigation and bottom tabs</Text>
          </View> */}
        </BottomSheetModal>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    backgroundColor: "#EBEBEB",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerContainer: {
    alignItems: "center", // Center the SVG horizontally
    justifyContent: "center", // Center the SVG vertically
  },
  searchBarIconContainer: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#ff7b00",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    elevation: 100, // This is important for Android
  },
  autoCompleteContainer: {
    position: "absolute",
    top: vh("7.5%"),
    left: "7.5%",
    width: "85%",
    zIndex: 15,
    elevation: 15, // This is important for Android
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  bottomSheetContent: {
    alignItems: "center",
    // justifyContent: "top",  <-- not valid; use "flex-start" if you want top alignment
    justifyContent: "flex-start",
    zIndex: 5,
    elevation: 5,
    // overflow: "scroll",
  },
  markerTitle: {
    fontSize: 16,
    fontWeight: "700",
    alignSelf: "center",
  },
  couponPopupDeal: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    marginLeft: "5%",
    marginRight: "5%",
    height: 50,
  },
  couponPopupUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  couponPopupImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "red",
  },
  couponPopupUserImage: {
    width: 30,
    height: 30,
  },
  couponPopupDealDescription: {
    position: "absolute",
    right: "10%",
    backgroundColor: "lightgreen",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 20,
    width: "50%",
  },
  couponPopupDealDescriptionText: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },

  coupon_thumbnail: {
    width: vw("100%"), // Full screen width
    height: "100%", // Allow height to adjust automatically
    resizeMode: "stretch",
  },
  recenterBtn: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
    bottom: 15,
    // right: "7.5%", // Match the right spacing of your search bar
    right: 15,
    backgroundColor: "white", // Add this to see the button better
    padding: 10, // Add some padding
    borderRadius: 7, // Optional: for better appearance
    display: "flex",
    flexDirection: "row",
    width: "25%",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
  },
  couponsNearbyBtn: {
    width: 150,
    height: 25,
    marginTop: 55,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12.5,
  },
});

export default CouponMap;
