import React, { userState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Alert
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
import RightArrow from "../icons/RightArrow";

const CouponForFeed = () => {
    {/* Replace with redeem functionality */}
    const handlePress = () => {
      Alert.alert("Coupon claimed")
    }

  return (
    <View style={styles.main}>
      
      {/* Top Section */}
      <View style={styles.topSection}>
      <View style={styles.couponLogo}>
        <Image source={require('../../assets/images/jakeenos-logo.jpeg')} style={styles.couponLogo}>
        </Image>
      </View>
      <View style={{alignItems:"center"}}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>Chicken Wings</Text>
        <Text style={{ fontSize: 16 }}>BOGO basket 50% Off</Text>
      </View>
      </View>
      
      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Pressable style={styles.redeemIcon} onPress={handlePress}>
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
    width: vw("100%"),
    height: vh("15%"),
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "center",
    position: "relative",
    overflow: 'hidden',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
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
    backgroundColor:"white",
    width: "100%",
    flex: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    margin:0,
    padding:0,
  },
  couponLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 50,
    margin: 10,
    justifyContent: 'center',
  },
  redeemIcon: {
    backgroundColor: "#e7630a",
    marginLeft: "5%",
    borderRadius: 20,
    fontSize: 18,
    padding: 10,
    width: "30%",
  },
  redeemText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
  expirationText: {
    marginRight: "10%",
    fontSize: 18,
  },
});

export default CouponForFeed;
