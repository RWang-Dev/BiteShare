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
      <View style={styles.couponLogo} />
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{props.item}</Text>
        <Text style={{ fontSize: 16 }}>{props.description}</Text>
      </View>
      <Pressable
        style={styles.redeemIcon}
        onPressOut={() => {
          redeemCoupon(props.id);
        }}
      >
        <RightArrow width={30} height={30} color={"black"} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF0E2",
    width: vw("95%"),
    height: 75,
    borderRadius: 37.5,
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    // justifyContent: "left",
    alignItems: "center",
    position: "relative",
    paddingLeft: 10,
    gap: 20,
  },
  couponLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "gray",
  },
  redeemIcon: {
    position: "absolute",
    right: 15,
  },
});

export default CouponItem;
