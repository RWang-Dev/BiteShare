import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Redirect, useNavigation } from "expo-router";
import React from "react";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUserType } from "@/store/slices/userProfile";

const UserProfileSettings = () => {
  const userType = useAppSelector((state) => state.userProfile.userType);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

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
        ) : null}
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
