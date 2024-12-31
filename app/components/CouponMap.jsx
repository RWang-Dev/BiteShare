import React, { useState, useEffect } from "react"; // Correct hooks import
import { View, Alert, StyleSheet, Dimensions, TextInput } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

import MagnifyingGlass from "../icons/MagnifyingGlass";

const CouponMap = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearch = () => {
    // Handle the search logic here, e.g., call an API to fetch results
    Alert.alert("Search Query", `You searched for: ${searchQuery}`);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <View style={styles.searchBarIconContainer}>
          <MagnifyingGlass height={25} width={25} color={"white"} />
        </View>
        <TextInput
          style={styles.searchBar}
          placeholder="Search for restaurants, places, etc."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch} // Trigger search when user presses "Enter"
        />
      </View>
      <MapView style={styles.map} region={region}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="You are here"
            description="This is your current location."
            pinColor="blue"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBarContainer: {
    position: "absolute",
    top: vh(5),
    width: "85%",
    alignSelf: "center",
    zIndex: 1, // Ensure the search bar appears above the map
  },
  searchBarIconContainer: {
    position: "absolute",
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#ff7b00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  searchBar: {
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "#ff7b00",
    borderRadius: 22.5,
    height: 45,
    padding: 10,
    paddingLeft: 50,
    elevation: 3, // Adds shadow on Android
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    fontSize: 16,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default CouponMap;
