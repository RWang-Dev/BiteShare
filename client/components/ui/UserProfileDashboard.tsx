import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import * as ImagePicker from "expo-image-picker";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

import CouponItem from "./CouponItem";

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

const UserProfileDashboard = () => {
  const [couponsID, setCouponsID] = useState([]);
  const [couponsData, setCouponsData] = useState([]);
  const auth = getAuth(firebaseApp);

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
        console.log("DASHBOARD COUPONS: ", response.data.coupons);
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
      <ScrollView>
        <Text style={styles.settingsHeader}>My Dashboard</Text>

        {/*User Stats Section*/}
        <View style={styles.dashboardStats}>
          <View style={styles.statItem}>
            <Text style={styles.statTxtLeft}>Total Coupons Claimed</Text>
            <Text style={styles.statTxtRight}>487</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statTxtLeft}>Total Coupons Used</Text>
            <Text style={styles.statTxtRight}>358</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statTxtLeft}>Total Coupons Available</Text>
            <Text style={styles.statTxtRight}>129</Text>
          </View>

          <View style={styles.statItem}>
            <Text style={styles.statTxtLeft}>Total Money Earned</Text>
            <Text style={styles.statTxtRight}>$999,999</Text>
          </View>
        </View>

        <Text style={styles.settingsHeader}>Deals to Promote</Text>
        <View style={styles.dealsContainer}>
          <ScrollView
            nestedScrollEnabled={true}
            contentContainerStyle={styles.dealsScroll}
          >
            {couponsData.map((data: any) => (
              <CouponItem couponData={data} key={data.id} type={"promote"} />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: "#E7630A",
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "2%",
  },
  dashboardStats: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#E7630A",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    margin: 5,
    marginLeft: 15,
    marginRight: 15,
    justifyContent: "center",
  },
  statTxtLeft: {
    position: "absolute",
    left: 0,
    fontWeight: "bold",
    fontSize: 16,
    margin: 5,
    marginLeft: 20,
  },
  statTxtRight: {
    position: "absolute",
    right: 0,
    fontWeight: "bold",
    fontSize: 14,
    margin: 5,
    marginRight: 20,
  },
  dealsContainer: {
    height: vh("50%"), // Ensure the inner ScrollView has a fixed height
    marginBottom: vh("5%"),
  },
  dealsScroll: {
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});

export default UserProfileDashboard;
