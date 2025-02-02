import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Redirect, useNavigation } from "expo-router";
import React from "react";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
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

const UserProfileSettings = () => {
  const userType = useAppSelector((state) => state.userProfile.userType);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const auth = getAuth(firebaseApp);

  const setUserDefault = async () => {
    try {
      if (!auth.currentUser) {
        console.log("User not authenticated");
        return;
      }
      const response = await axios.patch(
        `${API_BASE_URL}/users/updateUserType`,
        { uid: auth.currentUser.uid, newUserType: "default" }
      );
      if (response.data) {
        console.log("Successfully verified user");
        dispatch(setUserType("default"));
      }
    } catch (error) {
      console.error(error);
      alert(error);
    }
    return;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.settingsHeader}>Profile Settings</Text>
      <View style={styles.settingsContainer}>
        {userType == "default" ? (
          <Pressable
            style={({ pressed }) => [
              styles.influencerApplicationBtn,
              { backgroundColor: pressed ? "#A6A6A6" : "#EBEBEB" }, // Change background color when pressed
            ]}
            onPressOut={() =>
              navigation.navigate("InfluencerApplication" as never)
            }
          >
            <Text>Apply to be an influencer</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.influencerApplicationBtn,
              { backgroundColor: pressed ? "#A6A6A6" : "#EBEBEB" }, // Change background color when pressed
            ]}
            onPressOut={setUserDefault}
          >
            <Text>Switch back to user view</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: "#E7630A",
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "2%",
  },
  settingsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  influencerApplicationBtn: {
    width: "60%",
    height: 30,
    borderRadius: 15,
    backgroundColor: "#EBEBEB",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

export default UserProfileSettings;
