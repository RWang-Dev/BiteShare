import React, { useEffect, useState } from "react";
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

const CouponFeedTest = () => {
  const [coupons, setCoupons] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);

  // useEffect(() => {
  //   loadCoupons();
  // }, []);

  const loadCoupons = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await axios.get(`${API_BASE_URL}/coupons`, {
        params: {
          limit: 2,
          lastVisible: lastVisible || undefined, // Send `null` as `undefined` to avoid "null" string
        },
      });

      const couponData = response.data.coupons;
      if (couponData.length > 0) {
        setCoupons((prev) => [...prev, ...couponData] as any);
        // Update `lastVisible` with the `createdAt` of the last item in this batch
        setLastVisible(response.data.lastVisible);
      } else {
        setHasMore(false);
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
    // <ScrollView
    //   style={styles.main}
    //   contentContainerStyle={styles.scrollContainer}
    // >
    //   {/* <Text style={styles.couponFeedTitle}>Coupon Feed</Text> */}
    //   <View style={styles.itemContainer}>
    //     <CouponFeedItem />
    //   </View>
    //   <View style={styles.itemContainer}>
    //     <CouponFeedItem />
    //   </View>
    //   <View style={styles.itemContainer}>
    //     <CouponFeedItem />
    //   </View>
    //   <View style={styles.itemContainer}>
    //     <CouponFeedItem />
    //   </View>
    // </ScrollView>
    <View style={{ flex: 1 }}>
      <FlatList
        data={coupons}
        keyExtractor={(item) => (item as any).id.toString()}
        renderItem={({ item, index }) => (
          <CouponFeedItem id={index}>
            <CouponForFeed couponDetails={item} />
          </CouponFeedItem>
        )}
        contentContainerStyle={styles.couponScroll}
        onEndReached={loadCoupons} // Load more data when reaching the end
        onEndReachedThreshold={0.2} // Trigger when 50% from the bottom
        ListFooterComponent={renderFooter}
      />
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
