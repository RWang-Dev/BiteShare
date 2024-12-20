import React from "react";
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

// icons
import BackButton from "./icons/BackButton";
import Cutlery from "./icons/Cutlery";
import InstagramLogo from "./icons/InstagramLogo";
import AppleLogo from "./icons/AppleLogo";

const App = () => {
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={["#FFFFFF", "#DB7634"]} // White to Orange
        style={styles.gradient}
      >
        <Text style={styles.title}>BiteShare</Text>
        <View style={styles.center_circle}>
          <Cutlery width={vw("55%")} height={vw("55%")} />
        </View>
        <Text style={styles.header}>The Food App</Text>
        <Text style={styles.description}>
          Find new restaurants, events, and deals in your area...
        </Text>
        <View style={styles.login_item}>
          <LinearGradient
            colors={["#E43D39", "#A74689"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.instagram_gradient}
          >
            <InstagramLogo width={30} height={30} />
            <Link href="/CreateProfile" asChild>
              <Pressable>
                <Text style={styles.instagram_text}>
                  Sign in with Instagram
                </Text>
              </Pressable>
            </Link>
          </LinearGradient>
        </View>
        <View style={styles.login_item}>
          <Image
            source={require("../assets/images/google.png")}
            style={styles.google_logo}
          />
          <Text style={styles.center_text}>Continue with Google</Text>
        </View>
        <View style={styles.login_item}>
          <AppleLogo width={27} height={27} />
          <Text style={styles.center_text}>Continue with Apple</Text>
        </View>
      </LinearGradient>
    </View>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: vw("100%"),
    height: vh("100%"),
  },
  main: {
    width: vw("100%"),
    height: vh("100%"),
  },

  title: {
    fontSize: 30,
    fontWeight: 800,
    color: "#ff7b00",
    marginTop: vh("2%"),
    fontFamily: "Roboto_400Regular",
  },
  center_circle: {
    backgroundColor: "#D26E225E",
    marginTop: vh("7%"),
    width: vw("65%"),
    height: vw("65%"),
    borderRadius: vw("32.5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cutlery: {
    width: vw("50%"),
    height: vw("50%"),
    opacity: 1,
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: vh("5%"),
    color: "white",
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: "10",
    width: vw("80%"),
    color: "white",
    textAlign: "center",
    marginBottom: vh("2%"),
  },
  login_item: {
    width: vw("80%"),
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    marginTop: vh("1.5%"),
    marginBottom: vh("1.5%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  center_text: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  instagram_gradient: {
    width: vw("80%"),
    height: 40,
    borderRadius: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  instagram_text: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  google_logo: {
    width: 25,
    height: 25,
  },
});

export default App;
