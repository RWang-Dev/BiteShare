import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import CommentItem from "./CommentItem";
import { Timestamp } from "firebase/firestore";

// server
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { removeCoupon } from "@/store/slices/couponFeed";

interface CouponForFeedProps {
  couponDetails: any;
  idx: number;
  type: string;
}
const CouponForFeed = (props: CouponForFeedProps) => {
  const dispatch = useAppDispatch();
  const auth = getAuth(firebaseApp);

  const handlePress = async () => {
    const couponid = props.couponDetails.id;
    const userid = auth.currentUser!.uid;

    try {
      const response = await axios.post(`${API_BASE_URL}/claimCoupon`, {
        uid: userid,
        couponid: couponid,
        type: props.type,
      });
      if (response.data) {
        Alert.alert("Coupon claimed: ", props.couponDetails.id);
        dispatch(removeCoupon(props.idx));
      }
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const renderExpireDate = (timestamp: {
    _seconds: number;
    _nanoseconds: number;
  }) => {
    const date = new Date(timestamp._seconds * 1000);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return <Text style={styles.expirationText}>Expires {formattedDate}</Text>;
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
        <Pressable style={styles.redeemIcon} onPress={handlePress}>
          <Text style={styles.redeemText}>
            {props.type == "Claim" ? "Claim" : "Promote"}
          </Text>
        </Pressable>
        {props.couponDetails.expiryDate
          ? renderExpireDate(props.couponDetails.expiryDate)
          : renderExpireDate(props.couponDetails.validUntil)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF3E2",
    width: vw("100%"),
    height: vh("15%"),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    // overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: "2.5%",
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3b944",
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

export default CouponForFeed;
