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
import CommentItem from "./CommentItem";

// icons
import RightArrow from "../../assets/icons/RightArrow";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setActive, setID } from "@/store/slices/couponRedemption";

interface CouponItemProps {
  item: string;
  description: string;
  id: number;
}
const CouponItem = (props: CouponItemProps) => {
  const active = useAppSelector((state) => state.couponRedemption.active);
  const ID = useAppSelector((state) => state.couponRedemption.ID);
  const dispatch = useAppDispatch();

  const redeemCoupon = (key: number) => {
    dispatch(setActive(true));
    dispatch(setID(key));
  };

  return (
    <View style={styles.main}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <View style={styles.couponLogo}>
          <Image
            source={require("../../assets/images/jakeenos-logo.png")}
            style={styles.couponLogo}
            resizeMode="contain"
          ></Image>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            Chicken Wings
          </Text>
          <Text style={{ fontSize: 16 }}>BOGO basket 50% Off</Text>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Pressable style={styles.redeemIcon}>
          <Text style={styles.redeemText}>Claim</Text>
        </Pressable>
        <Text style={styles.expirationText}>Expires 01/31/2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF3E2",
    width: vw("92.5%"),
    height: vh("15%"),
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3b944",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flex: 1.25,
  },
  bottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin: 0,
    padding: 0,
  },
  couponLogo: {
    width: vw("15%"),
    height: vh("15%"),
    borderRadius: 30,
    marginRight: "10%",
    margin: "5%",
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  redeemIcon: {
    backgroundColor: "#e7630a",
    marginLeft: "5%",
    borderRadius: 20,
    fontSize: 18,
    padding: "2.5%",
    width: "30%",
  },
  redeemText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  expirationText: {
    marginRight: "10%",
    fontSize: 18,
  },
});

export default CouponItem;
