import React, { useState, useEffect } from "react";
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
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";

// icons
import BackButton from "./icons/BackButton";
import DefaultUser from "./icons/DefaultUser";
import XButton from "./icons/XButton";

const CreateProfile = () => {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("");

  useEffect(() => {
    console.log("Username: ", username);
  }, [username]);

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
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    console.log({ username, image });
  };

  const removeImg = () => {
    setImage(null);
  };

  return (
    <View style={styles.main}>
      <Link href="/" style={styles.back_button} asChild>
        <Pressable>
          <BackButton width={vw("7%")} height={vh("7%")} />
        </Pressable>
      </Link>
      <Text style={styles.title}>Create Your Profile</Text>

      <View style={styles.image_container}>
        {image ? (
          <Pressable onPress={removeImg} style={styles.remove_img_btn}>
            <XButton width={15} height={15} color={"black"} />
          </Pressable>
        ) : null}
        <View style={styles.center_circle}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <Image
              source={require("../assets/images/user.png")}
              style={styles.user_default}
            />
          )}
        </View>
      </View>

      <Pressable
        title="Add picture"
        style={({ pressed }) => [
          styles.add_picture,
          { backgroundColor: pressed ? "#A6A6A6" : "#E9E9E9" }, // Change background color when pressed
        ]}
        onPress={pickImage}
      >
        <Text style={styles.center_text}>Add Image</Text>
      </Pressable>
      <View>
        <TextInput
          placeholder="Enter your username ..."
          style={styles.username_input}
          onChangeText={setUsername}
          value={username}
        />
        <View style={styles.username_underline} />
      </View>

      <Pressable title="Submit" style={styles.submit_button}>
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
    backgroundColor: "white",
  },
  back_button: {
    alignSelf: "flex-start",
    marginLeft: 15,
    marginTop: 0,
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
    backgroundColor: "#E9E9E9",
    borderRadius: 20,
    width: vw("65%"),
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("5%"),
  },

  username_input: {
    backgroundColor: "#E9E9E9",
    borderRadius: 5,
    width: vw("65%"),
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    marginTop: vh("2%"),
  },

  submit_button: {
    backgroundColor: "#DB7634",
    borderRadius: 20,
    width: vw("65%"),
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("5%"),
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

  // imageContainer: {
  //   width: "100%",
  //   height: "100%",
  //   borderRadius: vw("25%"),
  //   overflow: "hidden",
  // },

  profileImage: {
    width: vw("49%"),
    height: vw("49%"),
    borderRadius: vw("24.5%"),
    resizeMode: "cover", // This ensures the image covers the entire container
  },

  remove_img_btn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 20,
    right: 20,
  },

  image_container: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "center",
    width: vw("60%"),
    height: vw("60%"),
  },
});

export default CreateProfile;
