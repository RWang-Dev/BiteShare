import React, { userState, useEffect } from "react";
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

// icons
import Coupon from "../icons/Coupon";
import Location from "../icons/Location";
import Profile from "../icons/Profile";

const Footer = () => {
  return (
    <View>
      <Coupon width={30} height={30} color={"black"} />
      <Location width={30} height={30} color={"black"} />
      <Profile width={30} height={30} color={"black"} />
    </View>
  );
};

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "lightgray",
    width: vw("100%"),
    height: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
});

export default Footer;
