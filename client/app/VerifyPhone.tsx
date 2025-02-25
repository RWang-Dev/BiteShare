import React, { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";

import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";

// icons
import BackButton from "@/assets/icons/BackButton";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

// server
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

interface VerifyPhoneProps {
  verificationId: string;
}
// Example functional component for an OTP screen
const VerifyPhone = (props: VerifyPhoneProps) => {
  // State for each digit (adjust as needed for your use case)
  const [code1, setCode1] = useState("");
  const [code2, setCode2] = useState("");
  const [code3, setCode3] = useState("");
  const [code4, setCode4] = useState("");
  const [code5, setCode5] = useState("");
  const [code6, setCode6] = useState("");

  const route = useRoute();
  const { verificationId } = route.params as { verificationId: string };

  const [codeFilled, setCodeFilled] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth();

  // Refs for focusing on next input automatically (if desired)
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);
  const input5Ref = useRef<TextInput>(null);
  const input6Ref = useRef<TextInput>(null);

  useEffect(() => {
    console.log("Verification ID VerifyPhone: ", verificationId);
  }, []);

  useEffect(() => {
    if (code1 && code2 && code4 && code4 && code5 && code6) {
      setCodeFilled(true);
    } else {
      setCodeFilled(false);
    }
  }, [code1, code2, code3, code4, code5, code6]);

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

  const confirmCode = async () => {
    // navigation.navigate("CreateProfile" as never);
    // return;
    try {
      const code = code1 + code2 + code3 + code4 + code5 + code6;
      console.log("Verifying code: ", code);
      if (!verificationId) {
        throw new Error("No verificationId found.");
      }
      const credential = PhoneAuthProvider.credential(verificationId, code);
      const userCredential = await signInWithCredential(auth, credential);
      await checkUserAuth();
      // userCredential.user has your user data
      // Navigate or store user in global state
    } catch (error) {
      alert("Invalid code or verification failed.");
      console.error("Confirm code error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.back_button}
        onPressOut={() => navigation.goBack()}
      >
        <BackButton width={30} height={30} color={"#ff7b00"} />
      </Pressable>
      <Text style={styles.title}>Verify Your Phone</Text>
      <Text style={styles.subTitle}>
        Enter the 6-digit code we sent to your phone:
      </Text>

      <View style={styles.codeContainer}>
        {/* Digit 1 */}
        <TextInput
          ref={input1Ref}
          style={styles.codeInput}
          value={code1}
          onChangeText={(text) => {
            setCode1(text);
            if (text.length === 1) {
              // Move focus to the next input
              input2Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus
        />
        {/* Digit 2 */}
        <TextInput
          ref={input2Ref}
          style={styles.codeInput}
          value={code2}
          onChangeText={(text) => {
            setCode2(text);
            if (text.length === 1) {
              input3Ref.current?.focus();
            } else {
              input1Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
        {/* Digit 3 */}
        <TextInput
          ref={input3Ref}
          style={styles.codeInput}
          value={code3}
          onChangeText={(text) => {
            setCode3(text);
            if (text.length === 1) {
              input4Ref.current?.focus();
            } else {
              input2Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
        {/* Digit 4 */}
        <TextInput
          ref={input4Ref}
          style={styles.codeInput}
          value={code4}
          onChangeText={(text) => {
            setCode4(text);
            if (text.length === 1) {
              input5Ref.current?.focus();
            } else {
              input3Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
        <TextInput
          ref={input5Ref}
          style={styles.codeInput}
          value={code5}
          onChangeText={(text) => {
            setCode5(text);
            if (text.length === 1) {
              input6Ref.current?.focus();
            } else {
              input4Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
        <TextInput
          ref={input6Ref}
          style={styles.codeInput}
          value={code6}
          onChangeText={(text) => {
            setCode6(text);
            if (text.length === 0) {
              input5Ref.current?.focus();
            }
          }}
          keyboardType="number-pad"
          maxLength={1}
        />
      </View>

      <Pressable
        style={({ pressed }) => {
          if (!codeFilled) {
            return [
              styles.verifyButtonDefault,
              { borderColor: pressed ? "#E16C00" : "#ff7b00" },
            ];
          } else {
            return [
              styles.verifyButton,
              { backgroundColor: pressed ? "#E16C00" : "#ff7b00" },
            ];
          }
        }}
        onPress={() => {
          console.log(
            "Code entered:",
            code1 && code2 && code3 && code4 && code6 && code6
          );
          if (code1 && code2 && code3 && code4 && code6 && code6) {
            confirmCode();
          } else {
            alert("Please enter the verification code");
          }
        }}
      >
        <Text
          style={
            codeFilled
              ? styles.verifyButtonText
              : styles.verifyButtonTextDefault
          }
        >
          Verify
        </Text>
      </Pressable>
    </View>
  );
};

export default VerifyPhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: vh("10%"),
    display: "flex",
    alignItems: "center",
  },
  back_button: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 15,
    top: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  subTitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  codeContainer: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
    width: "95%",
  },
  codeInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    backgroundColor: "#FFF",
  },
  verifyButton: {
    backgroundColor: "#ff7b00",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  verifyButtonDefault: {
    backgroundColor: "#F9F9F9",
    borderColor: "#ff7b00",
    borderWidth: 1.5,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  verifyButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  verifyButtonTextDefault: {
    color: "#ff7b00",
    fontSize: 18,
    fontWeight: "600",
  },
});
