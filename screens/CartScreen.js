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
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

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
        {total === 0 ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ marginTop: 40 }}>Your cart is empty</Text>
          </View>
        ) : (
          <>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={styles.screenTitle}>Your cart</Text>
            </View>
            <View
              style={{
                borderRadius: 12,
                marginVertical: 10,
                padding: 14,
                gap: 10,
              }}
            >
              {cart.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 15,
                    backgroundColor: colors.white,
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    borderRadius: 15,
                  }}
                  key={index}
                >
                  <Image source={{ uri: item.image }} style={styles.image} />
                  <View style={styles.innerContainer}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.foodName}>{item.name}</Text>
                      {/* <Pressable onPress={() => {
                        dispatch(emptyQty(item))
                        dispatch(emptyQuantity(item))
                      }}>
                        <FontAwesome5
                          name="trash"
                          size={20}
                          color={colors.gray}
                        />
                      </Pressable> */}
                    </View>
                    <View style={styles.dataContainer}>
                      <Pressable
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          alignItems: "center",
                          borderRadius: 10,
                          backgroundColor: colors.greenOld,
                        }}
                      >
                        <Pressable
                          onPress={() => {
                            dispatch(decrementQuantity(item)); // cart
                            dispatch(decrementQty(item)); // product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: colors.white,
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            -
                          </Text>
                        </Pressable>

                        <Pressable>
                          <Text
                            style={{
                              fontSize: 15,
                              color: colors.white,
                              paddingHorizontal: 8,
                              fontWeight: "600",
                            }}
                          >
                            {item.quantity}
                          </Text>
                        </Pressable>

                        <Pressable
                          onPress={() => {
                            dispatch(incrementQuantity(item)); // cart
                            dispatch(incrementQty(item)); //product
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 15,
                              color: colors.white,
                              paddingHorizontal: 6,
                              fontWeight: "600",
                            }}
                          >
                            +
                          </Text>
                        </Pressable>
                      </Pressable>
                      <Text style={styles.foodPrice}>
                        {formatter.format(item.price * item.quantity)}
                      </Text>
                    </View>
                  </View>

                  {/* Button */}
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      {total > 0 ? (
        <Pressable
          onPress={() => navigation.navigate("Order")}
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
            Checkout
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => navigation.goBack()}
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
            Shop
          </Text>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
  },
  image: {
    width: 100,
    height: 75,
    borderRadius: 10,
    resizeMode: "contain",
  },
  innerContainer: {
    flexDirection: "column",
    width: 220,
    gap: 20,
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
    fontSize: 15,
    fontWeight: "700",
    color: colors.blackYoung,
  },
});
