import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const FoodCard = ({item, index, onPress, width}) => {
  const formatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "IDR",
  });

  return (
    <TouchableOpacity
      style={{ margin: 10, backgroundColor: "white", borderRadius: 15, width:150 }}
      key={index}
      onPress={onPress}
      width={"50%"}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: 90,
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
          resizeMode:'stretch'
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
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({});
