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

const Footer = (props) => {
  return (
    <View style={styles.footer_container}>
      <Pressable onPress={() => props.setTab("Coupon")}>
        <Coupon
          width={35}
          height={35}
          color={props.tab == "Coupon" ? "#ff7b00" : "gray"}
        />
      </Pressable>

      <Pressable onPress={() => props.setTab("Map")}>
        <Location
          width={35}
          height={35}
          color={props.tab == "Map" ? "#ff7b00" : "gray"}
        />
      </Pressable>

      <Pressable onPress={() => props.setTab("Profile")}>
        <Profile
          width={35}
          height={35}
          color={props.tab == "Profile" ? "#ff7b00" : "gray"}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "white",
    width: vw("100%"),
    height: 75,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: vw("25%"),
  },
});

export default Footer;
