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
    <View>
      <Text>Main Layout</Text>
      <Footer></Footer>
    </View>
  );
};

// const styles = StyleSheet.create({
//   footer,
// });

export default MainLayout;
