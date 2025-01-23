// react
import React, { useState, useEffect, FC } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link, Redirect } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";

// icons
import BackButton from "../assets/icons/BackButton";
import DefaultUser from "../assets/icons/DefaultUser";
import XButton from "../assets/icons/XButton";

// server
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setUsername, setImage } from "../store/slices/createProfile";

const CreateProfile: FC = () => {
  const image = useAppSelector((state) => state.user.image);
  const username = useAppSelector((state) => state.user.username);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [backendData, setBackendData] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/test`);
      console.log(response.data);
      setBackendData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log("Username: ", username);
  // }, [username]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(setImage(result.assets[0].uri));
    }
  };

  const validateUsername = (username: string) => {
    if (username.length < 3) {
      console.log("Username is too short");
      return false;
    }

    console.log("TODO:: Validate username by checking in database");
    console.log("Username is valid!");
    return true;
  };
  const handleSubmit = () => {
    console.log("Submitted profile for the following user: ");
    console.log({ username, image });
    navigation.navigate("MainLayout" as never);
    return;
  };

  const removeImg = () => {
    console.log("removing IMage");
    dispatch(setImage(null));
  };

  return (
    <View style={styles.main}>
      <Pressable
        style={styles.back_button}
        onPressOut={() => navigation.goBack()}
      >
        <BackButton width={30} height={30} color={"#ff7b00"} />
      </Pressable>
      <Text style={styles.title}>Create Your Profile</Text>

      <View style={styles.image_container}>
        {image ? (
          <Pressable onPress={removeImg} style={styles.remove_img_btn}>
            <XButton width={15} height={15} color={"gray"} />
          </Pressable>
        ) : null}
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Image
            source={require("../assets/images/user.png")}
            style={styles.user_default}
          />
        )}
      </View>

      <View style={styles.inputsContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.add_picture,
            { backgroundColor: pressed ? "#E9E9E9" : "white" }, // Change background color when pressed
          ]}
          onPress={pickImage}
        >
          <Text style={styles.center_text}>Add Image</Text>
        </Pressable>
        <TextInput
          placeholder="Username"
          style={styles.username_input}
          onChangeText={(text) => dispatch(setUsername(text))}
          value={username}
        />
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.submit_button,
          { backgroundColor: pressed ? "#E16C00" : "#ff7b00" }, // Change background color when pressed
        ]}
        onPress={handleSubmit}
      >
        <Text style={styles.submit_button_txt}>Continue</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    width: vw("100%"),
    height: vh("100%"),
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: vh("5%"),
  },
  back_button: {
    alignSelf: "flex-start",
    position: "absolute",
    left: 15,
    top: 15,
  },
  user_default: {
    width: vw("49%"),
    height: vw("49%"),
  },
  center_circle: {
    backgroundColor: "#ff7b00",
    marginTop: vh("5%"),
    width: vw("50%"),
    height: vw("50%"),
    borderRadius: vw("25%"),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  title: {
    fontSize: 30,
    fontWeight: 800,
    color: "#ff7b00",
    // marginTop: vh("2%"),
    fontFamily: "Roboto_400Regular",
  },
  add_picture: {
    // backgroundColor: "#E9E9E9",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  username_input: {
    backgroundColor: "#F9FAF9",
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    fontSize: 16,
    fontWeight: 400,
  },

  submit_button: {
    width: "80%",
    height: 50,
    backgroundColor: "#ff7b00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("4%"),
    borderRadius: 10,
  },
  submit_button_txt: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  center_text: {
    textAlign: "center",
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: vw("49%"),
    height: vw("49%"),
    borderRadius: vw("24.5%"),
    resizeMode: "cover",
  },

  remove_img_btn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    right: 10,
  },

  image_container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    width: vw("60%"),
    height: vw("60%"),
    pointerEvents: "box-none",
  },

  inputsContainer: {
    width: "85%",
    height: 125,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#A1A1A1", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Horizontal and vertical offset
    shadowOpacity: 0.1, // Light shadow opacity for a subtle effect
    shadowRadius: 20, // Softens the shadow edges
    elevation: 5, // Adds shadow on Android
    backgroundColor: "white",
    margin: 0,
    padding: 0,
  },
});

export default CreateProfile;
