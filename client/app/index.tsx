// react
import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  Pressable,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import { useNavigation } from "@react-navigation/native";

// Auth
import PhoneInput from "react-native-phone-number-input";
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

// Misc
import { LinearGradient } from "expo-linear-gradient";

// icons
import BackButton from "../assets/icons/BackButton";
import Cutlery from "../assets/icons/Cutlery";
import InstagramLogo from "../assets/icons/InstagramLogo";
import AppleLogo from "../assets/icons/AppleLogo";
import Email from "@/assets/icons/Email";

// server
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { login, logout } from "@/store/slices/userAuth";
// import { TextInput } from "react-native-gesture-handler";

const AUTH0_DOMAIN = "dev-z4uimkzxx4hb8ojn.us.auth0.com";
const AUTH0_CLIENT_ID = "2Wg8giThjtn0seet8S4Vkt5NvbcZNMfz";

const App: React.FC = () => {
  // const [phoneNumber, setPhoneNumber] = useState("");
  const auth = getAuth(firebaseApp);
  auth.settings.appVerificationDisabledForTesting = true;

  const phoneInput = useRef<PhoneInput>(null);
  const [number, setNumber] = useState("");
  const [formattedNumber, setFormattedNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    checkUserAuth();
  }, []);

  const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal | null>(null);

  const navigation = useNavigation();

  const checkUserAuth = async () => {
    if (auth.currentUser) {
      try {
        const user = auth.currentUser;
        const response = await axios.get(`${API_BASE_URL}/users/${user.uid}`);
        if (response.data.username) {
          navigation.navigate("MainLayout" as never);
        } else {
          navigation.navigate("CreateProfile" as never);
        }
      } catch (error) {
        console.error("Error checking user authentication: ", error);
      }
    } else {
      console.log("No authenticated user found.");
    }
  };

  const sendVerification = async () => {
    try {
      // 'verifyPhoneNumber' requires a PhoneAuthProvider instance
      const phoneProvider = new PhoneAuthProvider(auth);
      console.log("SENDING VERIFICATION TO NUMBER: ", formattedNumber);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedNumber,
        recaptchaVerifier.current!
      );
      // setVerificationId(id);
      console.log("VERIFICATION ID: ", verificationId);

      alert("Verification code has been sent to your phone.");
      (navigation.navigate as any)("VerifyPhone", {
        verificationId: verificationId,
      });
    } catch (err) {
      console.error("Error sending verification code:", err);
      alert("Failed to send verification code");
    }
    // (navigation.navigate as any)("VerifyPhone", { verificationId });
  };

  return (
    <View style={styles.main}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification={true}
      />
      <Text style={styles.title}>BiteShare</Text>
      <View style={styles.center_circle}>
        <Cutlery width={vw("55%")} height={vw("55%")} color={"#ff7b00"} />
      </View>
      <Text style={styles.description}>Find new deals in your area...</Text>

      <PhoneInput
        ref={phoneInput}
        defaultValue={number}
        defaultCode="US"
        layout="first"
        onChangeText={(text) => {
          setNumber(text);
        }}
        onChangeFormattedText={(text) => {
          setFormattedNumber(text);
        }}
        withDarkTheme={false}
        withShadow={true}
        autoFocus
        containerStyle={styles.phoneNumberContainer}
        textContainerStyle={styles.phoneNumberInputTxtContainer}
      />
      <Pressable
        style={({ pressed }) => [
          styles.continueBtn,
          { backgroundColor: pressed ? "#E16C00" : "#ff7b00" }, // Change background color when pressed
        ]}
        onPressOut={sendVerification}
      >
        <Text style={styles.continueBtnTxt}>Continue</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    display: "flex",
  },

  title: {
    fontSize: 30,
    fontWeight: 800,
    color: "#ff7b00",
    marginTop: vh("2%"),
    fontFamily: "Roboto_400Regular",
  },
  center_circle: {
    backgroundColor: "#ff7b0040",
    marginTop: vh("2%"),
    width: vw("60%"),
    height: vw("60%"),
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
    fontSize: 20,
    fontWeight: "800",
    marginTop: 20,
    width: vw("80%"),
    color: "black",
    textAlign: "center",
    marginBottom: vh("2%"),
  },
  phoneNumberContainer: {
    width: "85%",
    borderRadius: 20,
  },
  phoneNumberInputTxtContainer: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },

  continueBtn: {
    width: "80%",
    height: 50,
    backgroundColor: "#ff7b00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("4%"),
    borderRadius: 10,
  },
  continueBtnTxt: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

// export default App;
// // export { default } from "./InfluencerApplication";
export { default } from "../components/ui/CouponFeedTest";
