import React, { userState, useEffect } from "react";
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

import DefaultUser from "../icons/DefaultUser";
import Profile from "../icons/Profile";

const UserProfileCoupons = () => {
  return (
    <View>
      <Text style={styles.couponScrollHeader}>My Coupons</Text>
      <ScrollView contentContainerStyle={styles.couponScroll}>
        <View>
          <CouponItem />
        </View>
        <View>
          <CouponItem />
        </View>
        <View>
          <CouponItem />
        </View>
        <View>
          <CouponItem />
        </View>
        <View>
          <CouponItem />
        </View>
        <View>
          <CouponItem />
        </View>
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
