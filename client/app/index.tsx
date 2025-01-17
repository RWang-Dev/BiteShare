// react
import React, { useEffect, useState } from "react";
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
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

// Misc
import { LinearGradient } from "expo-linear-gradient";

// icons
import BackButton from "../assets/icons/BackButton";
import Cutlery from "../assets/icons/Cutlery";
import InstagramLogo from "../assets/icons/InstagramLogo";
import AppleLogo from "../assets/icons/AppleLogo";

WebBrowser.maybeCompleteAuthSession();

const AUTH0_DOMAIN = "dev-z4uimkzxx4hb8ojn.us.auth0.com";
const AUTH0_CLIENT_ID = "2Wg8giThjtn0seet8S4Vkt5NvbcZNMfz";
const App: React.FC = () => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: AUTH0_CLIENT_ID,
      responseType: AuthSession.ResponseType.Token,
      scopes: ["openid", "profile", "email"],
      redirectUri: "exp://10.136.32.187:8081",
    },
    {
      authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
    }
  );
  const navigation = useNavigation();

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token, id_token } = response.params;

      console.log("LOGIN SUCCESS");
    } else if (response?.type === "error") {
      // Handle errors
    }
  }, [response]);

  const handleLogin = () => {
    console.log("Redirect URI:", request?.redirectUri);
    console.log("Redirect URI Generated:", AuthSession.makeRedirectUri());
    promptAsync();
  };

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
              onPress={handleLogin}
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
            onPress={handleLogin}
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
            onPress={handleLogin}
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
