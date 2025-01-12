import React, { useState, useEffect, useRef, useMemo } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, Image } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MagnifyingGlass from "../icons/MagnifyingGlass";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import * as Location from "expo-location";

import LocationDot from "../icons/LocationDot";
import { GOOGLE_MAPS_API_KEY } from "../../Keys";

// Redux
import {
  setSelectedMarker,
  setLocation,
  setRegion,
  setSearchQuery,
  setMarkers,
} from "@/store/slices/couponMap";
import { useSelector, useDispatch } from "react-redux";

export default function CouponMap() {
  const selectedMarker = useSelector((state) => state.couponMap.selectedMarker);
  const location = useSelector((state) => state.couponMap.location);
  // const [location, setLocation] = useState(null);
  const region = useSelector((state) => state.couponMap.region);
  const markers = useSelector((state) => state.couponMap.markers);
  const [load, setLoad] = useState(true);

  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("DEFAULT MARKERS: ", markers[0], markers.length);
    console.log("DEFAULT LOCATION: ", location);
    if (!location) {
      console.log("GETTING NEW LOCATION !!!!!");
      getLocation();
    } else {
      setLoad(false);
    }
  }, []);

  useEffect(() => {
    console.log("LOCATION IS BEING CHANGED: ", location);
    if (location) {
      fetchNearbyRestaurants(
        location.coords.latitude,
        location.coords.longitude
      );
      dispatch(
        setRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      );
      setLoad(false);
    }
  }, [location]);

  useEffect(() => {
    if (mapRef.current && region) {
      mapRef.current.animateToRegion(
        region,
        1000 // animation duration in ms
      );
    }
  }, [region]);

  const getLocation = async () => {
    console.log("LOCation is changing!!!!");
    let { status } = await Location.requestForegroundPermissionsAsync(); // Ensure correct permissions API
    if (status !== "granted") {
      Alert.alert(
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

  const fetchNearbyRestaurants = async (lat, lng) => {
    // Handle the search logic here, e.g., call an API to fetch results
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=5000&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      if (data.results) {
        // Create marker data for the places returned
        const newMarkers = data.results.map((place) => ({
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

  const renderBottomSheetContent = () => (
    <BottomSheetView style={styles.bottomSheetContent}>
      {selectedMarker ? (
        <View style={{ width: "100%" }}>
          <Text style={styles.markerTitle}>{selectedMarker.name}</Text>
          <View style={styles.couponPopupDeal}>
            <View style={styles.couponPopupUser}>
              <View style={styles.couponPopupImageContainer}>
                <Image
                  source={require("../../assets/images/user.png")}
                  style={styles.couponPopupUserImage}
                />
              </View>

              <Text style={styles.couponPopupUserName}>Username</Text>
            </View>
            <View style={styles.couponPopupDealDescription}>
              <Text style={styles.couponPopupDealDescriptionText}>10% Off</Text>
            </View>
          </View>
          <Image
            style={styles.coupon_thumbnail}
            source={require("../../assets/images/pancakes.jpg")}
          />
        </View>
      ) : (
        <Text style={styles.noMarkerSelected}>
          Select a marker to view details
        </Text>
      )}
    </BottomSheetView>
  );

  const handleMarkerPress = (marker) => {
    dispatch(setSelectedMarker(marker));
    bottomSheetRef.current?.snapToIndex(0); // Use snapToIndex
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={styles.autoCompleteContainer}>
          <GooglePlacesAutocomplete
            placeholder="Search"
            fetchDetails={true}
            onPress={(data, details = null) => {
              console.log("Pressing autofill");
              if (details) {
                const { lat, lng } = details.geometry.location;
                // dispatch(
                //   setRegion((prev) => ({
                //     ...prev,
                //     latitude: lat,
                //     longitude: lng,
                //   }))
                // );
                dispatch(
                  setRegion({
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    latitude: lat,
                    longitude: lng,
                  })
                );
                console.log("Region being updated from autofill");
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
          >
            <View
              style={styles.searchBarIconContainer}
              onPress={() => console.log("pressing search container")}
            >
              <MagnifyingGlass height={25} width={25} color={"white"} />
            </View>
          </GooglePlacesAutocomplete>
        </View>

        {location && !load ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={region}
            showsPointsOfInterest={false}
          >
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
                        handleMarkerPress(marker);
                      }}
                    />
                  );
                })
              : null}
          </MapView>
        ) : null}

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints} // Added 0% as first snap point
          enablePanDownToClose={true}
          style={{ zIndex: 10, elevation: 10 }}
        >
          {renderBottomSheetContent()}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
    top: vh("5%"),
    left: "7.5%",
    width: "85%",
    // height: ,
    backgroundColor: "gray",
    zIndex: 15,
    elevation: 15, // This is important for Android
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "top",
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
});
