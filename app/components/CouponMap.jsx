import React, { useState, useEffect } from "react"; // Correct hooks import
import { View, Alert, StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const CouponMap = () => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

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

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <View style={styles.container}>
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
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default CouponMap;
