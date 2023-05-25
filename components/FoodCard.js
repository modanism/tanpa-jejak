import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Pressable } from "react-native";

const FoodCard = ({item, index, onPress}) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  return (
    <Pressable
      style={{ margin: 10, backgroundColor: "white", borderRadius: 15 }}
      key={index}
      onPress={onPress}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 150,
          height: 90,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      />
      <Text
        style={{
          marginHorizontal: 10,
          marginTop: 15,
          marginBottom: 5,
          fontSize: 13,
          color: "#C4C4C4",
        }}
      >
        {formatter.format(item.price)}
      </Text>
      <Text
        style={{
          marginHorizontal: 10,
          marginBottom: 15,
          color: "#2D3130",
          fontWeight: "bold",
          fontSize: 15,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export default FoodCard;

const styles = StyleSheet.create({});
