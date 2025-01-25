import { View, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import React from "react";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setActive, setID } from "@/store/slices/couponRedemption";

interface CouponRedemptionPopupProps {
  id: number | null;
}
const CouponRedemptionPopup = (props: CouponRedemptionPopupProps) => {
  const active = useAppSelector((state) => state.couponRedemption.active);
  const ID = useAppSelector((state) => state.couponRedemption.ID);
  const dispatch = useAppDispatch();
  const [couponData, setCouponData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    getCouponByID(props.id);
  }, []);

  useEffect(() => {
    console.log(couponData.title, couponData.description);
  }, [couponData]);

  const getCouponByID = async (id: number | null) => {
    setCouponData({
      title: "Chicken Wings " + id,
      description: "BOGO basket 50% Off",
    });
  };

  const cancelRedemption = async () => {
    dispatch(setActive(false));
    dispatch(setID(null));
  };

  return (
    <View style={styles.main}>
      <View style={styles.popupHeader}>
        <View style={styles.popupLogo} />
        <Text style={{ fontSize: 24 }}>Restaurant Name</Text>
      </View>

      <View style={styles.popupContent}>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 24 }}>
            {couponData.title}
          </Text>
          <Text style={{ fontSize: 24 }}>{couponData.description}</Text>
        </View>
        <Text style={styles.couponCode}>7356</Text>
        <View style={{ display: "flex", alignItems: "center" }}>
          <Text style={{ fontWeight: "bold", fontSize: 30 }}>4/16/2025</Text>
          <Text style={{ fontWeight: "900", fontSize: 50 }}>4:36</Text>
        </View>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.cancelRedemptionBtn,
          { backgroundColor: pressed ? "#ac5a1c" : "#D26E22" }, // Change background color when pressed
        ]}
        onPressOut={cancelRedemption}
      >
        <Text style={{ fontWeight: "900", fontSize: 20, color: "white" }}>
          Cancel
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFF0E2",
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    gap: 20,
    alignItems: "center",
  },
  popupHeader: {
    position: "absolute",
    top: 20,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  popupLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "gray",
  },
  popupContent: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  couponCode: {
    fontSize: 75,
    fontWeight: "900",
    color: "#D26E22",
  },
  cancelRedemptionBtn: {
    display: "flex",
    position: "absolute",
    bottom: 40,
    justifyContent: "center",
    backgroundColor: "#D26E22",
    alignItems: "center",
    width: vw("55%"),
    height: 60,
    borderColor: "black",
    borderRadius: 30,
    borderWidth: 5,
  },
});

export default CouponRedemptionPopup;
