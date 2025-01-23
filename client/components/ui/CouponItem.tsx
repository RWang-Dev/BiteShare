import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { widthPercentageToDP as vw, heightPercentageToDP as vh } from "react-native-responsive-screen";

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
      {/* Left Section - Logo */}
      <View style={styles.couponLogoContainer}>
        <Image
          source={require("../../assets/images/jakeenos-logo.png")}
          style={styles.couponLogo}
          resizeMode="contain"
        />
      </View>

      {/* Middle Section - Coupon Details */}
      <View style={styles.couponDetails}>
        <Text style={styles.couponTitle}>{props.item}</Text>
        <Text style={styles.couponDescription}>{props.description}</Text>
      </View>

      {/* Right Section - Claim Button */}
      <Pressable style={styles.redeemIcon} onPress={() => redeemCoupon(props.id)}>
        <Text style={styles.redeemText}>Claim</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF3E2",
    width: vw("92.5%"),
    height: vh("15%"),
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    paddingHorizontal: vw("3%"),
  },
  couponLogoContainer: {
    width: vw("15%"),
    height: vh("15%"),
    justifyContent: "center",
    alignItems: "center",
  },
  couponLogo: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  couponDetails: {
    flex: 1,
    justifyContent: "center",
  },
  couponTitle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  couponDescription: {
    fontSize: 16,
  },
  redeemIcon: {
    backgroundColor: "#e7630a",
    borderRadius: 20,
    paddingVertical: vh("1.5%"),
    paddingHorizontal: vw("5%"),
  },
  redeemText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

export default CouponItem;
