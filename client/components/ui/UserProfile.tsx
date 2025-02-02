import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import { Link } from "expo-router";
import Svg, { Path } from "react-native-svg";
import * as ImagePicker from "expo-image-picker";

import CouponItem from "./CouponItem";
import UserProfileCoupons from "./UserProfileCoupons";
import UserProfileSettings from "./UserProfileSettings";
import CouponRedemptionPopup from "./CouponRedemptionPopup";

// axios
import { API_BASE_URL } from "@/api.config";
import axios from "axios";

// Influencer components
import UserProfilePosts from "./UserProfilePosts";
import UserProfileDashboard from "./UserProfileDashboard";
import InfluencerPost from "./InfluencerPost";

import DefaultUser from "../../assets/icons/DefaultUser";
import Profile from "../../assets/icons/Profile";

// Redux
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTab, setUserType } from "@/store/slices/userProfile";
import { setActive, setID } from "@/store/slices/couponRedemption";
import {
  setActive as setActivePost,
  setMedia,
} from "@/store/slices/influencerPost";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
  updateProfile,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";

const UserProfile = () => {
  const profileTab = useAppSelector((state) => state.userProfile.profileTab); // "Coupon", "Map", "Profile" states
  const userType = useAppSelector((state) => state.userProfile.userType);
  const active = useAppSelector((state) => state.couponRedemption.active);
  const ID = useAppSelector((state) => state.couponRedemption.ID);

  const postActive = useAppSelector((state) => state.influencerPost.active);
  const media = useAppSelector((state) => state.influencerPost.media);

  const auth = getAuth(firebaseApp);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.currentUser) {
      fetchUserDetails(auth.currentUser.uid);
    }
  }, []);

  const fetchUserDetails = async (uid: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/${uid}`);
      if (response.data.username) {
        await updateProfile(auth.currentUser!, {
          displayName: response.data.username,
          photoURL: response.data.profileImageUrl,
        });
      }
    } catch (error) {
      console.error("Error fetching user: ", error);
    }
  };

  const TABS = {
    COUPON: "Coupon",
    POSTS: "Posts",
    DASHBOARD: "Dashboard",
    SETTINGS: "Settings",
  };

  const renderContent = () => {
    switch (profileTab) {
      case TABS.COUPON:
        return <UserProfileCoupons />;
      case TABS.POSTS:
        return <UserProfilePosts />;
      case TABS.DASHBOARD:
        return <UserProfileDashboard />;
      case TABS.SETTINGS:
        return <UserProfileSettings />;
      default:
        return null; // Optional fallback
    }
  };
  return (
    <View style={styles.main}>
      {active ? (
        <View style={styles.popup}>
          <CouponRedemptionPopup id={ID} />
        </View>
      ) : null}

      <View style={styles.profileHeader}>
        {postActive ? (
          <View style={styles.influencerPostPopup}>
            <InfluencerPost />
          </View>
        ) : null}
        <View style={styles.profileBorder}>
          {auth.currentUser && auth.currentUser.photoURL ? (
            <Image
              source={{ uri: auth.currentUser.photoURL }}
              style={styles.user_default}
            />
          ) : (
            <Image
              source={require("../../assets/images/user.png")}
              style={styles.user_default}
            />
          )}
        </View>
        <View style={styles.profileName}>
          {auth.currentUser && auth.currentUser.displayName ? (
            <Text style={{ fontWeight: "bold" }}>
              {auth.currentUser.displayName}
            </Text>
          ) : (
            <Text style={{ fontWeight: "bold" }}>Username</Text>
          )}
          {/*   */}
        </View>

        {userType == "influencer" ? (
          <View style={styles.influencerStats}>
            <View style={styles.influencerFollowers}>
              <Text style={{ fontWeight: "bold" }}>4.8K</Text>
              <Text style={{ fontWeight: "bold" }}>Shares</Text>
            </View>
            <View style={styles.influencerLikes}>
              <Text style={{ fontWeight: "bold" }}>36K</Text>
              <Text style={{ fontWeight: "bold" }}>Likes</Text>
            </View>
            <View style={styles.influencerLikes}>
              <Text style={{ fontWeight: "bold" }}>36K</Text>
              <Text style={{ fontWeight: "bold" }}>Redeems</Text>
            </View>
          </View>
        ) : null}
      </View>
      <LinearGradient colors={["white", "#E7630A"]} style={{ flex: 1 }}>
        <View style={styles.contentSection}>
          <View style={styles.profileTabsContainer}>
            <Pressable
              style={
                profileTab == "Coupon"
                  ? styles.profileTabActive
                  : styles.profileTabDefault
              }
              onPress={() => dispatch(setTab("Coupon"))}
            >
              <Text
                style={
                  profileTab == "Coupon"
                    ? { textAlign: "center", color: "white" }
                    : { textAlign: "center", color: "black" }
                }
              >
                My Coupons
              </Text>
            </Pressable>

            {userType == "influencer" ? (
              <Pressable
                style={
                  profileTab == "Posts"
                    ? styles.profileTabActive
                    : styles.profileTabDefault
                }
                onPress={() => dispatch(setTab("Posts"))}
              >
                <Text
                  style={
                    profileTab == "Posts"
                      ? { textAlign: "center", color: "white" }
                      : { textAlign: "center", color: "black" }
                  }
                >
                  My Posts
                </Text>
              </Pressable>
            ) : null}
            {userType == "influencer" ? (
              <Pressable
                style={
                  profileTab == "Dashboard"
                    ? styles.profileTabActive
                    : styles.profileTabDefault
                }
                onPress={() => dispatch(setTab("Dashboard"))}
              >
                <Text
                  style={
                    profileTab == "Dashboard"
                      ? { textAlign: "center", color: "white" }
                      : { textAlign: "center", color: "black" }
                  }
                >
                  Dashboard
                </Text>
              </Pressable>
            ) : null}
            <Pressable
              style={
                profileTab == "Settings"
                  ? styles.profileTabActive
                  : styles.profileTabDefault
              }
              onPress={() => dispatch(setTab("Settings"))}
            >
              <Text
                style={
                  profileTab == "Settings"
                    ? { textAlign: "center", color: "white" }
                    : { textAlign: "center", color: "black" }
                }
              >
                Edit Profile
              </Text>
            </Pressable>
          </View>
          <View style={styles.profileTabComponents}>{renderContent()}</View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
  },
  influencerPostPopup: {
    backgroundColor: "white",
    borderRadius: 40,
    position: "absolute",
    top: "15%",
    left: "5%",
    // transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 5,
    elevation: 5,
    width: vw("90%"),
    height: vh("75%"),
  },
  addPostBtn: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    position: "absolute",
    height: 30,
    width: 30,
    borderRadius: 25,
    right: 20,
    top: 20,
  },
  popup: {
    position: "absolute",
    top: "15%",
    left: "5%",
    // transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 5,
    elevation: 5,
    width: vw("90%"),
    height: vh("75%"),
  },
  profileBorder: {
    width: vw("22%"),
    height: vw("22%"),
    backgroundColor: "transparent",
    borderWidth: 2,
    borderRadius: vw("11%"),
    borderColor: "#ff7b00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15%",
  },
  profileHeader: {
    backgroundColor: "white",
    width: "100%",
    height: "35%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
  user_default: {
    width: vw("20%"),
    height: vw("20%"),
    borderRadius: vw("10%"),
  },
  profileName: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("2%"),
  },
  profileStats: {
    width: "100%",
    height: "30%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vh("2%"),
    gap: vw("10%"),
  },
  profileStatsItem: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  influencerStats: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "2.5%",
    gap: 50,
  },
  influencerFollowers: {
    marginHorizontal: "2.5%",
  },
  influencerLikes: {
    marginHorizontal: "2.5%",
  },
  contentSection: {
    //backgroundColor: "red",
    height: "65%",
    width: "100%",
    flex: 1,
  },
  profileTabsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  profileTabDefault: {
    backgroundColor: "white",
    width: "30%",
    height: 30,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },

    borderColor: "black",
    borderWidth: 0.5,
  },
  profileTabActive: {
    backgroundColor: "#E7630A",
    width: "32.5%",
    height: 30,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 12,

    shadowColor: "#E7630A",
    shadowOpacity: 0.75,
    shadowOffset: { width: 0, height: 2 },
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    borderColor: "black",
    borderWidth: 0.5,
  },
  profileTabComponents: {
    flex: 1,
    // backgroundColor: "black",
  },
});

export default UserProfile;
