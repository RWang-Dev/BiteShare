import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import CouponItem from "./CouponItem";

const UserProfileDashboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.settingsHeader}>My Dashboard</Text>
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
          <Text style={styles.statTxtLeft}>Total Money Earned</Text>
          <Text style={styles.statTxtRight}>$999,999</Text>
        </View>
      </View>
      <Text style={styles.settingsHeader}>Deals to Promote</Text>
      <ScrollView contentContainerStyle={styles.dealsScroll}>
        <CouponItem />
        <CouponItem />
        <CouponItem />
        <CouponItem />
        <CouponItem />
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
    display: "flex",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "column",
    gap: 5,
  },
  statItem: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 30,
  },
  statTxtLeft: {
    position: "absolute",
    left: 0,
    fontWeight: "bold",
    fontSize: 16,
  },
  statTxtRight: {
    position: "absolute",
    right: 0,
    fontWeight: "bold",
    fontSize: 14,
  },
  dealsScroll: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});

export default UserProfileDashboard;
