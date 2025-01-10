import { View, Text, StyleSheet } from "react-native";
import React from "react";

const UserProfileDashboard = () => {
  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.settingsHeader}>Dashboard</Text>
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

export default UserProfileDashboard;
