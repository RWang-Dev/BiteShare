import { View, Text, StyleSheet } from "react-native";
import React from "react";

const UserProfileSettings = () => {
  return (
    <View>
      <Text style={styles.settingsHeader}>Profile Settings</Text>
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
});

export default UserProfileSettings;
