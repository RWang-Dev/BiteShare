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

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "@/store/slices/mainLayout";

const Footer = (props) => {
  const pageTab = useSelector((state) => state.mainLayout.tab);
  const dispatch = useDispatch();

  return (
    <View style={styles.footer_container}>
      <Pressable
        style={styles.footer_button}
        // style={({ pressed }) => [
        //   styles.footer_button,
        //   { backgroundColor: pressed ? "#5C5C5C7D" : "white" }, // Change background color when pressed
        // ]}
        onPress={() => dispatch(setTab("Coupon"))}
      >
        <Coupon
          width={35}
          height={35}
          color={pageTab == "Coupon" ? "#ff7b00" : "gray"}
        />
      </Pressable>

      <Pressable
        style={styles.footer_button}
        // style={({ pressed }) => [
        //   styles.footer_button,
        //   { backgroundColor: pressed ? "#5C5C5C7D" : "white" }, // Change background color when pressed
        // ]}
        onPress={() => dispatch(setTab("Map"))}
      >
        <Location
          width={35}
          height={35}
          color={pageTab == "Map" ? "#ff7b00" : "gray"}
        />
      </Pressable>

      <Pressable
        style={styles.footer_button}
        // style={({ pressed }) => [
        //   styles.footer_button,
        //   { backgroundColor: pressed ? "#5C5C5C7D" : "white" }, // Change background color when pressed
        // ]}
        onPress={() => dispatch(setTab("Profile"))}
      >
        <Profile
          width={35}
          height={35}
          color={pageTab == "Profile" ? "#ff7b00" : "gray"}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  footer_container: {
    backgroundColor: "white",
    width: vw("100%"),
    height: 65,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: vw("15%"),
  },

  footer_button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Footer;
