import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

const CommentItem = (props) => {
  const truncateComment = (comment, num_chars) => {
    let result = "";
    if (num_chars >= comment.length) {
      return comment;
    }

    for (let i = 0; i < num_chars; i++) {
      result += comment[i];
    }
    return result;
  };

  return (
    <View style={styles.main}>
      <Text style={styles.username}> {props.username} </Text>
      <Text style={styles.comment}>
        {" "}
        {truncateComment(props.comment, 100)}
        <Text style={{ color: "gray" }}> ... more</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: vw("100%"),
    height: 60,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  username: {
    fontWeight: "bold",
    color: "black",
  },
  comment: {
    color: "black",
  },
});
export default CommentItem;
