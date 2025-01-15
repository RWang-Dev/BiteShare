import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

// icons
import Images from "../../assets/icons/Images";
import Video from "../../assets/icons/Video";

const UserProfilePosts = () => {
  const posts = [];

  for (let i = 0; i < 20; i++) {
    if (i % 2 == 0) {
      posts.push(
        <View key={i} style={styles.imageCropper}>
          <Image
            source={require("../../assets/images/Coupon_feed_image.png")}
            style={styles.image}
          />
          <View style={styles.postIcon}>
            <Video width={15} height={15} color={"white"} />
          </View>
        </View>
      );
    } else {
      posts.push(
        <View key={i} style={styles.imageCropper}>
          <Image
            source={require("../../assets/images/pancakes.jpg")}
            style={styles.image}
          />
          <View style={styles.postIcon}>
            <Images width={15} height={15} color={"white"} />
          </View>
        </View>
      );
    }
  }

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.postsContent}>
        {posts}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    display: "flex",
    flex: 1,
    alignItems: "center",
  },
  postsContent: {
    marginTop: 5,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    overflow: "scroll",
    gap: vw("0.5%"),
  },
  imageCropper: {
    width: vw("32.5%"), // Width of the square crop area
    height: vw("32.5%"), // Height of the square crop area
    overflow: "hidden", // Ensures anything outside the square is hidden
    position: "relative", // Ensure postIcon positions relative to this container
  },
  image: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  postIcon: {
    position: "absolute",
    top: 5,
    right: 5,
    zIndex: 2,
  },
});
export default UserProfilePosts;
