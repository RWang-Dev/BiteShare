import React, { useState, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MagnifyingGlass from "../icons/MagnifyingGlass";
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import * as Location from "expo-location";

import LocationDot from "../icons/LocationDot";
const GOOGLE_MAPS_API_KEY = "AIzaSyAYOoMzREk0iSjhjIgzVTlPB5fWURSY4Fg";

export default function CouponMap() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [markers, setMarkers] = useState([]);

  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      fetchNearbyRestaurants();
      // console.log("LOCATION: ", location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      console.log("REGION: ", region);
    }
  }, [location]);

  const getLocation = async () => {
    console.log("getting location");
    let { status } = await Location.requestForegroundPermissionsAsync(); // Ensure correct permissions API
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to use this feature."
      );
      return;
    }
    console.log("pass");

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    // setRegion({
    //   latitude: currentLocation.coords.latitude,
    //   longitude: currentLocation.coords.longitude,
    //   latitudeDelta: 0.0922,
    //   longitudeDelta: 0.0421,
    // });
  };

  const handleRegionChange = (newRegion) => {
    // Adjust zoom sensitivity by reducing deltas more significantly
    setRegion({
      ...newRegion,
      latitudeDelta: Math.max(newRegion.latitudeDelta * 0.8, 0.002), // Fine-tune zoom sensitivity
      longitudeDelta: Math.max(newRegion.longitudeDelta * 0.8, 0.002),
    });
  };

  const fetchNearbyRestaurants = async () => {
    // Handle the search logic here, e.g., call an API to fetch results
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.coords.latitude},${location.coords.longitude}&radius=5000&type=restaurant&key=${GOOGLE_MAPS_API_KEY}`
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
        setMarkers(newMarkers);
      }
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const renderBottomSheetContent = () => (
    <View style={styles.bottomSheetContent}>
      {selectedMarker ? (
        <>
          <Text style={styles.markerTitle}>{selectedMarker.name}</Text>
          <Text style={styles.markerDescription}>
            {selectedMarker.description}
          </Text>
        </>
      ) : (
        <Text style={styles.noMarkerSelected}>
          Select a marker to view details
        </Text>
      )}
    </View>
  );

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    bottomSheetRef.current?.snapToIndex(0); // Use snapToIndex
  };

  // useEffect(() => {
  //   if (markers) {
  //     console.log(markers);
  //   }
  // }, [markers]);

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
                setRegion((prev) => ({
                  ...prev,
                  latitude: lat,
                  longitude: lng,
                }));
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

        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          zoomEnabled={true} // Ensure zoom gestures are enabled
          scrollEnabled={true} // Enable panning
          pitchEnabled={true} // Enable 3D tilt gestures
          rotateEnabled={true}
          // onRegionChange={(newRegion) => {
          //   setRegion(newRegion); // Dynamically update the region during pinch-and-zoom
          // }}
          // onRegionChange={handleRegionChange}
        >
          {markers
            ? markers.map((marker) => (
                <Marker
                  key={marker.id}
                  coordinate={{
                    latitude: marker.coordinate.latitude,
                    longitude: marker.coordinate.longitude,
                  }}
                  title={marker.name}
                  description={marker.description}
                  pinColor="red"
                  onPress={() => handleMarkerPress(marker)}
                ></Marker>
              ))
            : null}
        </MapView>

        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Default position (1 = closed)
          snapPoints={["50%", "25%"]} // Custom heights
          enablePanDownToClose={true} // Enable swipe down to close
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
    height: 300,
    // backgroundColor: "gray",
    zIndex: 15,
    elevation: 15, // This is important for Android
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
});
