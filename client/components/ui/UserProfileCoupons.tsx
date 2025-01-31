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
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    getClaimedCoupons();
  }, []);

  const getClaimedCoupons = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/claimedCoupons/?uid=${auth.currentUser!.uid}`
      );

      console.log(response.data);

      if (response.data.coupons) {
        setCoupons(response.data.coupons);
      }
    } catch (error) {
      console.error(error);
    }
    return;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.couponScrollHeader}>My Coupons</Text>
      {coupons.length == 0 ? (
        <View style={styles.emptyCoupons}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "gray" }}>
            Nothing here
          </Text>
        </View>
      ) : null}
      <ScrollView contentContainerStyle={styles.couponScroll}>
        {coupons.map((coupon: any) => (
          <CouponItem
            key={coupon.id}
            id={coupon.id}
            item={coupon.id}
            description={"BOGO basket 50% Off"}
          />
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
