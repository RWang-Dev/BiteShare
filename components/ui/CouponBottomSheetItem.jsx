import React, { userState, useEffect } from "react";
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

// icons
import Comment from "../../assets/icons/Comment";
import Reply from "../../assets/icons/Reply";
import { Lora_500Medium } from "@expo-google-fonts/dev";

const CouponBottomSheetItem = () => {
  return (
    <View style={styles.main}>
      <View style={styles.coupon_container}>
        <View style={styles.coupon_description}>
          <Text style={styles.coupon_food_item}>Pancakes</Text>
          <Pressable style={styles.claim_coupon_btn}>
            <Text style={styles.claim_coupon_btn_txt}>
              Buy One Basket Get One 50% Off
            </Text>
          </Pressable>
          <Text>
            Duration:{" "}
            <Text style={{ fontWeight: "bold" }}>12 days left...</Text>
          </Text>
        </View>
      </View>
      <View style={styles.couponThumbnailContainer}>
        <Image
          style={styles.couponThumbnail}
          source={require("../../assets/images/pancakes.jpg")}
        />
      </View>

      <View style={styles.profile_container}>
        <View style={styles.profile_img} />
        <Text>Account Name</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: vw("100%"),
    height: vh("100%") - 65,
    backgroundColor: "white",
  },
  profile_container: {
    width: 150,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 15,
  },
  profile_img: {
    backgroundColor: "gray",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  couponThumbnail: {
    width: "100%",
    height: "auto",
    aspectRatio: 0.75, // Remove this if you want the original aspect ratio
    resizeMode: "cover", // or 'contain', based on preference
  },
  couponThumbnailContainer: {
    width: "100%",
    height: "75%",
    overflow: "hidden",
  },
  coupon_container: {
    width: vw("100%"),
    height: "15%",
    display: "flex",
    gap: 15,
    flexDirection: "row",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#FFF0E2",
    // borderColor: "black",
    // borderTopWidth: 1,
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  coupon_logo: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: "gray",
    marginLeft: 10,
  },
  coupon_description: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    gap: 5,
  },
  coupon_food_item: {
    fontSize: 20,
    fontWeight: "900",
    color: "black",
  },
  claim_coupon_btn: {
    backgroundColor: "#7ED957",
    width: "90%",
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  claim_coupon_btn_txt: {
    fontWeight: "bold",
    color: "white",
  },
  comment_reply_container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  number_claimed: {
    position: "absolute",
    right: 0,
    fontWeight: "bold",
  },
  commentsContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
    marginLeft: 10,
  },
  viewAllComments: {
    color: "gray",
    marginLeft: 10,
  },
});

export default CouponBottomSheetItem;
