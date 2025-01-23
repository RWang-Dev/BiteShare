import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

import CouponItem from "./CouponItem";

const UserProfileDashboard = () => {
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

      {/*Deals Section*/}
      <Text style={styles.settingsHeader}>Deals to Promote</Text>
      <ScrollView contentContainerStyle={styles.dealsScroll}>
        {coupons.map((coupon) => coupon)}
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
    flex:1,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#E7630A",
    shadowOpacity: 0.5,
    shadowOffset: {width:0, height:2},
    margin: 5,
    marginLeft: 15,
    marginRight:15,
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
  dealsScroll: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
});

export default UserProfileDashboard;
