import { View, Text, StyleSheet, Pressable } from "react-native";
import { Link, Redirect, useNavigation } from "expo-router";
import React from "react";

const UserProfileSettings = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.settingsHeader}>Profile Settings</Text>
      <View style={styles.settingsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.influencerApplicationBtn,
            { backgroundColor: pressed ? "#A6A6A6" : "#EBEBEB" }, // Change background color when pressed
          ]}
          onPressOut={() => navigation.navigate("InfluencerApplication")}
        >
          <Text>Apply to be an influencer</Text>
        </Pressable>
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
