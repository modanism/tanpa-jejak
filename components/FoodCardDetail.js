import { StyleSheet, Text, View, Image, Pressable, Button } from "react-native";
import React, { useState } from "react";
import colors from "../utils/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const FoodCardDetail = ({ foodModalData, onCloseModal, isVisible }) => {
  const [item, setItem] = useState(foodModalData);
  const product = useSelector((state) => state.product.product);
  console.log("test",product.find((item) => item.id === `${foodModalData.id}`))



  const handleButtonPress = () => {
    onCloseModal(); // Invoke the callback function passed from the parent
  };

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const addItemToCart = () => {
    dispatch(addToCart(foodModalData)); // cart
    dispatch(incrementQty(foodModalData)); // product
  };

  // const test = pro

  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });
  return isVisible ? (
    <View style={styles.container}>
      <Image source={{ uri: foodModalData.image }} style={styles.image} />
      <View style={{ width: 300}}>
        <Text style={styles.foodName}>{foodModalData.name}</Text>
        <Text style={styles.foodDescription}>
          Ayam geprek dengan sambal yang pedas cocok untuk penyuka pedas.
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 20
          }}
        >
          {cart.some((c) => c.id === foodModalData.id) ? (
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: colors.white,
                gap: 10,
                borderRadius: 13,
              }}
            >
              <Pressable
                onPress={() => {
                  dispatch(decrementQuantity(foodModalData)); // cart
                  dispatch(decrementQty(foodModalData)); // product
                }}
                // onPress={decrementQuantityHandler}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 16,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "bold",
                }}
              >
                {product.find((item) => item.id === `${foodModalData.id}`).quantity}
              </Text>

              <Pressable
                onPress={() => {
                  dispatch(incrementQuantity(foodModalData)); // cart
                  dispatch(incrementQty(foodModalData)); //product
                }}
                // onPress={incrementQuantityHandler}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          ) : (
            <Pressable
              style={{
                flexDirection: "row",
                backgroundColor: colors.white,
                gap: 10,
                borderRadius: 13,
              }}
            >
              <Pressable
                // onPress={decrementQuantityHandler}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 16,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "bold",
                }}
              >
                {product.find((item) => item.id === `${foodModalData.id}`).quantity}
              </Text>

              <Pressable
                onPress={addItemToCart}
                // onPress={incrementQuantityHandler}
                style={{
                  width: 26,
                  height: 26,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#088F8F",
                    paddingHorizontal: 6,
                    textAlign: "center",
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          )}

          <Text style={styles.foodPrice}>
            {formatter.format(
             product.find((item) => item.id === `${foodModalData.id}`).quantity *
             product.find((item) => item.id === `${foodModalData.id}`).price
            )}
          </Text>
        </View>
        <View style={{width: 300, alignItems: 'center'}}>

          <Pressable style={{width: 290, backgroundColor: colors.greenNormal, paddingVertical: 14, borderRadius: 10}} onPress={handleButtonPress}>
            <Text style={{color: colors.white, textAlign: 'center', fontSize: 17, fontWeight: "700"}}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </View>
  ) : null
};

export default FoodCardDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 30,
    gap: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    resizeMode: "contain",
  },
  foodName: {
    fontSize: 34,
    fontWeight: "bold",
    color: colors.greenOld,
  },
  foodDescription: {
    fontSize: 17,
    color: colors.blackYoung,
  },
  foodPrice: {
    fontSize: 17,
    color: colors.greenOld,
    fontWeight: "bold",
  },
});
