import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import React from "react";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import BackButton from "../assets/icons/BackButton";

import { useSelector, useDispatch } from "react-redux";
import { setUsername } from "@/store/slices/influencerApplication";

const InfluencerApplication = () => {
  const username = useSelector((state) => state.influencerApplication.username);
  const dispatch = useDispatch();

  const handleChange = (text) => {
    // If the text doesn't start with "@", prepend it.
    if (text && !text.startsWith("@")) {
      text = "@" + text;
    }
    dispatch(setUsername(text));
  };

  const handleSubmit = () => {
    console.log("Submitting username:", username, "for verification!");

    router.back();
  };
  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.back_button} onPressOut={() => router.back()}>
        <BackButton width={vw("7%")} height={vh("7%")} color={"#D26E22"} />
      </Pressable>
      <View style={styles.mainContent}>
        <Text style={styles.title}>Influencer Application</Text>
        <View style={styles.description}>
          <Text style={styles.descriptionTxt}>
            We require influencers to submit their Instagram profile before they
            can post on BiteShare.
          </Text>
          <Text style={styles.descriptionTxt}>
            This is necessary to ensure the consistency of high quality content
            on the platform.
          </Text>
          <Text style={styles.descriptionTxt}>
            Expect a descision within 24 hours...
          </Text>
        </View>
        <TextInput
          placeholder="@thebestfoodie"
          value={username}
          onChangeText={handleChange}
          style={styles.usernameInput}
        />
        <Pressable style={styles.submitBtn} onPressOut={handleSubmit}>
          <Text style={styles.submitBtnTxt}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  back_button: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 0,
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: 800,
    color: "#E7630A",
    // marginTop: vh("2%"),
    fontFamily: "Roboto_400Regular",
  },
  description: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    width: "65%",
    marginTop: 20,
  },
  descriptionTxt: {
    fontSize: 16,
    fontWeight: 500,
  },
  usernameInput: {
    width: "60%",
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 30,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 600,
    color: "black",
    padding: 0,
  },
  submitBtn: {
    width: "60%",
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E7630A",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  submitBtnTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfluencerApplication;
