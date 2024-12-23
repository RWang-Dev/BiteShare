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

const Coupons = () => {
  return (
    <View style={styles.main}>
      <Text>Coupons</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "red",
    width: vw("100%"),
    height: vh("100%") - 75,
  },
});

export default Coupons;
