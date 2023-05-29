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

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../utils/colors";

const formatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "IDR",
});

const OnGoingTab = () => {
  const [orders, setOrders] = useState({});
  const navigation = useNavigation()

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

  
  const renderCards = () => {
    return Object.keys(orders).map((uuid) => {
      const total = orders[uuid]
        .map((item) => item.quantity * item.price)
        .reduce((curr, prev) => curr + prev, 0);

      return (
        <View
          key={uuid}
          style={{
            backgroundColor: colors.white,
            borderRadius: 15,
            padding: 18,
          }}
        >
          <Text style={{ fontSize: 13, color: colors.gray, fontWeight: 400 }}>
            ORDER NUMBER
          </Text>
          <Text style={styles.orderNumber}>
            {uuid.slice(0, 10).toUpperCase()}
          </Text>
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
                  {formatter.format(item.price * item.quantity)}
                </Text>
              </View>
            );
          })}
          <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:15, alignItems:'center'}}>
            <TouchableOpacity onPress={() => navigation.navigate("OrderInfo")} style={styles.buttonTrackOrder}>
              <Text style={styles.textTrackOrder}>Track Order</Text>
            </TouchableOpacity>
            <Text style={styles.totalPrice}>{formatter.format(total)}</Text>
          </View>
        </View>
      );
    });
  };

  const cards = renderCards();

  return (
    <ScrollView>
      <View
        style={{
          borderRadius: 12,
          margin: 10,
          padding: 10,
          gap: 15,
        }}
      >
        {cards}
      </View>
    </ScrollView>
  );
};

export default OnGoingTab;

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 34,
    color: colors.greenOld,
    fontWeight: "700",
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
    fontWeight: '700',
  },
  textTrackOrder: {
    fontSize:13,
    fontWeight:'600',
    color:colors.white
  },
  buttonTrackOrder: {
    backgroundColor: colors.greenOld,
    paddingHorizontal:20,
    paddingVertical:4,
    borderRadius:15
  },
  totalPrice : {
    fontSize:16,
    fontWeight:'700',
    color:colors.greenOld
  }
});
