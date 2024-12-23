import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";

// Components
import Footer from "./components/Footer";

const MainLayout = () => {
  const [pageTab, setTab] = useState("Coupon"); // "Coupon", "Map", "Profile" states

  return (
    <View style={styles.main}>
      <Text>Main Layout Here</Text>
      <View style={styles.footer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // width: vw("100%"),
    // height: vh("100%"),
    flex: 1,
    backgroundColor: "green",
    position: "relative",
    // display: "flex",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MainLayout;
