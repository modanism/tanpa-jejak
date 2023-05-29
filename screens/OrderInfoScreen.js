import { useCallback, useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase";
import { Card, Paragraph } from "react-native-paper";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Fontisto } from "@expo/vector-icons";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../utils/colors";
import AndroidStyles from "../styles/AndroidStyles";

const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "IDR",
});

const OrderInfoScreen = () => {
  const [orders, setOrders] = useState({});

  const navigation = useNavigation();
  const [totalPrice, setTotalPrice] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const fetchOrders = async () => {
        try {
          const userUid = auth.currentUser.uid;
          const docRef = doc(db, "orders", userUid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setOrders(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }, [])
  );

  // const renderCards = () => {
  //   return Object.keys(orders).map((uuid) => {
  //       console.log("Here",orders[uuid])
  //     return orders[uuid].map((item) => {
  //       return (
  //         <View
  //           key={item.id}
  //           style={{
  //             flexDirection: "row",
  //             alignItems: "center",
  //             backgroundColor: colors.white,
  //             borderRadius: 15,
  //           }}
  //         >
  //           <View>
  //             <Text>{item.name}</Text>
  //           </View>
  //           <Image source={{ uri: item.image }} />
  //           <View>
  //             <Text>{item.description}</Text>
  //             <Text>Price: {item.price}</Text>
  //             <Text>{item.quantity}</Text>
  //           </View>
  //         </View>
  //       );
  //     });
  //   });
  // };
  const renderCards = () => {
    return Object.keys(orders).map((uuid) => {
      const total = orders[uuid]
        .map((item) => item.quantity * item.price)
        .reduce((curr, prev) => curr + prev, 0);
      //   setTotalPrice(total);
      if (totalPrice == 0) {
        setTotalPrice(total);
      }

      return (
        <View
          key={uuid}
          style={{
            backgroundColor: colors.white,
            borderRadius: 15,
            padding: 18,
          }}
        >
          {orders[uuid].map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Image style={styles.image} source={{ uri: item.image }} />
                  <View>
                    <Text style={styles.foodName}>{item.name}</Text>
                    <Text style={styles.foodQuantity}>x{item.quantity}</Text>
                  </View>
                </View>

                <Text style={styles.foodPrice}>
                  {formatter.format(item.price)}
                </Text>
              </View>
            );
          })}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
          </View>
        </View>
      );
    });
  };

  const cards = renderCards();

  return (
    <>
      <SafeAreaView style={[AndroidStyles.AndroidSafeArea]}>
        <ScrollView>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={48} color={colors.greenOld} />
          </TouchableOpacity>
          <View
            style={{
              borderRadius: 12,
              margin: 10,
              gap: 15,
            }}
          >
            <Text style={styles.screenTitle}>Order Info</Text>

            {cards}
          </View>
          <View
            style={{
              borderRadius: 12,
              margin: 10,
              padding: 10,
              backgroundColor: colors.white,
              gap: 15,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: colors.greenNormal,
                width: 100,
                height: 70,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  borderRadius: 25,
                  backgroundColor: colors.white,
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="md-cash" size={30} color={colors.greenNormal} />
              </View>
            </View>
            <View>
              <Text style={styles.paymentMethod}>Cash</Text>
              <Text style={styles.discount}>No discount available</Text>
            </View>
          </View>
          <View
            style={{
              borderRadius: 12,
              margin: 10,
              padding: 10,
              backgroundColor: colors.white,
              gap: 15,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                backgroundColor: colors.white,
                width: 100,
                height: 70,
                borderRadius: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Fontisto name="shopping-bag" size={60} color="black" />
            </View>
            <View>
              <Text style={styles.paymentMethod}>Pickup</Text>
              <Text style={styles.discount}>IDR 0</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View
        style={{
          backgroundColor: colors.white,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 13 }}>Total</Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.blackYoung,
            fontWeight: "bold",
            marginBottom:20
          }}
        >
          {formatter.format(totalPrice)}
        </Text>
      </View>
    </>
  );
};

export default OrderInfoScreen;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
    marginBottom: 10,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 15,
    resizeMode: "contain",
  },
  innerContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: 295,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  foodName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.blackYoung,
  },
  foodPrice: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.blackYoung,
  },
  foodQuantity: {
    fontSize: 13,
    color: colors.gray,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.greenOld,
    textAlign: "right",
    marginBottom: 10,
  },
  paymentMethod: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.blackYoung,
  },
  discount: {
    fontSize: 13,
    color: colors.gray,
  },
  orderNumber: {
    fontSize: 17,
    color: colors.blackYoung,
    fontWeight: "700",
  },
  textTrackOrder: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },
  buttonTrackOrder: {
    backgroundColor: colors.greenOld,
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 15,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.greenOld,
  },
});
