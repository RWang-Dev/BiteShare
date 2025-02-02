import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import React from "react";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import BackButton from "../assets/icons/BackButton";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUsername } from "@/store/slices/influencerApplication";
import { setUserType } from "@/store/slices/userProfile";

// server
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";

const InfluencerApplication = () => {
  const username = useAppSelector(
    (state) => state.influencerApplication.username
  );
  const auth = getAuth(firebaseApp);

  const userType = useAppSelector((state) => state.userProfile.userType);

  const dispatch = useAppDispatch();

  const handleChange = (text: string) => {
    // If the text doesn't start with "@", prepend it.
    if (text && !text.startsWith("@")) {
      text = "@" + text;
    }
    dispatch(setUsername(text));
  };

  const handleSubmit = async () => {
    console.log("Submitting username:", username, "for verification!");

    try {
      if (!auth.currentUser) {
        console.log("User not authenticated");
        return;
      }
      const response = await axios.patch(
        `${API_BASE_URL}/users/updateUserType`,
        { uid: auth.currentUser.uid, newUserType: "influencer" }
      );
      if (response.data) {
        console.log("Successfully verified user");
        dispatch(setUserType("influencer"));
        router.back();
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
    return;
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable style={styles.back_button} onPressOut={() => router.back()}>
        <BackButton width={30} height={30} color={"#ff7b00"} />
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
    position: "absolute",
    left: 15,
    top: 15,
  },
  mainContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: vh("10%"),
  },
  title: {
    fontSize: 26,
    fontWeight: 800,
    color: "#ff7b00",
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
    width: "70%",
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
    width: "80%",
    height: 50,
    backgroundColor: "#ff7b00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("4%"),
    borderRadius: 10,
  },
  submitBtnTxt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default InfluencerApplication;
