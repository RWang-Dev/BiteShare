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
import CouponForFeed from "./FeedCouponItem";

// icons
import Comment from "../../assets/icons/Comment";
import Reply from "../../assets/icons/Reply";
import { Lora_500Medium } from "@expo-google-fonts/dev";
import CouponItem from "./CouponItem";

import firebase from "firebase/app";
import { Timestamp } from "firebase/firestore";

interface CouponFeedItemProps {
  id?: number;
  children?: any;
}
const CouponFeedItem = (props: CouponFeedItemProps) => {
  return (
    <View style={styles.main}>
      <View style={styles.profile_container}>
        <View style={styles.profile_img} />
        <Text>Account Name {props.id}</Text>
      </View>
      <Image
        style={styles.coupon_thumbnail}
        source={require("../../assets/images/Coupon_feed_image.png")}
      />

      <View style={styles.coupon_container}>{props.children}</View>

      <View style={styles.comment_reply_container}>
        <Comment width={30} height={30} color={"black"} />
        <Reply width={30} height={30} color={"black"} />
        <Text style={styles.number_claimed}>144 people claimed</Text>
      </View>
      <View style={styles.commentsContainer}>
        <CommentItem
          username={"Username"}
          comment={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet ipsam debitis, beatae rerum itaque voluptatem, temporibus ducimus reprehenderit rem fuga quasi aliquam, illo nesciunt optio maxime. Sint esse tempore rerum."
          }
        />
      </View>
      <Text style={styles.viewAllComments}>View all 99 comments</Text>
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
    marginTop: 50,
    marginBottom: 5,
    gap: 5,
  },
  profile_img: {
    backgroundColor: "gray",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  coupon_thumbnail: {
    width: vw("100%"), // Full screen width
    height: "60%", // Allow height to adjust automatically
    resizeMode: "stretch",
    marginTop: 5,
  },
  coupon_container: {
    width: vw("100%"),
    height: "15%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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

export default CouponFeedItem;
