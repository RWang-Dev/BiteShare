import React, { useState, useEffect, FC } from "react";
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
import Footer from "../components/ui/Footer";
import CouponFeed from "../components/ui/CouponFeed";
import CouponMap from "../components/ui/CouponMap";
import UserProfile from "../components/ui/UserProfile";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTab } from "@/store/slices/mainLayout";

const MainLayout: FC = () => {
  const pageTab = useAppSelector((state) => state.mainLayout.tab); // "Coupon", "Map", "Profile" states

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
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={styles.main}>
          <View style={styles.active_page}>{renderContent()}</View>
          <View style={styles.footer}>
            <Footer />
          </View>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "relative",
  },
  active_page: {
    width: vw("100%"),
    height: vh("100%") - 65,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MainLayout;
