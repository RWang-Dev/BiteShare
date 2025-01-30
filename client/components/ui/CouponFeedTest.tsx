import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as vw,
  heightPercentageToDP as vh,
} from "react-native-responsive-screen";
import CouponFeedItem from "./CouponFeedItem";

// api
import { API_BASE_URL } from "@/api.config";
import axios from "axios";
import { Timestamp } from "firebase/firestore";
import CouponForFeed from "./FeedCouponItem";

// auth
import {
  getAuth,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebaseApp, firebaseConfig } from "@/firebaseConfig";

// redux
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addCoupons,
  setHasMore,
  setLastVisible,
  setScrollPosition,
} from "@/store/slices/couponFeed";
import { useSearchParams } from "expo-router/build/hooks";

// scroll
import { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { useIsFocused } from "@react-navigation/native";

const CouponFeedTest = () => {
  const coupons = useAppSelector((state) => state.couponFeed.coupons);
  const hasMore = useAppSelector((state) => state.couponFeed.hasMore);
  const lastVisible = useAppSelector((state) => state.couponFeed.lastVisible);
  const scrollPosition = useAppSelector(
    (state) => state.couponFeed.scrollPosition
  );
  const scrollRef = useRef<FlatList<any>>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth(firebaseApp);

  const isFocused = useIsFocused();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFocused && scrollRef.current) {
      scrollRef.current.scrollToOffset({
        animated: false,
        offset: scrollPosition,
      });
    }
  }, []);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const position = event.nativeEvent.contentOffset.y;
    dispatch(setScrollPosition(position));
  };

  const loadCoupons = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/coupons`, {
        params: {
          uid: auth.currentUser!.uid,
          limit: 3,
          lastVisible: lastVisible || undefined, // Send `null` as `undefined` to avoid "null" string
        },
      });

      const couponData = response.data.coupons;
      if (couponData.length > 0) {
        const unclaimedCoupons = couponData.filter(
          (coupon: any) => !coupon.claimed
        );

        dispatch(addCoupons(unclaimedCoupons));
        dispatch(setLastVisible(response.data.lastVisible));
      } else {
        dispatch(setHasMore(false));
      }
    } catch (error) {
      console.error("Error fetching coupons: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ marginVertical: 20 }} />;
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <FlatList
        ref={scrollRef}
        data={coupons}
        keyExtractor={(item) => (item as any).id.toString()}
        renderItem={({ item, index }) => (
          <CouponFeedItem id={index}>
            <CouponForFeed couponDetails={item} idx={index} />
          </CouponFeedItem>
        )}
        contentContainerStyle={styles.couponScroll}
        onEndReached={loadCoupons} // Load more data when reaching the end
        onEndReachedThreshold={0.1} // Trigger when 50% from the bottom
        ListFooterComponent={renderFooter}
        onScroll={handleScroll}
      />
      {coupons.length == 0 ? (
        <View style={styles.emptyCoupons}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "gray" }}>
            No Coupons Right now
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  couponScrollHeader: {
    fontSize: 25,
    fontWeight: "900",
    color: "#E7630A",
    marginLeft: "5%",
    marginTop: "3%",
    marginBottom: "2%",
  },
  emptyCoupons: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    top: "30%",
  },
  couponScroll: {
    flexGrow: 1,
    alignItems: "center",
  },
  main: {
    backgroundColor: "#EBEBEB",
    width: vw("100%"),
    height: vh("100%") - 65, // Adjust for footer height
    display: "flex",
    textAlign: "center",
  },
  scrollContainer: {
    paddingBottom: 20, // Optional: Adds spacing at the bottom of the entire scroll content
  },
  itemContainer: {
    // marginVertical: 10, // Adds spacing only to the top and bottom of each item
    marginBottom: 5,
  },
  couponFeedTitle: {
    width: 100,
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default CouponFeedTest;
