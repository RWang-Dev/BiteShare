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

// api
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";

const UserProfileCoupons = () => {
  const auth = getAuth(firebaseApp);
  const [couponsID, setCouponsID] = useState([]);
  const [couponsData, setCouponsData] = useState([]);

  useEffect(() => {
    getClaimedCoupons();
  }, []);

  useEffect(() => {
    if (couponsID.length > 0) {
      getCouponData();
    }
  }, [couponsID]);

  const getClaimedCoupons = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/claimedCoupons/?uid=${auth.currentUser!.uid}`
      );

      console.log(response.data);

      if (response.data.coupons) {
        setCouponsID(response.data.coupons);
        console.log("PROFILE COUPONS: ", response.data.coupons);
      }
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const getCouponData = async () => {
    let tempData = [];
    for (let i = 0; i < couponsID.length; i++) {
      const id = couponsID[i];
      try {
        const response = await axios.get(`${API_BASE_URL}/coupon/?id=${id}`);

        if (response.data.couponData) {
          tempData.push(response.data.couponData);
        }
      } catch (error) {
        console.error("ERRORR GETTING COUPON Data: ", error);
      }
    }
    setCouponsData(tempData as never);
    return;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.couponScrollHeader}>My Coupons</Text>
      {couponsID.length == 0 ? (
        <View style={styles.emptyCoupons}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "gray" }}>
            Nothing here
          </Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.couponScroll}>
        {couponsData.map((data: any) => (
          <CouponItem couponData={data} key={data.id} type={"redeem"} />
        ))}
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
  emptyCoupons: {
    width: 150,
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    top: "30%",
    left: "50%",
    marginLeft: -75,
  },
});
export default UserProfileCoupons;
