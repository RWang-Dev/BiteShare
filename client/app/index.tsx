// react
import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link, useNavigation } from "expo-router";

// Auth0
import auth0 from "@/auth0";
import { useAuth0, Auth0Provider } from "react-native-auth0";

// Misc
import { LinearGradient } from "expo-linear-gradient";

// icons
import BackButton from "../assets/icons/BackButton";
import Cutlery from "../assets/icons/Cutlery";
import InstagramLogo from "../assets/icons/InstagramLogo";
import AppleLogo from "../assets/icons/AppleLogo";

const App: React.FC = () => {
  const { authorize, clearSession, user, error, isLoading } = useAuth0();
  const navigation = useNavigation();

  const onLogin = async () => {
    try {
      await authorize();
      console.log("Authorized");
      console.log(user);
      navigation.navigate("CreateProfile" as never);
    } catch (e) {
      console.log(e);
    }
  };

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  const loggedIn = user !== undefined && user !== null;

  const authenticateUser = async (
    method: "google-oauth2" | "apple" | "instagram"
  ) => {
    try {
      const result = await auth0.webAuth.authorize({
        connection: method,
        scope: "openid profile email",
      });
      console.log("Access Token: ", result.accessToken);
      console.log(
        "User Info: ",
        await auth0.auth.userInfo({ token: result.accessToken })
      );
    } catch (error) {
      console.error("Authentication error: ", error);
    }
  };

  return (
    <View style={styles.main}>
      <LinearGradient
        colors={["#FFFFFF", "#DB7634"]} // White to Orange
        style={styles.gradient}
      >
        <Text style={styles.title}>BiteShare</Text>
        <View style={styles.center_circle}>
          <Cutlery width={vw("55%")} height={vw("55%")} color={"#D26E22"} />
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
            {/* <Link href={"/CreateProfile"} asChild> */}
            <Pressable
              // onPress={() => authenticateUser("instagram")}
              onPress={onLogin}
              style={styles.loginItemBtn}
            >
              <InstagramLogo width={30} height={30} color={"white"} />
              <Text style={styles.instagram_text}>Sign in with Instagram</Text>
            </Pressable>
            {/* </Link> */}
          </LinearGradient>
        </View>
        <View style={styles.login_item}>
          {/* <Link href="/CreateProfile" asChild> */}
          <Pressable
            // onPress={() => authenticateUser("google-oauth2")}
            onPress={onLogin}
            style={styles.loginItemBtn}
          >
            <Image
              source={require("../assets/images/google.png")}
              style={styles.google_logo}
            />
            <Text style={styles.center_text}>Continue with Google</Text>
          </Pressable>
          {/* </Link> */}
        </View>
        <View style={styles.login_item}>
          {/* <Link href="/CreateProfile" asChild> */}
          <Pressable
            // onPress={() => authenticateUser("apple")}
            onPress={onLogin}
            style={styles.loginItemBtn}
          >
            <AppleLogo width={27} height={27} color={"black"} />
            <Text style={styles.center_text}>Continue with Apple</Text>
          </Pressable>
          {/* </Link> */}
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
    marginTop: 10,
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
  loginItemBtn: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
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
// export { default } from "./InfluencerApplication";
