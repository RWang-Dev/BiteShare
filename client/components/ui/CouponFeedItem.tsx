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

const CouponFeedItem = () => {
  return (
    <View style={styles.main}>
      <View style={styles.profile_container}>
        <View style={styles.profile_img} />
        <Text>Account Name</Text>
      </View>
      <Image
        style={styles.coupon_thumbnail}
        source={require("../../assets/images/Coupon_feed_image.png")}
      />

      <View style={styles.coupon_container}>
        <CouponForFeed />
      </View>
    

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
    width: vw("40%"),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("5%"),
    gap: 5,
  },
  profile_img: {
    backgroundColor: "gray",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  coupon_thumbnail: {
    width: vw("100%"), // Full screen width
    height: "60%", // Allow height to adjust automatically
    resizeMode: "stretch",
    marginTop: vh("1%"),
  },
  coupon_container: {
    width: vw("100%"),
    height: "17.5%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  comment_reply_container: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginLeft: 20,
    marginRight: 20,
    marginTop: vh("0.5%"),
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
    marginBottom: vh("5%"),
    flex: 1,
  },
  viewAllComments: {
    color: "gray",
    marginLeft: 10,
    marginTop: 5,
    overflow: "visible",
    zIndex: 10,
    lineHeight: vh("3%"),
  },
});

export default CouponFeedItem;
