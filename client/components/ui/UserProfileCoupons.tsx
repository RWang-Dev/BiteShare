import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";

import CouponItem from "./CouponItem";
import CouponRedemptionPopup from "./CouponRedemptionPopup";
import CouponForFeed from "./FeedCouponItem";

import DefaultUser from "../../assets/icons/DefaultUser";
import Profile from "../../assets/icons/Profile";

const UserProfileCoupons = () => {
  const coupons = [];

  for (let i = 0; i < 5; i++) {
    coupons.push(
      <CouponItem
        key={i}
        id={i}
        item={"Chicken Wings " + i}
        description={"BOGO basket 50% Off"}
      />
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.couponScrollHeader}>My Coupons</Text>

      <ScrollView contentContainerStyle={styles.couponScroll}>
        {coupons.map((coupon) => coupon)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  couponScrollHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: "#E7630A",
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "2%",
  },
  couponScroll: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
export default UserProfileCoupons;
