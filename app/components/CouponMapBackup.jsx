import React, { useState, useEffect, useRef } from "react"; // Correct hooks import
import {
  View,
  Alert,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import MagnifyingGlass from "../icons/MagnifyingGlass";

const GOOGLE_MAPS_API_KEY = "AIzaSyAYOoMzREk0iSjhjIgzVTlPB5fWURSY4Fg";

const CouponMap = () => {
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

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(); // Ensure correct permissions API
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to use this feature."
      );
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);

    setRegion({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
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

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          onPress={() => console.log("Pressing map")}
          pointerEvents="none"
        >
          {location ? (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="You are here"
              description="This is your current location."
              pinColor="blue"
            />
          ) : null}
        </MapView>
      </View>

      <View style={styles.searchContainer} listViewDisplayed={false}>
        <GooglePlacesAutocomplete
          placeholder="Search for places..."
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
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          fetchDetails={true}
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
          enablePoweredByContainer={false}
        />
        <View
          style={styles.searchBarIconContainer}
          onPress={() => console.log("pressing search container")}
        >
          <MagnifyingGlass height={25} width={25} color={"white"} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
    elevation: 0, // This is important for Android
  },
  searchContainer: {
    position: "absolute",
    top: vh("5%"),
    left: "7.5%",
    width: "85%",
    height: 300,
    // backgroundColor: "gray",
    zIndex: 15,
    elevation: 15, // This is important for Android
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
  map: {
    // position: "absolute",
    width: vw("100%"),
    height: vh("100%"),
    zIndex: 0,
    elevation: 0, // This is important for Android
  },
  mapContainer: {
    zIndex: 0,
    elevation: 0, // This is important for Android
  },
});

export default CouponMap;
