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
import CouponFeed from "./components/CouponFeed";
import CouponMap from "./components/CouponMap";
import UserProfile from "./components/UserProfile";

const MainLayout = () => {
  const [pageTab, setTab] = useState("Coupon"); // "Coupon", "Map", "Profile" states

  const TABS = {
    COUPON: "Coupon",
    MAP: "Map",
    PROFILE: "Profile",
  };

  const renderContent = () => {
    switch (pageTab) {
      case TABS.COUPON:
        return <CouponFeed />;
      case TABS.MAP:
        return <CouponMap />;
      case TABS.PROFILE:
        return <UserProfile />;
      default:
        return null; // Optional fallback
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.active_page}>{renderContent()}</View>
      <View style={styles.footer}>
        <Footer tab={pageTab} setTab={setTab} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // width: vw("100%"),
    // height: vh("100%"),
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    // display: "flex",
  },
  active_page: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MainLayout;
