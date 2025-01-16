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
import CommentItem from "./CommentItem";

// icons
import RightArrow from "../../assets/icons/RightArrow";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setActive, setID } from "@/store/slices/couponRedemption";

const CouponItem = (props) => {
  const active = useSelector((state) => state.couponRedemption.active);
  const ID = useSelector((state) => state.couponRedemption.ID);
  const dispatch = useDispatch();

  const redeemCoupon = (key) => {
    dispatch(setActive(true));
    dispatch(setID(key));
  };

  return (
    <View style={styles.main}>
      <View style={styles.couponLogo} />
      <View style={styles.couponDescription}>
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
    justifyContent: "left",
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
