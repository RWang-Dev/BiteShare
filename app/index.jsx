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

const App = () => {
  return (
    <View style={styles.main}>
      <LinearGradient
        colors={["#FFFFFF", "#DB7634"]} // White to Orange
        style={styles.gradient}
      >
        <Text style={styles.title}>BiteShare</Text>
        <View style={styles.center_circle}>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width={vw("55%")}
            height={vw("55%")}
          >
            <Path
              d="M80.665,73.284L54.211,51.123l6.21-7.283l0.021,0.021l1.971,1.93c3.644,3.567,6.906-1.104,6.906-1.104l13.578-17.289
	l-0.967-0.947L66.418,41.847l-1.413-1.383l14.174-16.707l-0.818-0.801l-15.59,15.302l-1.351-1.322l14.971-15.91l-0.818-0.801
	L59.168,34.749l-1.412-1.383l15.065-15.833l-0.967-0.946l-16.999,13.94c0,0-4.601,3.36-0.957,6.928l1.991,1.949l-7.599,6.761
	l-1.105-0.926l2.029-2.071L22.534,17.043c-6.737-4.735-4.655,4.754-4.655,4.754c3.87,21.37,23.043,29.838,23.043,29.838l1.411-1.44
	l0.399-0.408l0.65,0.744L19.016,72.209c-4.251,3.01-0.142,8.604,0.241,9.107l-0.004,0.004c0,0,0.006,0.006,0.019,0.015
	c0.009,0.012,0.014,0.019,0.014,0.019l0.004-0.005c0.512,0.372,6.191,4.361,9.11,0.049l20.72-24.303l22.358,25.573
	c2.598,3.848,8.102-0.349,8.598-0.739l0.004,0.004c0,0,0.005-0.006,0.015-0.018c0.012-0.01,0.018-0.015,0.018-0.015l-0.004-0.005
	C80.487,81.392,84.567,75.801,80.665,73.284z"
              fill="#D26E22"
            />
          </Svg>
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
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
              width={30}
              height={30}
            >
              <Path
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
                fill="white" // Set fill color dynamically
              />
            </Svg>
            <Link href="/create_profile" asChild>
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
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            width={27}
            height={27}
          >
            <Path
              d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              fill="black"
            />
          </Svg>
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
