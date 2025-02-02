import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import CommentItem from "./CommentItem";
import * as ImagePicker from "expo-image-picker";

// icons
import RightArrow from "../../assets/icons/RightArrow";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setActive as setActivePost,
  setMedia,
} from "@/store/slices/influencerPost";
import {
  setActive as setActiveRedeem,
  setID,
} from "@/store/slices/couponRedemption";

interface CouponItemProps {
  couponData: any;
  type: string;
}
const CouponItem = (props: CouponItemProps) => {
  const active = useAppSelector((state) => state.couponRedemption.active);
  const ID = useAppSelector((state) => state.couponRedemption.ID);
  const dispatch = useAppDispatch();

  const postActive = useAppSelector((state) => state.influencerPost.active);
  const media = useAppSelector((state) => state.influencerPost.media);

  useEffect(() => {
    console.log("PROPS TYPE: ", props.type);
  }, []);

  const redeemCoupon = (key: number) => {
    dispatch(setActiveRedeem(true));
    dispatch(setID(key));
  };

  const renderExpireDate = (timestamp: {
    _nanoseconds: number;
    _seconds: number;
  }) => {
    const date = new Date(timestamp._seconds * 1000);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    return <Text style={styles.expirationText}>Expires {formattedDate}</Text>;
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setMedia(result.assets[0].uri));
      dispatch(setActivePost(true));
    }
  };

  const togglePostTab = async () => {
    await pickImage();
    alert("Post tab");
    return;
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
        <Pressable
          style={styles.redeemIcon}
          onPressOut={
            props.type == "redeem" ? () => redeemCoupon(0) : togglePostTab
          }
        >
          <Text style={styles.redeemText}>
            {props.type == "redeem" ? "Redeem" : "Promote"}
          </Text>
        </Pressable>
        {props.couponData.expiryDate
          ? renderExpireDate(props.couponData.expiryDate)
          : renderExpireDate(props.couponData.validUntil)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#FFF3E2",
    width: vw("92.5%"),
    height: vh("15%"),
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
  },
  topSection: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3b944",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
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
    fontSize: 12,
  },
});

export default CouponItem;
