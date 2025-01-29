import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import CouponFeedItem from "./CouponFeedItem";

const CouponFeed = () => {
  return (
    <ScrollView
      style={styles.main}
      contentContainerStyle={styles.scrollContainer}
    >
      {/* <Text style={styles.couponFeedTitle}>Coupon Feed</Text> */}
      <View style={styles.itemContainer}>
        <CouponFeedItem />
      </View>
      <View style={styles.itemContainer}>
        <CouponFeedItem />
      </View>
      <View style={styles.itemContainer}>
        <CouponFeedItem />
      </View>
      <View style={styles.itemContainer}>
        <CouponFeedItem />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    width: vw("100%"),
    height: vh("100%") - 65, // Adjust for footer height
    display: "flex",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20, // Optional: Adds spacing at the bottom of the entire scroll content
  },
  itemContainer: {
    // marginVertical: 10, // Adds spacing only to the top and bottom of each item
    marginBottom: 5,
  },
  couponFeedTitle: {
    width: 100,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default CouponFeed;
