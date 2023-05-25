import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import AndroidStyles from "../styles/AndroidStyles";
import { TextInput } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const PickUpScreen = () => {
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);
  const navigation = useNavigation();

  const proceedToCart = () => {
    navigation.navigate("Cart");
  };
  return (
    <SafeAreaView style={AndroidStyles.AndroidSafeArea}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "600",
          marginHorizontal: 10,
        }}
      >
        Enter address
      </Text>
      <TextInput
        style={{
          padding: 40,
          borderColor: "gray",
          borderWidth: 0.7,
          paddingVertical: 80,
          borderRadius: 9,
          margin: 10,
        }}
      />
      <Text></Text>

      {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            marginHorizontal: 15,
            marginTop: "auto",
            marginBottom: 10,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              {cart.length} items | ${total}
            </Text>
            <Text
              style={{
                fontSize: 10,
                fontWeight: "400",
                color: "white",
                marginVertical: 6,
              }}
            >
              Extra charges might applied
            </Text>
          </View>
          <Pressable onPress={proceedToCart}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                color: "white",
              }}
            >
              Proceed to Cart
            </Text>
          </Pressable>
        </Pressable>
      )}
    </SafeAreaView>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({});
