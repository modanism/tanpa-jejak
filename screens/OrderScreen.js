import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import AndroidStyles from "../styles/AndroidStyles";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
  emptyQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty, emptyQty } from "../ProductReducer";
import { useNavigation } from "@react-navigation/native";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import colors from "../utils/colors";
import { Ionicons, Fontisto } from "@expo/vector-icons";

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  console.log(total);

  const userUid = auth.currentUser.uid;

  const placeOrder = async () => {
    navigation.navigate("TabNavigator");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
      },
      {
        merge: true,
      }
    );
  };

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  return (
    <SafeAreaView style={AndroidStyles.AndroidSafeArea}>
      <ScrollView>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={48} color={colors.greenOld} />
        </Pressable>
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.screenTitle}>Checkout Order</Text>
        </View>
        <View
          style={{
            borderRadius: 12,
            margin: 10,
            padding: 10,
            backgroundColor: colors.white,
            gap: 15,
          }}
        >
          {cart.map((item, index) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: colors.white,
                borderRadius: 15,
              }}
              key={index}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.innerContainer}>
                <View style={styles.nameContainer}>
                  <Text style={styles.foodName}>{item.name}</Text>
                  <Text style={styles.foodPrice}>
                    {formatter.format(item.price)}
                  </Text>
                </View>
                <View>
                  <Text style={styles.foodQuantity}>x{item.quantity}</Text>
                </View>
              </View>
            </View>
          ))}
          <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
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
      <View style={{paddingVertical:20}}>
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: "row",
            justifyContent: "space-between",
            padding:20
          }}
        >
          <Text style={{fontSize:13}}>Total</Text>
          <Text style={{fontSize:15,color:colors.blackYoung,fontWeight:'bold'}}>{formatter.format(total)}</Text>
        </View>
        <Pressable
          onPress={placeOrder}
          style={{
            backgroundColor: "#088F8F",
            paddingVertical: 15,
            marginHorizontal: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: colors.white,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Place Order
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
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
});
