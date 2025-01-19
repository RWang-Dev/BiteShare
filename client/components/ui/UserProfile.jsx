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

import CouponItem from "./CouponItem";
import UserProfileCoupons from "./UserProfileCoupons";
import UserProfileSettings from "./UserProfileSettings";
import CouponRedemptionPopup from "./CouponRedemptionPopup";

// Influencer components
import UserProfilePosts from "./UserProfilePosts";
import UserProfileDashboard from "./UserProfileDashboard";

import DefaultUser from "../../assets/icons/DefaultUser";
import Profile from "../../assets/icons/Profile";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setTab, setUserType } from "@/store/slices/userProfile";
import { setActive, setID } from "@/store/slices/couponRedemption";

const UserProfile = () => {
  const profileTab = useSelector((state) => state.userProfile.profileTab); // "Coupon", "Map", "Profile" states
  const userType = useSelector((state) => state.userProfile.userType);
  const active = useSelector((state) => state.couponRedemption.active);
  const ID = useSelector((state) => state.couponRedemption.ID);
  const dispatch = useDispatch();

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
        <View style={styles.profileBorder}>
          <Image
            source={require("../../assets/images/user.png")}
            style={styles.user_default}
          />
        </View>
        <View style={styles.profileName}>
          <Text style={{ fontWeight: "bold" }}>Username</Text>
          {userType == "default" ? (
            <Text style={{ fontWeight: "bold" }}>@user_account</Text>
          ) : (
            <Text style={{ fontWeight: "bold" }}>@influencer_account</Text>
          )}
        </View>

        {userType == "influencer" ? (
          <View style={styles.influencerStats}>
            <View style={styles.influencerFollowers}>
              <Text style={{ fontWeight: "bold" }}>4.8K</Text>
              <Text style={{ fontWeight: "bold" }}>Followers</Text>
            </View>
            <View style={styles.influencerLikes}>
              <Text style={{ fontWeight: "bold" }}>36K</Text>
              <Text style={{ fontWeight: "bold" }}>Likes</Text>
            </View>
          </View>
        ) : null}
        <View style={styles.profileStats}>
          <View style={styles.profileStatsItem}>
            <Text style={{ fontWeight: "bold" }}>36</Text>
            <Text style={{ fontWeight: "bold" }}>Coupons Used</Text>
          </View>
          <View style={styles.profileStatsItem}>
            <Text style={{ fontWeight: "bold" }}>4</Text>
            <Text style={{ fontWeight: "bold" }}>Coupons</Text>
          </View>
          <View style={styles.profileStatsItem}>
            <Text style={{ fontWeight: "bold" }}>$144</Text>
            <Text style={{ fontWeight: "bold" }}>Savings</Text>
          </View>
        </View>
      </View>
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
              Coupons
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
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#EBEBEB",
    flex: 1,
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
    marginTop: "15%"
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
  influencerStats: {
    width: "100%",
    position: "absolute",
    top: "20%",
  },
  influencerFollowers: {
    position: "absolute",
    left: "10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  influencerLikes: {
    position: "absolute",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileStatsItem: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  contentSection: {
    backgroundColor: "white",
    marginTop: "1%",
    height: "65%",
    width: "100%",
  },
  profileTabsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  profileTabDefault: {
    backgroundColor: "#EBEBEB",
    width: "30%",
    height: 25,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  profileTabActive: {
    backgroundColor: "#E7630A",
    width: "30%",
    height: 25,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    display: "flex",
    flexShrink: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  profileTabComponents: {
    flex: 1,
    // backgroundColor: "black",
  },
});

export default UserProfile;
