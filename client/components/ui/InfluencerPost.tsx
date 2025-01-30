import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import React from "react";

interface InfluencerPostProps {
  mediaURI?: string;
}
const InfluencerPost = (props: InfluencerPostProps) => {
  return (
    <View style={styles.main}>
      <Text style={styles.title}>Add a Post</Text>
      <View style={styles.postContainer}></View>
      <Text style={styles.title}>Description</Text>
      <TextInput style={styles.descriptionInput} placeholder="Description..." />
      <Pressable style={styles.shareBtn}>
        <Text style={styles.shareBtnTxt}>Share</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "800",
    fontSize: 20,
    textAlign: "center",
  },
  postContainer: {
    width: "80%",
    height: "50%",
    backgroundColor: "gray",
    borderRadius: 20,
  },
  descriptionInput: {
    width: "80%",
    height: "30%",
  },
  shareBtn: {
    backgroundColor: "blue",
    width: "50%",
    height: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  shareBtnTxt: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default InfluencerPost;
